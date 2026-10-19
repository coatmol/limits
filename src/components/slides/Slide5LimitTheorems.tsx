import React from 'react';
import { MathView } from '../ui/MathView';

export const Slide5LimitTheorems: React.FC = () => {
  const laws = [
    {
      num: '01',
      title: 'Sum & Difference Law',
      formula: '\\lim_{x \\to a} [f(x) \\pm g(x)] = L \\pm M',
      desc: 'The limit of a sum or difference equals the sum or difference of the individual limits.',
    },
    {
      num: '02',
      title: 'Constant Multiple Law',
      formula: '\\lim_{x \\to a} [c \\cdot f(x)] = c \\cdot L',
      desc: 'Constant real scalar c factors outside the limit operator unharmed.',
    },
    {
      num: '03',
      title: 'Product Law',
      formula: '\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M',
      desc: 'The limit of a product is the product of the respective limits.',
    },
    {
      num: '04',
      title: 'Quotient Law',
      formula: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M} \\quad (M \\neq 0)',
      desc: 'Valid provided the denominator limit M is strictly non-zero.',
    },
    {
      num: '05',
      title: 'Power & Root Law',
      formula: '\\lim_{x \\to a} [f(x)]^n = L^n, \\quad \\lim_{x \\to a} \\sqrt[n]{f(x)} = \\sqrt[n]{L}',
      desc: 'Limits commute inside integer powers and continuous roots (L > 0 for even roots).',
    },
    {
      num: '06',
      title: 'Squeeze (Sandwich) Theorem',
      formula: 'g(x) \\le f(x) \\le h(x) \\implies \\lim_{x \\to a} f(x) = L',
      desc: 'If both outer bounds converge to L as x → a, the trapped function must also converge to L.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Section 03 · Limit Theorems
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Fundamental Limit Laws
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Assuming both <MathView math="\lim_{x \to a} f(x) = L" /> and <MathView math="\lim_{x \to a} g(x) = M" /> exist as finite real numbers.
        </p>
      </div>

      {/* Clean 6-Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-auto">
        {laws.map((law) => (
          <div
            key={law.num}
            className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{law.num}</span>
                <span className="text-zinc-300 font-medium">{law.title}</span>
              </div>
              <div className="py-2.5 my-2 text-center bg-zinc-950/70 rounded-lg border border-zinc-800/80">
                <MathView math={law.formula} block className="text-zinc-100 text-sm font-semibold" />
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1">
              {law.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-xs text-zinc-500 font-mono">
        These theorems permit decomposing complicated rational functions into elementary operations.
      </div>
    </div>
  );
};
