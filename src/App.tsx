import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { BottomDock } from './components/ui/BottomDock';
import { SlideOverviewModal } from './components/ui/SlideOverviewModal';

import { Slide1Hero } from './components/slides/Slide1Hero';
import { Slide2Roadmap } from './components/slides/Slide2Roadmap';
import { Slide3IdeaOfLimit } from './components/slides/Slide3IdeaOfLimit';
import { Slide4Applications } from './components/slides/Slide4Applications';
import { Slide5LimitTheorems } from './components/slides/Slide5LimitTheorems';
import { Slide6PreciseDefinition } from './components/slides/Slide6PreciseDefinition';
import { Slide7ProofSumLaw } from './components/slides/Slide7ProofSumLaw';
import { Slide8ProofProductLaw } from './components/slides/Slide8ProofProductLaw';
import { Slide9WorkedExample } from './components/slides/Slide9WorkedExample';
import { Slide10Conclusion } from './components/slides/Slide10Conclusion';

import { SLIDES_DATA } from './types/presentation';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);

  const totalSlides = SLIDES_DATA.length;

  const goToSlide = useCallback(
    (slideNum: number) => {
      const target = Math.max(1, Math.min(slideNum, totalSlides));
      if (target === currentSlide) return;
      setDirection(target > currentSlide ? 1 : -1);
      setCurrentSlide(target);
    },
    [currentSlide, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  // Native Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;

        case 'o':
        case 'O':
          setIsOverviewOpen((prev) => !prev);
          break;

        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;

        case 'Escape':
          setIsOverviewOpen(false);
          break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
          const num = parseInt(e.key);
          if (num <= totalSlides) goToSlide(num);
          break;
        }
        case '0':
          goToSlide(10);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Clean 1-to-1 slide transition
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  const renderCurrentSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Hero />;
      case 2:
        return <Slide2Roadmap onSelectSlide={goToSlide} />;
      case 3:
        return <Slide3IdeaOfLimit />;
      case 4:
        return <Slide4Applications />;
      case 5:
        return <Slide5LimitTheorems />;
      case 6:
        return <Slide6PreciseDefinition />;
      case 7:
        return <Slide7ProofSumLaw />;
      case 8:
        return <Slide8ProofProductLaw />;
      case 9:
        return <Slide9WorkedExample />;
      case 10:
        return <Slide10Conclusion onRestart={() => goToSlide(1)} />;
      default:
        return <Slide1Hero />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 select-none overflow-hidden font-sans">
      {/* 16:9 Responsive Slide Container (Pitch / Keynote style) */}
      <div className="w-full max-w-6xl aspect-[16/9] min-h-[580px] bg-[#121214] border border-zinc-800/80 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex-1"
          >
            {renderCurrentSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Bottom Floating Navigation Dock */}
      <BottomDock
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onOpenOverview={() => setIsOverviewOpen(true)}
      />

      {/* Clean Slide Overview Modal */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />
    </div>
  );
};

export default App;
