import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide7ProofSumLaw: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const steps = [
    {
      num: 1,
      title: 'State Assumptions & The Target Objective',
      mathStatement: '\\lim_{x \\to a} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to a} g(x) = M',
      content: 'Let arbitrary \\varepsilon > 0 be given. Our objective is to construct a single distance \\delta > 0 such that whenever:',
      subMath: '0 < |x - a| < \\delta \\implies |(f(x) + g(x)) - (L + M)| < \\varepsilon',
      insight: 'Notice we must produce one unified delta that simultaneously protects both functions.',
    },
    {
      num: 2,
      title: 'Regrouping & The Triangle Inequality',
      mathStatement: '|(f(x) + g(x)) - (L + M)| = |(f(x) - L) + (g(x) - M)|',
      content: 'We algebraically regroup the terms into two distinct discrepancy components, then invoke the fundamental Triangle Inequality |A + B| \\le |A| + |B|:',
      subMath: '|(f(x) - L) + (g(x) - M)| \\le |f(x) - L| + |g(x) - M|',
      insight: 'Triangle Inequality converts an unwieldy combined error into two isolated errors that we already know how to control!',
    },
    {
      num: 3,
      title: 'The (ε / 2) Budget Allocation Strategy',
      mathStatement: '\\varepsilon\' = \\frac{\\varepsilon}{2} > 0',
      content: 'Since both limits exist, we can challenge each function with half our total error allowance (\\varepsilon/2):',
      subMath: '\\exists \\delta_1 > 0 \\text{ s.t. } 0 < |x-a| < \\delta_1 \\implies |f(x) - L| < \\frac{\\varepsilon}{2} \\\\ \\exists \\delta_2 > 0 \\text{ s.t. } 0 < |x-a| < \\delta_2 \\implies |g(x) - M| < \\frac{\\varepsilon}{2}',
      insight: 'The genius of the proof: If each function contributes less than ε/2, their combined sum cannot exceed ε.',
    },
    {
      num: 4,
      title: 'Constructing The Master δ = min(δ₁, δ₂)',
      mathStatement: '\\delta = \\min(\\delta_1, \\delta_2) > 0',
      content: 'To make sure BOTH inequalities hold true simultaneously, we pick delta as the tighter (smaller) of the two radius thresholds:',
      subMath: '0 < |x - a| < \\delta \\implies \\begin{cases} |x - a| < \\delta_1 \\implies |f(x) - L| < \\frac{\\varepsilon}{2} \\\\[4pt] |x - a| < \\delta_2 \\implies |g(x) - M| < \\frac{\\varepsilon}{2} \\end{cases}',
      insight: 'By choosing the minimum, whenever x is within δ of a, it is automatically within both δ1 and δ2.',
    },
    {
      num: 5,
      title: 'The Final Chain of Inequalities (Q.E.D.)',
      mathStatement: '|(f(x) + g(x)) - (L + M)| < \\varepsilon',
      content: 'Putting it all together, for all x satisfying 0 < |x - a| < \\delta:',
      subMath: '|(f(x) + g(x)) - (L + M)| \\le |f(x) - L| + |g(x) - M| < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon',
      insight: 'The proof is complete. For every ε > 0, we found δ = min(δ1, δ2) satisfying the definition.',
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      sound.playStep(currentStep + 1);
      setCurrentStep((prev) => prev + 1);
      if (currentStep + 1 === totalSteps) {
        sound.playSuccess();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      sound.playClick();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 5 · Rigorous Proofs (Part 1)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Theorem: Rigorous Proof of the Sum Law
          </h2>
        </div>

        {/* Big Idea Pill */}
        <div className="mt-2 md:mt-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Big Idea: ε/2 + ε/2 = ε</span>
        </div>
      </div>

      {/* Main Wizard Container */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {steps.map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  sound.playStep(s.num);
                  setCurrentStep(s.num);
                }}
                className={`w-8 h-8 rounded-full font-mono text-xs font-bold transition-all flex items-center justify-center ${
                  s.num === currentStep
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,194,255,0.6)] scale-110'
                    : s.num < currentStep
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500 border border-white/5'
                }`}
              >
                {s.num < currentStep ? '✓' : s.num}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Step <span className="text-cyan-400 font-bold">{currentStep}</span> of {totalSteps}
          </div>
        </div>

        {/* Active Step Content with Animated Height Transition */}
        <div className="min-h-[260px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Step Header */}
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  STEP {steps[currentStep - 1].num}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {steps[currentStep - 1].title}
                </h3>
              </div>

              {/* Primary Formula Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-center shadow-inner">
                <MathView
                  math={steps[currentStep - 1].mathStatement}
                  block
                  className="text-lg md:text-xl text-cyan-200 font-bold"
                />
              </div>

              {/* Step Explanation Text */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {steps[currentStep - 1].content}
              </p>

              {/* Sub Formula Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-center">
                <MathView
                  math={steps[currentStep - 1].subMath}
                  block
                  className="text-white text-sm md:text-base"
                />
              </div>

              {/* Insight Callout */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Key Intuition:</strong> {steps[currentStep - 1].insight}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Wizard Controls Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Restart Proof Wizard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Proof</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 transition-all ${
                currentStep === 1
                  ? 'opacity-30 cursor-not-allowed border-white/5 text-slate-500'
                  : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_15px_rgba(0,194,255,0.4)] flex items-center gap-1 transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="px-4 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Q.E.D. ■ Proof Complete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
