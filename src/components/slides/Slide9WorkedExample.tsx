import React from 'react';
import { MathView } from '../ui/MathView';

export const Slide9WorkedExample: React.FC = () => {
  const steps = [
    {
      law: '1. Sum Law',
      formula: '\\lim_{x \\to 2} (3x + 1) = \\lim_{x \\to 2} (3x) + \\lim_{x \\to 2} 1',
      note: 'Split polynomial into individual component limits.',
    },
    {
      law: '2. Constant Multiple Law',
      formula: '= 3 \\cdot \\left[ \\lim_{x \\to 2} x \\right] + \\lim_{x \\to 2} 1',
      note: 'Factor scalar multiple (3) outside the variable limit.',
    },
    {
      law: '3. Elementary Limits & Arithmetic',
      formula: '= 3(2) + 1 = 6 + 1 = 7',
      note: 'Evaluate lim x = 2 and lim 1 = 1 to conclude the result.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Section 06 · Worked Example
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Evaluating <MathView math="\lim_{x \to 2} (3x + 1) = 7" />
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          A step-by-step demonstration applying the axiomatic limit laws.
        </p>
      </div>

      {/* Main Breakdown Grid */}
      <div className="my-auto max-w-3xl w-full space-y-3">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="sm:w-1/3">
              <span className="text-xs font-mono font-medium text-blue-400 block">
                {s.law}
              </span>
              <span className="text-xs text-zinc-500 mt-0.5 block">
                {s.note}
              </span>
            </div>
            <div className="sm:w-2/3 p-2.5 bg-zinc-950/80 rounded-lg border border-zinc-800/80 text-center font-mono text-zinc-100 text-sm">
              <MathView math={s.formula} block />
            </div>
          </div>
        ))}

        {/* Minimal ε-δ Verification Card */}
        <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div>
            <span className="text-zinc-300 font-semibold block">Analytical ε–δ Check:</span>
            <span>|(3x + 1) − 7| = 3|x − 2| &lt; ε ⇔ |x − 2| &lt; ε/3</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 block">Required Window:</span>
            <span className="text-emerald-400 font-medium">δ = ε / 3</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-zinc-500 font-mono">
        Omar Elgohary · Egypt University of Informatics
      </div>
    </div>
  );
};
