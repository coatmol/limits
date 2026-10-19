import React from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

interface BottomDockProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenOverview: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onOpenOverview,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
      <nav 
        aria-label="Presentation controls"
        className="px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 backdrop-blur-md flex items-center gap-3 shadow-lg"
      >
        {/* Left Arrow Navigation */}
        <button
          onClick={onPrev}
          disabled={currentSlide === 1}
          aria-label="Previous slide"
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 disabled:hover:text-zinc-400 transition-colors"
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Counter (e.g., "03 / 10") */}
        <div className="text-xs font-mono tracking-wider text-zinc-300 font-medium px-1">
          <span>{String(currentSlide).padStart(2, '0')}</span>
          <span className="text-zinc-600 mx-1">/</span>
          <span className="text-zinc-500">{String(totalSlides).padStart(2, '0')}</span>
        </div>

        {/* Right Arrow Navigation */}
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides}
          aria-label="Next slide"
          className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-20 disabled:hover:text-zinc-400 transition-colors"
          title="Next slide (Right Arrow / Space)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Subtle Divider */}
        <div className="h-3.5 w-[1px] bg-zinc-800" />

        {/* Overview Grid Icon */}
        <button
          onClick={onOpenOverview}
          aria-label="Slide overview"
          className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
          title="Slide Overview (O)"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>
  );
};
