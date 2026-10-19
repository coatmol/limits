import React, { useState } from 'react';
import { MathView } from '../ui/MathView';

export const Slide8ProofProductLaw: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const steps = [
    {
      num: '1',
      title: 'The Algebraic Bridge: Add & Subtract L·g(x)',
      math: 'f(x)g(x) - LM = g(x)[f(x) - L] + L[g(x) - M]',
      desc: 'We add and subtract L·g(x) to split the joint product error into two terms isolating (f − L) and (g − M).',
    },
    {
      num: '2',
      title: 'Triangle Inequality & Factoring',
      math: '|f(x)g(x) - LM| \\le |g(x)| \\cdot |f(x) - L| + |L| \\cdot |g(x) - M|',
      desc: 'Applying |A + B| ≤ |A| + |B| and |AB| = |A||B|. Notice |L| is constant, but |g(x)| varies with x.',
    },
    {
      num: '3',
      title: 'Bounding the Variable Term |g(x)|',
      math: '|g(x) - M| < 1 \\implies |g(x)| < |M| + 1',
      desc: 'Since lim g(x) = M, there exists δ₀ > 0 such that |g(x) − M| < 1. Hence |g(x)| is bounded above by |M| + 1.',
    },
    {
      num: '4',
      title: 'Allocating the Scaled ε-Tolerances',
      math: '|f(x) - L| < \\frac{\\varepsilon}{2(|M| + 1)}, \\quad |g(x) - M| < \\frac{\\varepsilon}{2(|L| + 1)}',
      desc: 'Choose δ₁ and δ₂ to satisfy these denominators, which prevents division by zero even if |L| = 0 or |M| = 0.',
    },
    {
      num: '5',
      title: 'The Master δ Triple-Minimum (Q.E.D.)',
      math: '\\delta = \\min(\\delta_0, \\delta_1, \\delta_2) \\implies |f(x)g(x) - LM| < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon \\quad \\blacksquare',
      desc: 'Whenever 0 < |x − a| < δ, all three conditions hold simultaneously, concluding the proof. Hence lim [f · g] = L · M.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            Section 05 · Proofs (Part 2)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Proof of the Product Law
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Deriving <MathView math="\lim_{x \to a} [f(x) \cdot g(x)] = L \cdot M" /> through auxiliary factor bounding.
          </p>
        </div>

        {/* Minimal Step Indicator */}
        <div className="flex items-center gap-1.5 pt-1">
          {steps.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(idx + 1)}
              className={`w-7 h-7 rounded-md text-xs font-mono transition-colors ${
                currentStep === idx + 1
                  ? 'bg-zinc-200 text-zinc-900 font-semibold'
                  : currentStep > idx + 1
                  ? 'bg-zinc-800 text-zinc-300'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Content */}
      <div className="my-auto max-w-3xl space-y-4">
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-2">
            <span className="text-blue-400 font-medium">Step {currentStep} of {totalSteps}</span>
            <span>{steps[currentStep - 1].title}</span>
          </div>

          <div className="py-3 px-4 bg-zinc-950/80 rounded-lg border border-zinc-800/80 text-center">
            <MathView math={steps[currentStep - 1].math} block className="text-base sm:text-lg text-zinc-100 font-medium" />
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {steps[currentStep - 1].desc}
          </p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous Step
          </button>

          <span className="text-xs font-mono text-zinc-500">
            {currentStep === totalSteps ? 'Proof Complete (Q.E.D.)' : 'Line-by-line derivation'}
          </span>

          <button
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            disabled={currentStep === totalSteps}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next Step →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-zinc-500 font-mono">
        Omar Elgohary · Egypt University of Informatics
      </div>
    </div>
  );
};
