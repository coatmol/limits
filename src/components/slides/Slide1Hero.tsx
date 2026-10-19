import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, GraduationCap, Award, Compass, Play } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

interface Slide1HeroProps {
  onStart: () => void;
}

export const Slide1Hero: React.FC<Slide1HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto py-8">
      {/* Top EUI Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300 shadow-[0_0_20px_rgba(0,194,255,0.15)] mb-6"
      >
        <GraduationCap className="w-4 h-4 text-cyan-400" />
        <span className="font-semibold tracking-wider uppercase">Egypt University of Informatics (EUI)</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="text-slate-400">Department of Basic Sciences</span>
      </motion.div>

      {/* Main Title with Gradient & Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-amber-400 uppercase font-semibold">
          <Sparkles className="w-4 h-4" />
          Calculus · Foundations of Analysis
          <Sparkles className="w-4 h-4" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Limits:{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,194,255,0.4)]">
            From Intuition to Proof
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Exploring how infinitesimal nearness transforms from a geometric curiosity into the unshakable mathematical bedrock of modern calculus and computing.
        </p>
      </motion.div>

      {/* Hero Visual Formula Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 px-6 py-4 rounded-2xl glass-panel-cyan max-w-xl mx-auto shadow-2xl relative group"
      >
        <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-1 flex items-center justify-center gap-1.5">
          <Compass className="w-3.5 h-3.5" /> The Fundamental Question
        </div>
        <MathView
          math="\lim_{x \to a} f(x) = L \quad \iff \quad \forall \varepsilon > 0, \; \exists \delta > 0 \;\text{ s.t. }\; 0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon"
          block
          className="text-white text-base md:text-lg"
        />
        <div className="text-[11px] text-slate-400 mt-1">
          "What happens as we get arbitrarily close, without ever touching?"
        </div>
      </motion.div>

      {/* Presenter & Academic Mentors Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left"
      >
        <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            OE
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-semibold">
              Presenter
            </div>
            <div className="text-sm font-bold text-white">Omar Elgohary</div>
            <div className="text-xs text-slate-400">Egypt University of Informatics</div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-amber-500/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-semibold">
              Prepared For
            </div>
            <div className="text-sm font-bold text-white">Dr. Mahmoud Mohamed</div>
            <div className="text-xs text-slate-400">& Eng. Youssef Hamed (EUI)</div>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 flex items-center justify-center gap-4"
      >
        <button
          onClick={() => {
            sound.playSlideTransition();
            onStart();
          }}
          className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:shadow-[0_0_45px_rgba(0,194,255,0.7)] transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Start Presentation</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
};
