import React from 'react';
import { X } from 'lucide-react';
import { SLIDES_DATA } from '../../types/presentation';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-zinc-950/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-[#121214] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Slide Overview</h2>
            <p className="text-xs text-zinc-500">Jump directly to any slide in the deck</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close overview"
            className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 10-Slide Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SLIDES_DATA.map((slide) => {
            const isCurrent = slide.id === currentSlide;
            return (
              <div
                key={slide.id}
                onClick={() => {
                  onSelectSlide(slide.id);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-colors flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-zinc-800/60 border-zinc-500'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 mb-1">
                    #{String(slide.id).padStart(2, '0')}
                  </div>
                  <h3 className="text-xs font-semibold text-zinc-200 line-clamp-1">
                    {slide.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-snug">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
