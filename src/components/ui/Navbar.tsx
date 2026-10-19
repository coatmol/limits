import React from 'react';
import { Volume2, VolumeX, HelpCircle, FileText, LayoutGrid, Play, Pause } from 'lucide-react';
import { SLIDES_DATA } from '../../types/presentation';
import { sound } from '../../utils/sound';

interface NavbarProps {
  currentSlide: number;
  totalSlides: number;
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  onOpenOverview: () => void;
  onOpenShortcuts: () => void;
  onOpenNotes: () => void;
  onSelectSlide: (index: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlide,
  totalSlides,
  isMuted,
  onToggleMute,
  isAutoplay,
  onToggleAutoplay,
  onOpenOverview,
  onOpenShortcuts,
  onOpenNotes,
  onSelectSlide,
}) => {
  const currentSlideInfo = SLIDES_DATA[currentSlide - 1];
  const progressPercent = ((currentSlide - 1) / (totalSlides - 1)) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Progress Line */}
      <div className="w-full h-1 bg-slate-800/80 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,194,255,0.8)]"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Clickable progress checkpoints */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-4">
          {SLIDES_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                sound.playClick();
                onSelectSlide(idx + 1);
              }}
              className="pointer-events-auto h-full w-2 hover:bg-cyan-300 transition-colors"
              title={`Jump to ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="glass-panel border-b border-white/5 backdrop-blur-xl px-4 lg:px-8 py-3 flex items-center justify-between shadow-lg">
        {/* Left: EUI Branding & Presentation Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,194,255,0.15)] group cursor-default">
            {/* EUI Monogram Emblem */}
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 via-indigo-600 to-amber-400 p-[1px] flex items-center justify-center shadow-inner">
              <div className="w-full h-full bg-[#090D1A] rounded-[5px] flex items-center justify-center font-bold text-xs tracking-wider text-cyan-300">
                EUI
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400">
                Egypt Univ. of Informatics
              </span>
              <span className="text-xs font-semibold text-slate-300 tracking-tight">
                Calculus · Omar Elgohary
              </span>
            </div>
          </div>

          {/* Section Breadcrumb on Desktop */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10 text-xs text-slate-400">
            <span className="text-cyan-400/80 font-mono">[{currentSlideInfo.section}]</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-200 font-medium truncate max-w-[240px]">
              {currentSlideInfo.title}
            </span>
          </div>
        </div>

        {/* Center: Slide Index Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-white/10 text-xs font-mono shadow-inner">
          <span className="text-cyan-400 font-bold">
            {String(currentSlide).padStart(2, '0')}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Presentation Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Autoplay toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleAutoplay();
            }}
            className={`p-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
              isAutoplay
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(255,184,0,0.2)]'
                : 'bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-700/60'
            }`}
            title={isAutoplay ? 'Pause auto-advance (10s)' : 'Start auto-advance'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden xl:inline">{isAutoplay ? 'Playing' : 'Autoplay'}</span>
          </button>

          {/* Overview Grid button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenOverview();
            }}
            className="p-2 rounded-lg bg-slate-800/60 text-slate-400 border border-white/5 hover:text-cyan-400 hover:bg-slate-700/60 hover:border-cyan-500/30 transition-all"
            title="Slide Overview (Press 'O')"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Presenter Notes */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenNotes();
            }}
            className="p-2 rounded-lg bg-slate-800/60 text-slate-400 border border-white/5 hover:text-cyan-400 hover:bg-slate-700/60 hover:border-cyan-500/30 transition-all"
            title="Speaker Notes (Press 'P')"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Audio Mute toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-slate-800/40 text-slate-500 border-white/5 hover:text-slate-300'
                : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(0,194,255,0.15)]'
            }`}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Shortcuts Help */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenShortcuts();
            }}
            className="p-2 rounded-lg bg-slate-800/60 text-slate-400 border border-white/5 hover:text-amber-400 hover:bg-slate-700/60 hover:border-amber-500/30 transition-all"
            title="Keyboard Shortcuts (Press '?')"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
