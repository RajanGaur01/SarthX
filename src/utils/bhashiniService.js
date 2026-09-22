/**
 * SarthX Bhashini AI Service & Natural Language Requirement Parser
 * Connects to MeitY Bhashini Dhruva Pipeline API with seamless browser fallback.
 */

export class BhashiniService {
  constructor() {
    this.STORAGE_KEY = 'sarthx_bhashini_config';
    this.DEFAULT_INFERENCE_URL = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';
    this.loadConfig();

    this.currentLang = 'en';
    this.speechRecognition = null;
    this.isListening = false;
  }

  loadConfig() {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          this.config = JSON.parse(saved);
          return;
        }
      }
      this.config = {
        userID: '',
        ulcaApiKey: '',
        pipelineId: '',
        inferenceUrl: this.DEFAULT_INFERENCE_URL,
        asrTaskServiceId: '',
        translationTaskServiceId: '',
        ttsTaskServiceId: ''
      };
    } catch (e) {
      console.warn('Unable to read Bhashini config from localStorage', e);
      this.config = { inferenceUrl: this.DEFAULT_INFERENCE_URL };
    }
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
      }
    } catch (e) {
      console.error('Failed to save Bhashini config', e);
    }
    return true;
  }

  isConfigured() {
    return Boolean(this.config.userID && this.config.ulcaApiKey);
  }

  isVoiceSupported() {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  async startVoiceRecognition({ lang = 'hi-IN', onStart, onResult, onError, onEnd }) {
    if (typeof window === 'undefined') return false;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      if (onError) {
        onError('Voice recognition requires Google Chrome, Microsoft Edge, or a browser with Web Speech API enabled.');
      }
      return false;
    }

    // Stop and clean up any existing instance
    if (this.speechRecognition) {
      try {
        this.speechRecognition.abort();
      } catch (e) {}
      this.speechRecognition = null;
    }
    this.isListening = false;

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      
      // Fallback for languages that might not be in the local browser voice database
      const supportedLangs = ['en-IN', 'hi-IN', 'bn-IN', 'mr-IN', 'te-IN', 'ta-IN', 'gu-IN', 'kn-IN', 'ml-IN', 'pa-IN', 'ur-IN'];
      recognition.lang = supportedLangs.includes(lang) ? lang : (lang.startsWith('en') ? 'en-IN' : 'hi-IN');

      let accumulatedFinal = '';

      recognition.onstart = () => {
        this.isListening = true;
        if (onStart) onStart();
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            accumulatedFinal += (accumulatedFinal ? ' ' : '') + piece.trim();
          } else {
            interimTranscript += piece;
          }
        }

        const currentFull = (accumulatedFinal + ' ' + interimTranscript).trim();

        if (onResult) {
          onResult({
            finalText: accumulatedFinal.trim(),
            interimText: currentFull,
            isFinal: false
          });
        }
      };

      recognition.onerror = (event) => {
        // If error is no-speech, don't crash or break the session immediately
        if (event.error === 'no-speech') {
          return;
        }

        this.isListening = false;
        let userMessage = event.error;
        if (event.error === 'not-allowed') {
          userMessage = 'Microphone permission blocked. Please click the lock icon in your URL bar to allow microphone access.';
        } else if (event.error === 'network') {
          userMessage = 'Speech recognition network service unavailable. You can type or click sample queries.';
        } else if (event.error === 'audio-capture') {
          userMessage = 'Microphone device could not capture audio.';
        } else if (event.error === 'language-not-supported') {
          // Retry with Hindi
          try {
            recognition.lang = 'hi-IN';
            recognition.start();
            return;
          } catch (e) {}
        }
        if (onError) onError(userMessage);
      };

      recognition.onend = () => {
        this.isListening = false;
        this.speechRecognition = null;
        if (onResult && accumulatedFinal.trim()) {
          onResult({
            finalText: accumulatedFinal.trim(),
            interimText: accumulatedFinal.trim(),
            isFinal: true
          });
        }
        if (onEnd) onEnd();
      };

      this.speechRecognition = recognition;
      recognition.start();
      return true;
    } catch (err) {
      this.isListening = false;
      this.speechRecognition = null;
      console.error('Failed to start SpeechRecognition:', err);
      if (onError) onError(err.message || 'Failed to start microphone');
      return false;
    }
  }

  stopVoiceRecognition() {
    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop();
      } catch (e) {
        try { this.speechRecognition.abort(); } catch (e2) {}
      }
      this.speechRecognition = null;
    }
    this.isListening = false;
  }

  async speakText(text, lang = 'hi') {
    if (!text || typeof window === 'undefined') return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Check if Bhashini TTS is configured
    if (this.isConfigured() && this.config.ttsTaskServiceId) {
      try {
        const response = await fetch(this.config.inferenceUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'userID': this.config.userID,
            'ulcaApiKey': this.config.ulcaApiKey
          },
          body: JSON.stringify({
            pipelineTasks: [
              {
                taskType: 'tts',
                config: {
                  language: { sourceLanguage: lang },
                  gender: 'female',
                  serviceId: this.config.ttsTaskServiceId
                }
              }
            ],
            inputData: {
              input: [{ source: text }]
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const audioContent = data?.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
          if (audioContent) {
            const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
            audio.play();
            return;
          }
        }
      } catch (err) {
        console.warn('Bhashini TTS failed, falling back to browser SpeechSynthesis', err);
      }
    }

    // Native Browser Fallback SpeechSynthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const langCodeMap = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'te': 'te-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'gu': 'gu-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN',
        'pa': 'pa-IN',
        'or': 'or-IN',
        'as': 'as-IN',
        'ur': 'ur-IN'
      };
      utterance.lang = langCodeMap[lang] || 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Natural Language Requirement Parser (With Fixed Regex Word Boundaries)
   */
  parseCitizenQuery(rawQuery) {
    if (!rawQuery) return null;
    const q = rawQuery.toLowerCase();

    const extracted = {
      query: rawQuery,
      targetCategory: null,
      targetOccupation: null,
      targetGender: null,
      targetCaste: null,
      estimatedAge: null,
      estimatedIncome: null,
      keywords: []
    };

    // 1. Category & Occupation
    if (/\b(farmer|kisan|kheti|agriculture|crop|fasal|krishi|zameen|cultivator)\b/i.test(q)) {
      extracted.targetCategory = 'agriculture';
      extracted.targetOccupation = 'farmer';
      extracted.keywords.push('farmer', 'agriculture');
    } else if (/\b(student|scholarship|chhatravritti|padhai|college|school|vidyarthi|education|b\.tech|diploma|admission)\b/i.test(q)) {
      extracted.targetCategory = 'students';
      extracted.targetOccupation = 'student';
      extracted.keywords.push('student', 'scholarship');
    } else if (/\b(mahila|woman|women|aurat|girl|ladki|beti|maternity|garbhvati|pregnant|delivery)\b/i.test(q)) {
      extracted.targetCategory = 'women';
      extracted.targetGender = 'female';
      extracted.keywords.push('women', 'girl child');
    } else if (/\b(loan|karz|rin|mudra|bima|insurance|pension|bank|subsidy|credit)\b/i.test(q)) {
      extracted.targetCategory = 'financial';
      extracted.keywords.push('loan', 'financial');
    } else if (/\b(hospital|ilaj|bimari|ayushman|dawa|treatment|health|doctor|swasthya|medical)\b/i.test(q)) {
      extracted.targetCategory = 'health';
      extracted.keywords.push('health', 'healthcare');
    } else if (/\b(makan|ghar|awas|housing|pucca|chhat|home loan)\b/i.test(q)) {
      extracted.targetCategory = 'housing';
      extracted.keywords.push('housing', 'awas');
    } else if (/\b(job|naukri|rojgar|kaushal|skill|training|vishwakarma|artisan|shramik|mazdoor|vendor|thela)\b/i.test(q)) {
      extracted.targetCategory = 'skills';
      extracted.targetOccupation = 'worker';
      extracted.keywords.push('skills', 'employment');
    } else if (/\b(divyang|viklang|handicapped|disability|wheelchair|senior|old age|bpl)\b/i.test(q)) {
      extracted.targetCategory = 'social';
      extracted.keywords.push('social welfare');
    } else if (/\b(business|startup|vyapar|dukan|factory|msme|enterprise|udyami)\b/i.test(q)) {
      extracted.targetCategory = 'business';
      extracted.targetOccupation = 'self-employed';
      extracted.keywords.push('business', 'msme');
    }

    // 2. Gender extraction with word boundaries
    if (/\b(female|girl|woman|women|mahila|ladki|stri)\b/i.test(q)) {
      extracted.targetGender = 'female';
    } else if (/\b(male|boy|man|men|purush|ladka)\b/i.test(q)) {
      extracted.targetGender = 'male';
    }

    // 3. Caste extraction WITH STRICT WORD BOUNDARIES
    if (/\b(sc|scheduled\s+caste|dalit)\b/i.test(q)) {
      extracted.targetCaste = 'sc';
    } else if (/\b(st|scheduled\s+tribe|adivasi)\b/i.test(q)) {
      extracted.targetCaste = 'st';
    } else if (/\b(obc|backward\s+class)\b/i.test(q)) {
      extracted.targetCaste = 'obc';
    } else if (/\b(ews|economically\s+weaker)\b/i.test(q)) {
      extracted.targetCaste = 'ews';
    } else if (/\b(minority|alpsankhyak|muslim|christian|sikh|jain|buddhist)\b/i.test(q)) {
      extracted.targetCaste = 'minority';
    }

    // 4. Age extraction
    const ageMatch = q.match(/(\d{1,2})\s*(?:saal|year|years|varsh|age)/i) || q.match(/(?:age|umra)\s*[:=]?\s*(\d{1,2})/i);
    if (ageMatch) {
      extracted.estimatedAge = parseInt(ageMatch[1], 10);
    }

    return extracted;
  }
}

export const bhashiniInstance = new BhashiniService();
