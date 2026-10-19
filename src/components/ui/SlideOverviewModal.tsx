import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { SLIDES_DATA } from '../../types/presentation';
import { sound } from '../../utils/sound';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-5xl max-h-[88vh] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-400">Presentation Overview</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
                10 Slides
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Jump instantly to any chapter or milestone in the calculus deck
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slides Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SLIDES_DATA.map((slide) => {
            const isCurrent = slide.id === currentSlide;
            return (
              <div
                key={slide.id}
                onClick={() => {
                  sound.playSlideTransition();
                  onSelectSlide(slide.id);
                  onClose();
                }}
                className={`group cursor-pointer rounded-xl p-4 transition-all duration-200 border text-left flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(0,194,255,0.2)]'
                    : 'bg-slate-900/40 border-white/5 hover:border-cyan-500/30 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      SLIDE {String(slide.id).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono tracking-wider">
                      {slide.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400">
                  <span>{slide.section}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
