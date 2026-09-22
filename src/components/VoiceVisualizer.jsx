import React from 'react';
import { motion } from 'framer-motion';

export default function VoiceVisualizer({ isListening, height = 24, barCount = 7 }) {
  if (!isListening) return null;

  return (
    <div className="flex items-center justify-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full shadow-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1" />
      <div className="flex items-center gap-[3px]" style={{ height: `${height}px` }}>
        {Array.from({ length: barCount }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[3px] bg-gradient-to-t from-emerald-600 to-teal-500 rounded-full"
            animate={{
              height: [
                '4px',
                `${Math.floor(Math.random() * (height - 8) + 8)}px`,
                '4px'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5 + (i * 0.08),
              ease: 'easeInOut',
              delay: i * 0.06
            }}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider ml-1">
        Listening...
      </span>
    </div>
  );
}
