import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { AmbientBackground } from './components/ui/AmbientBackground';
import { Navbar } from './components/ui/Navbar';
import { BottomDock } from './components/ui/BottomDock';
import { SlideOverviewModal } from './components/ui/SlideOverviewModal';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { PresenterNotesModal } from './components/ui/PresenterNotesModal';
import { CheatSheetModal } from './components/ui/CheatSheetModal';

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
import { sound } from './utils/sound';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);

  // Modals & overlay states
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  // Audio & Autoplay states
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  // Touch tracking for mobile swipe gestures
  const touchStartX = useRef<number | null>(null);

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

  const toggleMute = useCallback(() => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
  }, [isMuted]);

  // Autoplay timer effect
  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < totalSlides) {
          sound.playSlideTransition();
          setDirection(1);
          return prev + 1;
        } else {
          setIsAutoplay(false);
          return prev;
        }
      });
    }, 12000);

    return () => clearInterval(timer);
  }, [isAutoplay, totalSlides]);

  // Global Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if focused in an input/textarea
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Space
        case 'PageDown':
          e.preventDefault();
          if (currentSlide < totalSlides) {
            sound.playSlideTransition();
            nextSlide();
          }
          break;

        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          if (currentSlide > 1) {
            sound.playSlideTransition();
            prevSlide();
          }
          break;

        case 'Home':
          e.preventDefault();
          sound.playSlideTransition();
          goToSlide(1);
          break;

        case 'End':
          e.preventDefault();
          sound.playSlideTransition();
          goToSlide(totalSlides);
          break;

        case 'o':
        case 'O':
          sound.playClick();
          setIsOverviewOpen((prev) => !prev);
          break;

        case 'p':
        case 'P':
          sound.playClick();
          setIsNotesOpen((prev) => !prev);
          break;

        case 'm':
        case 'M':
          toggleMute();
          break;

        case 'c':
        case 'C':
          sound.playClick();
          setIsCheatSheetOpen((prev) => !prev);
          break;

        case 'f':
        case 'F':
          sound.playClick();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;

        case '?':
          sound.playClick();
          setIsShortcutsOpen((prev) => !prev);
          break;

        case 'Escape':
          setIsOverviewOpen(false);
          setIsShortcutsOpen(false);
          setIsNotesOpen(false);
          setIsCheatSheetOpen(false);
          break;

        // Number keys 1-9 & 0 for direct slide jumping
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
          if (num <= totalSlides) {
            sound.playSlideTransition();
            goToSlide(num);
          }
          break;
        }
        case '0':
          sound.playSlideTransition();
          goToSlide(10);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, nextSlide, prevSlide, goToSlide, toggleMute]);

  // Touch Swipe Handlers for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe threshold: 50px
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentSlide < totalSlides) {
        sound.playSlideTransition();
        nextSlide();
      } else if (diffX < 0 && currentSlide > 1) {
        sound.playSlideTransition();
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Liquid slide motion animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  const renderCurrentSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Hero onStart={() => goToSlide(2)} />;
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
        return (
          <Slide10Conclusion
            onRestart={() => goToSlide(1)}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
            onOpenNotes={() => setIsNotesOpen(true)}
          />
        );
      default:
        return <Slide1Hero onStart={() => goToSlide(2)} />;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full bg-[#080B14] text-slate-100 flex flex-col justify-between overflow-x-hidden select-text"
    >
      {/* Ambient Lighting & Particle Background */}
      <AmbientBackground />

      {/* Top Glassmorphism Navigation */}
      <Navbar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay((prev) => !prev)}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onSelectSlide={goToSlide}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-24 px-2 sm:px-4 md:px-8 z-10 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {renderCurrentSlide()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation Dock */}
      <BottomDock
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSelectSlide={goToSlide}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
      />

      {/* Modals & Overlays */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentSlide={currentSlide}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
};

export default App;
