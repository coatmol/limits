import React, { useState, useEffect } from 'react';
import { X, Mic, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SLIDES_DATA } from '../../types/presentation';
import { sound } from '../../utils/sound';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const currentSlideInfo = SLIDES_DATA[currentSlide - 1];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-full max-w-md animate-fadeIn">
      <div className="glass-panel rounded-2xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <Mic className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Presenter Teleprompter
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Presentation Clock */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 text-xs font-mono text-cyan-300 border border-white/5">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{formatTime(seconds)}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current slide indicator */}
        <div className="px-5 py-2.5 bg-cyan-950/30 border-b border-white/5 flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold truncate">
            Slide {currentSlide}: {currentSlideInfo.title}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {currentSlideInfo.section}
          </span>
        </div>

        {/* Speaker Notes Bullet points */}
        <div className="p-5 space-y-3 max-h-72 overflow-y-auto">
          <div className="text-[11px] uppercase tracking-wider text-amber-400/90 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Key Speaking Prompts & Academic Cues:
          </div>
          {currentSlideInfo.notes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed bg-slate-800/30 p-2.5 rounded-lg border border-white/5">
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>

        {/* Presenter Footer Badge */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Omar Elgohary · EUI</span>
          <span className="text-amber-400/80">Dr. Mahmoud & Eng. Youssef</span>
        </div>
      </div>
    </div>
  );
};
