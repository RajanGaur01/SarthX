import React, { createContext, useContext, useState, useEffect } from 'react';
import { bhashiniInstance } from '../utils/bhashiniService';
import { useLanguage } from './LanguageContext';

const BhashiniContext = createContext(null);

export function BhashiniProvider({ children }) {
  const { currentLang, currentLanguageMeta } = useLanguage();
  const [config, setConfig] = useState(() => bhashiniInstance.config || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const [voiceError, setVoiceError] = useState(null);
  const [interimVoiceText, setInterimVoiceText] = useState('');

  useEffect(() => {
    bhashiniInstance.currentLang = currentLang;
  }, [currentLang]);

  const saveConfig = (newConfig) => {
    bhashiniInstance.saveConfig(newConfig);
    setConfig({ ...bhashiniInstance.config });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(bhashiniInstance.STORAGE_KEY);
    } catch (e) {}
    bhashiniInstance.loadConfig();
    setConfig({ ...bhashiniInstance.config });
  };

  const setCredentials = (userId, apiKey, inferenceKey) => {
    saveConfig({
      userID: userId,
      ulcaApiKey: apiKey,
      inferenceUrl: inferenceKey || bhashiniInstance.DEFAULT_INFERENCE_URL
    });
  };

  const getStoredCredentials = () => {
    return {
      userId: config.userID || '',
      apiKey: config.ulcaApiKey || '',
      inferenceKey: config.inferenceUrl || ''
    };
  };

  const speak = (text) => {
    setIsSpeaking(true);
    bhashiniInstance.speakText(text, currentLang);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  const stopSpeech = () => {
    bhashiniInstance.stopSpeech();
    setIsSpeaking(false);
  };

  const clearVoiceError = () => {
    setVoiceError(null);
  };

  const startVoice = async ({ onResult, onStart, onError, onEnd }) => {
    const speechCode = currentLanguageMeta?.speechCode || 'hi-IN';
    setVoiceError(null);
    setInterimVoiceText('');
    setVoiceStatus('Listening... Speak into your microphone');

    try {
      const started = await bhashiniInstance.startVoiceRecognition({
        lang: speechCode,
        onStart: () => {
          setIsListening(true);
          setVoiceError(null);
          if (onStart) onStart();
        },
        onResult: (res) => {
          if (res.interimText) {
            setInterimVoiceText(res.interimText);
          }
          if (res.isFinal) {
            setIsListening(false);
            setVoiceStatus(`Recognized: "${res.finalText}"`);
            setInterimVoiceText(res.finalText);
          }
          if (onResult) onResult(res);
        },
        onError: (err) => {
          setIsListening(false);
          const errMsg = typeof err === 'string' ? err : 'Voice recognition error';
          setVoiceError(errMsg);
          setVoiceStatus(errMsg);
          if (onError) onError(errMsg);
        },
        onEnd: () => {
          setIsListening(false);
          if (onEnd) onEnd();
        }
      });

      if (!started) {
        setIsListening(false);
      }
    } catch (err) {
      setIsListening(false);
      const errMsg = err.message || 'Unable to access microphone';
      setVoiceError(errMsg);
      setVoiceStatus(errMsg);
      if (onError) onError(errMsg);
    }
  };

  const stopVoice = () => {
    bhashiniInstance.stopVoiceRecognition();
    setIsListening(false);
    setVoiceStatus('');
    setInterimVoiceText('');
  };

  const parseQuery = (query) => {
    return bhashiniInstance.parseCitizenQuery(query);
  };

  return (
    <BhashiniContext.Provider
      value={{
        config,
        saveConfig,
        resetConfig,
        setCredentials,
        getStoredCredentials,
        isConfigured: bhashiniInstance.isConfigured(),
        isVoiceSupported: bhashiniInstance.isVoiceSupported(),
        isModalOpen,
        setIsModalOpen,
        isListening,
        isSpeaking,
        voiceStatus,
        voiceError,
        clearVoiceError,
        interimVoiceText,
        startVoice,
        stopVoice,
        speak,
        speakText: speak,
        stopSpeech,
        parseQuery
      }}
    >
      {children}
    </BhashiniContext.Provider>
  );
}

export function useBhashini() {
  const context = useContext(BhashiniContext);
  if (!context) {
    return {
      config: {},
      isConfigured: false,
      isVoiceSupported: false,
      isModalOpen: false,
      setIsModalOpen: () => {},
      isListening: false,
      isSpeaking: false,
      voiceStatus: '',
      voiceError: null,
      clearVoiceError: () => {},
      interimVoiceText: '',
      startVoice: () => {},
      stopVoice: () => {},
      speak: () => {},
      speakText: () => {},
      stopSpeech: () => {},
      parseQuery: () => null,
      saveConfig: () => {},
      resetConfig: () => {},
      setCredentials: () => {},
      getStoredCredentials: () => ({ userId: '', apiKey: '', inferenceKey: '' })
    };
  }
  return context;
}
