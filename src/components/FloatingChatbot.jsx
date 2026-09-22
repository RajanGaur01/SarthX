import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Building2, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  HelpCircle,
  IndianRupee,
  Search,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SCHEMES_DATABASE } from '../data/schemesData';
import { askSarthxChat } from '../services/sarthxAiService';

export default function FloatingChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Initial welcome message
  const initialMessages = [
    {
      id: 'msg-welcome-1',
      sender: 'assistant',
      text: t('chat_welcome', 'Namaste! I am your SarthX AI Sahayak, powered by SarthX AI. How can I assist you today with Government schemes, direct DBT benefits, business loans, or eligibility criteria?'),
      matchedSchemes: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  // Quick suggestion prompts
  const quickSuggestions = [
    { label: t('chat_quick_farmer', 'Farmer Direct DBT'), query: 'What schemes are available for farmers?' },
    { label: t('chat_quick_mudra', 'Mudra Business Loan'), query: 'How can I get a Mudra business loan?' },
    { label: t('chat_quick_scholarship', 'Student Scholarships'), query: 'Show me scholarships for students' },
    { label: t('chat_quick_ayushman', 'Ayushman Health Cover'), query: 'Tell me about Ayushman Bharat health insurance' },
    { label: t('chat_quick_docs', 'Required Documents'), query: 'What documents do I need to apply for schemes?' }
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Speech-to-Text Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  // Intelligent Scheme Matcher & Answering Engine
  const generateAIResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Find schemes matching query
    const matched = SCHEMES_DATABASE.filter(scheme => {
      const title = (scheme.title || '').toLowerCase();
      const brief = (scheme.brief || '').toLowerCase();
      const cat = (scheme.category || '').toLowerCase();
      const tags = (scheme.tags || []).map(t => t.toLowerCase()).join(' ');

      if (q.includes('farmer') || q.includes('kisan') || q.includes('fasal') || q.includes('krishi') || q.includes('agriculture')) {
        return cat.includes('agri') || tags.includes('farmer') || tags.includes('kisan');
      }
      if (q.includes('loan') || q.includes('mudra') || q.includes('business') || q.includes('msme') || q.includes('startup') || q.includes('capital')) {
        return cat.includes('business') || cat.includes('financial') || title.includes('mudra') || tags.includes('loan');
      }
      if (q.includes('student') || q.includes('scholarship') || q.includes('education') || q.includes('padhai')) {
        return cat.includes('student') || cat.includes('education') || tags.includes('scholarship');
      }
      if (q.includes('health') || q.includes('ayushman') || q.includes('hospital') || q.includes('bima') || q.includes('swasthya') || q.includes('insurance')) {
        return cat.includes('health') || tags.includes('health') || title.includes('ayushman') || title.includes('bima');
      }
      if (q.includes('women') || q.includes('girl') || q.includes('mahila') || q.includes('ladli') || q.includes('sukanya')) {
        return cat.includes('women') || tags.includes('women') || title.includes('sukanya') || title.includes('matru');
      }
      if (q.includes('awas') || q.includes('housing') || q.includes('ghar') || q.includes('makan')) {
        return title.includes('awas') || tags.includes('housing');
      }
      if (q.includes('pension') || q.includes('old age') || q.includes('atal') || q.includes('vridha')) {
        return title.includes('pension') || tags.includes('pension') || title.includes('apy');
      }

      // Exact words match
      const words = q.split(' ').filter(w => w.length > 2);
      return words.some(w => title.includes(w) || tags.includes(w) || brief.includes(w));
    }).slice(0, 3);

    // Contextual responses based on query
    if (q.includes('document') || q.includes('paper') || q.includes('proof') || q.includes('pan') || q.includes('aadhaar')) {
      return {
        text: 'For most Central & State welfare schemes on SarthX, the primary documents required include: 1. Aadhaar Card (for digital e-KYC and DBT), 2. PAN Card (for loans, MSME subsidies & ITD verification), 3. Income / Caste Certificate (where applicable), and 4. Active Aadhaar-seeded Bank Account Passbook. Once verified in your SarthX Digi-Vault, you never need to re-upload documents.',
        schemes: []
      };
    }

    if (q.includes('apply') || q.includes('process') || q.includes('procedure') || q.includes('how to')) {
      return {
        text: 'Applying through SarthX is completely streamlined: 1. Click "Apply Now" on any scheme card, 2. Log in or create your Citizen Account with Mobile OTP, 3. Complete your socioeconomic profile, 4. Confirm your Aadhaar & PAN verification gate, and 5. Authorize submission with your personal OTP. SarthX securely transmits your application to the official nodal ministry.',
        schemes: matched.length > 0 ? matched : SCHEMES_DATABASE.slice(0, 2)
      };
    }

    if (matched.length > 0) {
      return {
        text: 'Here are ' + matched.length + ' direct government welfare schemes matching your inquiry with direct financial assistance and subsidies:',
        schemes: matched
      };
    }

    return {
      text: 'I can help you discover verified central and state welfare schemes. You can search by category (Agriculture, Business Loans, Student Scholarships, Health Insurance, Housing) or ask about eligibility and required documents.',
      schemes: SCHEMES_DATABASE.slice(0, 2)
    };
  };

  const handleSendMessage = async (textToSend) => {
    const content = (typeof textToSend === 'string' ? textToSend : inputMessage).trim();
    if (!content) return;

    const userMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResult = await askSarthxChat({
        messages: [...messages, userMessage],
        latestQuery: content,
        user,
        schemesList: SCHEMES_DATABASE
      });

      const botMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'assistant',
        text: aiResult.text,
        matchedSchemes: aiResult.matchedSchemes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.warn('SarthX AI live call notice, using local scheme analyzer:', err);
      const fallback = generateAIResponse(content);
      const botMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'assistant',
        text: fallback.text,
        matchedSchemes: fallback.schemes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  const handleApplyScheme = (schemeId) => {
    setIsOpen(false);
    if (!isAuthenticated || !user) {
      navigate('/auth?applyScheme=' + schemeId);
    } else {
      navigate('/dashboard?applyScheme=' + schemeId);
    }
  };

  return (
    <>
      {/* Floating Action Button (Right Corner) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg border border-slate-700/60 backdrop-blur-md pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Sahayak</span>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={'relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ' + (
            isOpen
              ? 'bg-slate-900 hover:bg-slate-800 text-white rotate-90 scale-95'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/30 hover:scale-105 active:scale-95'
          )}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          title={isOpen ? 'Close AI Sahayak' : 'Ask SarthX AI Sahayak'}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-18 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[420px] h-[520px] sm:h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white tracking-wide">
                      {t('chat_title', 'SarthX AI Sahayak')}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      SarthX AI
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {t('chat_subtitle', '24x7 Intelligent Welfare & Schemes Advisor')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Restart Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Minimize Chat"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips (Top bar) */}
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {quickSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Message Flow Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
              {messages.map((msg) => {
                const isBot = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={'flex flex-col ' + (isBot ? 'items-start' : 'items-end')}
                  >
                    <div
                      className={'max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ' + (
                        isBot
                          ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                          : 'bg-emerald-600 text-white rounded-tr-xs'
                      )}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Embedded Matching Scheme Cards */}
                      {isBot && msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                        <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                          {msg.matchedSchemes.map((scheme) => (
                            <div
                              key={scheme.id}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                                    {scheme.categoryName || scheme.category}
                                  </span>
                                  <h4 className="text-xs font-bold text-slate-900 truncate">
                                    {scheme.title}
                                  </h4>
                                </div>
                                <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                                  {scheme.benefit}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-600 line-clamp-2">
                                {scheme.brief}
                              </p>

                              <div className="pt-1 flex items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleApplyScheme(scheme.id)}
                                  className="px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                >
                                  <span>Apply Now</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1 text-slate-400 bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-xs w-20 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              {/* Audio Listening Visualizer Banner */}
              {isListening && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between shadow-2xs animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold">Listening... Speak now</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={'p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ' + (
                  isListening
                    ? 'bg-red-500 text-white border-red-600 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                )}
                title={isListening ? 'Stop Listening' : 'Speak your question'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chat_input_placeholder', 'Ask about schemes, loans, criteria...')}
                className="flex-1 text-xs py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white transition-colors shrink-0 cursor-pointer shadow-xs"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
