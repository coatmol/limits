import React from 'react';

export const Slide1Hero: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Top Academic Tag */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-500 uppercase">
        <span>Egypt University of Informatics (EUI)</span>
        <span>Calculus · Foundations</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="my-auto max-w-3xl space-y-4">
        <div className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
          Lecture Presentation
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Limits: From Intuition to Proof
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-normal leading-relaxed pt-1">
          A rigorous journey from geometric intuition and indeterminate forms to the formal <span className="text-zinc-200 font-serif italic">ε–δ</span> definition and mathematical proofs.
        </p>
      </div>

      {/* Bottom Metadata Footer */}
      <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div>
          <span className="text-zinc-500 uppercase font-mono tracking-wider text-[11px] block">Presenter</span>
          <span className="text-zinc-200 font-medium text-sm">Omar Elgohary</span>
        </div>
        <div className="sm:text-right">
          <span className="text-zinc-500 uppercase font-mono tracking-wider text-[11px] block">Supervision</span>
          <span className="text-zinc-300 font-medium">Dr. Mahmoud Mohamed & Eng. Youssef Hamed</span>
        </div>
      </div>
    </div>
  );
};
