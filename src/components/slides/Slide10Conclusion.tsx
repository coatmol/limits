import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, RotateCcw, BookOpen, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound';

interface Slide10ConclusionProps {
  onRestart: () => void;
  onOpenCheatSheet: () => void;
  onOpenNotes: () => void;
}

export const Slide10Conclusion: React.FC<Slide10ConclusionProps> = ({
  onRestart,
  onOpenCheatSheet,
  onOpenNotes,
}) => {
  const handleConfetti = () => {
    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const pillarsSummary = [
    { title: 'Intuition', desc: 'Understanding limits as trends near x = a, resolving 0/0 removable holes.' },
    { title: 'CS Applications', desc: 'Powering Big-O complexity, continuous Gradient Descent, and Graphics SDFs.' },
    { title: 'Algebraic Laws', desc: 'Operating linearly with Sum, Product, Quotient, and the Squeeze Theorem.' },
    { title: 'Formal Definition', desc: 'Cauchy-Weierstrass (ε–δ) challenge-and-response precision.' },
    { title: 'Rigorous Rigor', desc: 'Mastering the ε/2 budget strategy and bounding variable factors.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 text-center">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-4"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>PRESENTATION CONCLUDED · Q.E.D.</span>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Mastery of the Infinitesimal
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-2 leading-relaxed">
          From an algebraic dilemma at <span className="font-mono text-rose-400">0 / 0</span> to the mathematical architecture of modern calculus and algorithmic computation.
        </p>
      </motion.div>

      {/* 5 Pillars Summary Pill Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 text-left"
      >
        {pillarsSummary.map((p, idx) => (
          <div key={idx} className="p-3 rounded-xl glass-panel border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                PILLAR 0{idx + 1}
              </span>
              <h3 className="text-xs font-bold text-white mb-1">{p.title}</h3>
              <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tribute & Acknowledgments Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel-cyan p-6 rounded-2xl border border-cyan-500/30 max-w-2xl mx-auto mt-6 text-left shadow-2xl relative"
      >
        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Egypt University of Informatics (EUI)</h3>
            <p className="text-xs text-cyan-300">Faculty of Computing & Information / Engineering</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase font-mono text-[10px] tracking-wider block">
              Presenter
            </span>
            <div className="text-white font-bold text-sm">Omar Elgohary</div>
            <p className="text-slate-400 text-[11px]">Calculus & Foundations Presentation</p>
          </div>

          <div className="space-y-1">
            <span className="text-amber-400 uppercase font-mono text-[10px] tracking-wider block">
              Supervision & Guidance
            </span>
            <div className="text-white font-semibold">Dr. Mahmoud Mohamed</div>
            <div className="text-slate-300">& Eng. Youssef Hamed</div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={() => {
            sound.playSlideTransition();
            onRestart();
          }}
          className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all border border-white/10 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Restart Deck</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenCheatSheet();
          }}
          className="px-5 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-bold transition-all border border-amber-500/40 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Formulas Reference</span>
        </button>

        <button
          onClick={handleConfetti}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,194,255,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate (Confetti)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenNotes();
          }}
          className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold transition-all border border-white/10 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Speaker Notes</span>
        </button>
      </motion.div>
    </div>
  );
};
