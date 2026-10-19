import React from 'react';

interface Slide10ConclusionProps {
  onRestart?: () => void;
}

export const Slide10Conclusion: React.FC<Slide10ConclusionProps> = ({ onRestart }) => {
  const takeaways = [
    { title: 'Intuition', text: 'Limits observe values in the neighborhood of x = a without evaluating at the point itself.' },
    { title: 'Applications', text: 'Bridges discrete calculations to instantaneous rates, Big-O algorithm growth, and ML optimization.' },
    { title: 'Algebraic Laws', text: 'Sum, Product, Quotient, and Squeeze theorems enable algebraic manipulation of limits.' },
    { title: 'The ε–δ Framework', text: 'Replaces hand-wavy descriptions with rigorous challenge-and-response inequalities.' },
    { title: 'Analytical Proofs', text: 'Techniques like the ε-budget and auxiliary bounding provide mathematical certainty.' },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Conclusion · Summary
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Thank You
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Limits: From Intuition to Proof — Summary & Core Takeaways
        </p>
      </div>

      {/* Summary Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto max-w-4xl">
        <div className="space-y-2.5">
          {takeaways.map((item, idx) => (
            <div key={idx} className="text-xs text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-200 mr-1.5">• {item.title}:</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* Academic Tribute Box */}
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between text-xs space-y-4">
          <div>
            <div className="text-zinc-500 font-mono uppercase text-[10px] tracking-wider mb-1">
              Egypt University of Informatics (EUI)
            </div>
            <div className="text-sm font-semibold text-zinc-100">
              Department of Basic Sciences · Calculus I
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <div>
              <span className="text-zinc-500 text-[11px] block">Presenter:</span>
              <span className="text-zinc-200 font-medium">Omar Elgohary</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[11px] block">Supervision & Review:</span>
              <span className="text-zinc-300">Dr. Mahmoud Mohamed & Eng. Youssef Hamed</span>
            </div>
          </div>

          {onRestart && (
            <div className="pt-2">
              <button
                onClick={onRestart}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
              >
                ↺ Restart Presentation (Slide 1)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-zinc-500 font-mono">
        Limits: From Intuition to Proof · EUI Presentation
      </div>
    </div>
  );
};
