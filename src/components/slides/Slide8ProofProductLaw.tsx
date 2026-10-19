import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Sparkles, Award, Box, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide8ProofProductLaw: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showGeometricBox, setShowGeometricBox] = useState<boolean>(false);
  const totalSteps = 5;

  const steps = [
    {
      num: 1,
      title: 'The Classic Algebraic Trick: Add and Subtract L·g(x)',
      mathStatement: '|f(x)g(x) - LM| = |f(x)g(x) - Lg(x) + Lg(x) - LM|',
      content: 'We need to measure how far the product f(x)g(x) deviates from LM. We insert a strategic bridge term by adding and subtracting L·g(x):',
      subMath: 'f(x)g(x) - LM = g(x)[f(x) - L] + L[g(x) - M]',
      insight: 'This splits the single joint product error into two isolated terms containing (f(x) - L) and (g(x) - M).',
    },
    {
      num: 2,
      title: 'Factoring & The Triangle Inequality',
      mathStatement: '|g(x)[f(x) - L] + L[g(x) - M]| \\le |g(x)| \\cdot |f(x) - L| + |L| \\cdot |g(x) - M|',
      content: 'Applying the Triangle Inequality and multiplicative absolute value property (|A·B| = |A|·|B|):',
      subMath: '|f(x)g(x) - LM| \\le |g(x)| \\cdot |f(x) - L| + |L| \\cdot |g(x) - M|',
      insight: 'Notice the obstacle: |L| is a constant scalar, but |g(x)| is variable and could blow up unless we bound it!',
    },
    {
      num: 3,
      title: 'Taming the Variable Term: Bounding |g(x)|',
      mathStatement: '|g(x)| < |M| + 1',
      content: 'Since lim g(x) = M, we can choose an initial tolerance of 1. There exists \\delta_0 > 0 such that for 0 < |x - a| < \\delta_0:',
      subMath: '|g(x) - M| < 1 \\implies |g(x)| = |(g(x) - M) + M| \\le |g(x) - M| + |M| < |M| + 1',
      insight: 'Now |g(x)| is trapped safely below a fixed constant (|M| + 1) whenever x is close to a!',
    },
    {
      num: 4,
      title: 'Allocating the Two-Part ε-Budget',
      mathStatement: '\\delta_1 \\text{ and } \\delta_2 \\text{ Selection}',
      content: 'Given \\varepsilon > 0, we define two custom sub-tolerances to cancel out the bounding coefficients perfectly:',
      subMath: '\\exists \\delta_1 > 0 \\implies |f(x) - L| < \\frac{\\varepsilon}{2(|M| + 1)} \\\\[6pt] \\exists \\delta_2 > 0 \\implies |g(x) - M| < \\frac{\\varepsilon}{2(|L| + 1)}',
      insight: 'Notice the clever +1 in the denominator prevents division by zero if |L| = 0 or |M| = 0!',
    },
    {
      num: 5,
      title: 'The Master δ Triple-Minimum & Q.E.D.',
      mathStatement: '\\delta = \\min(\\delta_0, \\delta_1, \\delta_2) > 0',
      content: 'Whenever 0 < |x - a| < \\delta, all three bounds hold simultaneously, giving the triumphant final inequality:',
      subMath: '|f(x)g(x) - LM| < (|M|+1) \\cdot \\frac{\\varepsilon}{2(|M|+1)} + |L| \\cdot \\frac{\\varepsilon}{2(|L|+1)} \\le \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon',
      insight: 'Q.E.D. ■ The limit of the product is rigorously proven to equal L · M.',
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      sound.playStep(currentStep + 1);
      setCurrentStep((prev) => prev + 1);
      if (currentStep + 1 === totalSteps) {
        sound.playSuccess();
        confetti({
          particleCount: 55,
          spread: 65,
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
            Section 5 · Rigorous Proofs (Part 2)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Theorem: Rigorous Proof of the Product Law
          </h2>
        </div>

        {/* Toggle Geometric Intuition Box */}
        <button
          onClick={() => {
            sound.playClick();
            setShowGeometricBox(!showGeometricBox);
          }}
          className={`mt-2 md:mt-0 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            showGeometricBox
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'bg-slate-900 text-indigo-300 border-indigo-500/40 hover:bg-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>{showGeometricBox ? 'Show Step Wizard' : 'Geometric Area Intuition'}</span>
        </button>
      </div>

      {!showGeometricBox ? (
        /* Wizard Container */
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
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
                      ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-110'
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
              Step <span className="text-indigo-400 font-bold">{currentStep}</span> of {totalSteps}
            </div>
          </div>

          {/* Active Step Content */}
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
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold">
                    STEP {steps[currentStep - 1].num}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {steps[currentStep - 1].title}
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-center shadow-inner">
                  <MathView
                    math={steps[currentStep - 1].mathStatement}
                    block
                    className="text-lg md:text-xl text-indigo-200 font-bold"
                  />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {steps[currentStep - 1].content}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-center">
                  <MathView
                    math={steps[currentStep - 1].subMath}
                    block
                    className="text-white text-sm md:text-base"
                  />
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2.5 text-xs text-indigo-200">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mathematical Rigor:</strong> {steps[currentStep - 1].insight}
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
                  className="px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs font-mono shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-1 transition-all"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="px-4 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Q.E.D. ■ Product Law Proven</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Geometric Rectangle Area Intuition Panel */
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/40 space-y-4 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              Geometric Intuition of the Product Error
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Why the "Add & Subtract" Trick Works
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Think of <MathView math="f(x) \cdot g(x)" /> as the expanding area of a rectangle with sides <MathView math="L + \Delta f" /> and <MathView math="M + \Delta g" />.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
            {/* SVG Visual of Rectangle Decomposition */}
            <div className="bg-slate-950/90 rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-center">
              <svg viewBox="0 0 320 220" className="w-full max-h-[220px]">
                {/* Main Base Area L * M */}
                <rect x="30" y="70" width="180" height="120" fill="rgba(0, 194, 255, 0.2)" stroke="#00C2FF" strokeWidth="2" />
                <text x="120" y="135" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">
                  L · M (Target Area)
                </text>

                {/* Top Strip Δg * L */}
                <rect x="30" y="30" width="180" height="40" fill="rgba(255, 184, 0, 0.25)" stroke="#FFB800" strokeWidth="1.5" />
                <text x="120" y="55" fill="#FBBF24" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">
                  L · Δg
                </text>

                {/* Right Strip Δf * M */}
                <rect x="210" y="70" width="70" height="120" fill="rgba(16, 185, 129, 0.25)" stroke="#10B981" strokeWidth="1.5" />
                <text x="245" y="135" fill="#34D399" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">
                  M · Δf
                </text>

                {/* Corner Piece Δf * Δg (Second order tiny) */}
                <rect x="210" y="30" width="70" height="40" fill="rgba(168, 85, 247, 0.25)" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="245" y="55" fill="#C084FC" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
                  Δf · Δg
                </text>
              </svg>
            </div>

            {/* Algebraic Commentary */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                <span className="text-white font-bold block mb-1">Expanding Total Area:</span>
                <MathView
                  math="(L + \Delta f)(M + \Delta g) = LM + L \Delta g + M \Delta f + \Delta f \Delta g"
                  block
                  className="text-cyan-200"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                <span className="text-white font-bold block mb-1">Error Difference from LM:</span>
                <MathView
                  math="\text{Error} = L \Delta g + M \Delta f + \Delta f \Delta g"
                  block
                  className="text-amber-200"
                />
              </div>

              <p className="leading-relaxed">
                As <MathView math="x \to a" />, both slivers <MathView math="\Delta f \to 0" /> and <MathView math="\Delta g \to 0" />, shrinking the excess perimeter bands to zero!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
