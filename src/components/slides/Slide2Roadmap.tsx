import React from 'react';

interface Slide2RoadmapProps {
  onSelectSlide?: (slideIndex: number) => void;
}

export const Slide2Roadmap: React.FC<Slide2RoadmapProps> = ({ onSelectSlide }) => {
  const steps = [
    {
      num: '01',
      title: 'Intuition',
      subtitle: 'Approaching vs. Touching',
      desc: 'The concept of a limit through f(x) = (x²−1)/(x−1) and removable singularities.',
      slide: 3,
    },
    {
      num: '02',
      title: 'Applications',
      subtitle: 'Calculus & Computer Science',
      desc: 'From instantaneous velocity to Big-O algorithm complexity and ML gradient flow.',
      slide: 4,
    },
    {
      num: '03',
      title: 'Limit Theorems',
      subtitle: 'Algebraic Framework',
      desc: 'Sum, product, and quotient laws, alongside the Squeeze Theorem.',
      slide: 5,
    },
    {
      num: '04',
      title: 'Precise Definition',
      subtitle: 'The ε–δ Guarantee',
      desc: 'Cauchy-Weierstrass formalization replacing informal nearness with strict inequalities.',
      slide: 6,
    },
    {
      num: '05',
      title: 'Formal Proofs',
      subtitle: 'Step-by-Step Derivations',
      desc: 'Rigorous ε-budget proofs of the Sum and Product Laws and worked verification.',
      slide: 7,
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Roadmap · 5 Chapters
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Presentation Structure
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Progressing methodically from concrete numerical observation to foundational analysis.
        </p>
      </div>

      {/* 5-Step Clean Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 my-auto">
        {steps.map((step) => (
          <div
            key={step.num}
            onClick={() => onSelectSlide?.(step.slide)}
            className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between text-left cursor-pointer group"
          >
            <div>
              <div className="text-xs font-mono font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mt-2">
                {step.title}
              </h3>
              <div className="text-xs text-zinc-400 font-medium mt-0.5">
                {step.subtitle}
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2.5">
                {step.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
              Slide {step.slide} →
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Bottom Note */}
      <div className="text-xs text-zinc-500 font-mono">
        Omar Elgohary · Egypt University of Informatics
      </div>
    </div>
  );
};
