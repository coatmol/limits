import React, { useState } from 'react';
import { MathView } from '../ui/MathView';

export const Slide7ProofSumLaw: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const steps = [
    {
      num: '1',
      title: 'State Hypotheses & Objective',
      math: '\\lim_{x \\to a} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to a} g(x) = M',
      desc: 'Let ε > 0 be arbitrary. We must find δ > 0 such that 0 < |x − a| < δ implies |(f(x) + g(x)) − (L + M)| < ε.',
    },
    {
      num: '2',
      title: 'Regroup & Triangle Inequality',
      math: '|(f(x) + g(x)) - (L + M)| = |(f(x) - L) + (g(x) - M)| \\le |f(x) - L| + |g(x) - M|',
      desc: 'Regrouping splits the total error into two independent components bounded by |A + B| ≤ |A| + |B|.',
    },
    {
      num: '3',
      title: 'The ε/2 Budget Allocation',
      math: '\\exists \\delta_1 > 0 \\implies |f(x) - L| < \\frac{\\varepsilon}{2}, \\quad \\exists \\delta_2 > 0 \\implies |g(x) - M| < \\frac{\\varepsilon}{2}',
      desc: 'Because each limit exists, we can challenge each with half the total error tolerance (ε/2).',
    },
    {
      num: '4',
      title: 'Construct the Master δ',
      math: '\\delta = \\min(\\delta_1, \\delta_2) > 0',
      desc: 'Selecting the minimum radius ensures both inequalities hold true at the same time for all 0 < |x − a| < δ.',
    },
    {
      num: '5',
      title: 'Synthesis & Conclusion (Q.E.D.)',
      math: '|(f(x) + g(x)) - (L + M)| < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon \\quad \\blacksquare',
      desc: 'For every ε > 0, we have exhibited δ = min(δ₁, δ₂) satisfying the definition. Hence lim [f + g] = L + M.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            Section 05 · Rigorous Proofs (Part 1)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Proof of the Sum Law
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Deriving <MathView math="\lim_{x \to a} [f(x) + g(x)] = L + M" /> via the <span className="font-mono text-zinc-200">ε/2</span> allocation technique.
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
