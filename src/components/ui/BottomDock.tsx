import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookOpen, LayoutGrid } from 'lucide-react';
import { SLIDES_DATA } from '../../types/presentation';
import { sound } from '../../utils/sound';

interface BottomDockProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onOpenOverview: () => void;
  onOpenCheatSheet: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  onOpenOverview,
  onOpenCheatSheet,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <nav aria-label="Slide presentation navigation" className="glass-panel px-4 py-2.5 rounded-full border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex items-center gap-3 md:gap-5">
        {/* Previous Button */}
        <button
          onClick={() => {
            if (currentSlide > 1) {
              sound.playSlideTransition();
              onPrev();
            }
          }}
          disabled={currentSlide === 1}
          className={`p-2 rounded-full transition-all flex items-center justify-center ${
            currentSlide === 1
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(0,194,255,0.4)] active:scale-95'
          }`}
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Pagination Dots */}
        <div className="flex items-center gap-1.5 px-1 relative">
          {SLIDES_DATA.map((slide, idx) => {
            const slideNum = idx + 1;
            const isActive = slideNum === currentSlide;
            return (
              <div key={slide.id} className="relative group">
                <button
                  onClick={() => {
                    sound.playSlideTransition();
                    onSelectSlide(slideNum);
                  }}
                  onMouseEnter={() => setHoveredDot(slideNum)}
                  onMouseLeave={() => setHoveredDot(null)}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    isActive
                      ? 'w-7 h-2.5 bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_10px_rgba(0,194,255,0.7)]'
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`${slide.id}. ${slide.title}`}
                />

                {/* Floating Preview Tooltip on Hover */}
                {hoveredDot === slideNum && (
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-900/95 border border-cyan-500/30 text-[11px] text-cyan-300 whitespace-nowrap shadow-xl pointer-events-none z-50">
                    <span className="font-bold text-white mr-1">#{slideNum}</span>
                    {slide.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            if (currentSlide < totalSlides) {
              sound.playSlideTransition();
              onNext();
            }
          }}
          disabled={currentSlide === totalSlides}
          className={`p-2 rounded-full transition-all flex items-center justify-center ${
            currentSlide === totalSlides
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(0,194,255,0.4)] active:scale-95'
          }`}
          title="Next slide (Right Arrow / Space)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Vertical Divider */}
        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

        {/* Utility Actions */}
        <div className="hidden sm:flex items-center gap-1.5">
          {/* Quick Cheat Sheet */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCheatSheet();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-amber-400 hover:bg-white/10 transition-all"
            title="Formula Cheat Sheet"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Slide Overview */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenOverview();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
            title="Slide Sorter (O)"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </div>
  );
};
