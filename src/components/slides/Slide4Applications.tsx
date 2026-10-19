import React from 'react';
import { MathView } from '../ui/MathView';

export const Slide4Applications: React.FC = () => {
  const generalApplications = [
    {
      title: 'Instantaneous Velocity',
      math: 'v(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t+\\Delta t) - s(t)}{\\Delta t}',
      desc: 'Resolves Zeno\'s paradox to define exact motion at a single point in time.',
    },
    {
      title: 'Definite Integrals & Area',
      math: '\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x',
      desc: 'Sums infinitely many thin rectangles to calculate curved area and accumulation.',
    },
    {
      title: 'Continuity & Signals',
      math: '\\lim_{t \\to t_0} s(t) = s(t_0)',
      desc: 'Ensures analog and digital physical signals remain free of instantaneous jumps.',
    },
    {
      title: 'Marginal Cost & Economics',
      math: 'MC(q) = \\lim_{\\Delta q \\to 0} \\frac{\\Delta C}{\\Delta q}',
      desc: 'Quantifies rate of change in cost when scaling unit production.',
    },
    {
      title: 'Dynamic Stability',
      math: '\\lim_{t \\to \\infty} |y(t) - y_{\\text{target}}| = 0',
      desc: 'Assesses whether control systems and robotics asymptotically stabilize over time.',
    },
  ];

  const csApplications = [
    {
      title: 'Big-O Growth Rates',
      math: '\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = c \\implies f(n) = \\Theta(g(n))',
      desc: 'Classifies asymptotic time and memory scalability of algorithms.',
    },
    {
      title: 'Gradient Descent Convergence',
      math: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla L \\xrightarrow{\\alpha \\to 0} \\dot{\\theta} = -\\nabla L',
      desc: 'Continuous limits explain optimization flows in machine learning models.',
    },
    {
      title: 'Numerical Step-Size Error',
      math: '\\lim_{h \\to 0} \\frac{E(h)}{h^p} = C',
      desc: 'Balances truncation error and floating-point roundoff in differential solvers.',
    },
    {
      title: 'Smooth Curves & Ray Marching',
      math: '\\lim_{k \\to \\infty} \\mathbf{p}_{k+1} = \\text{Boundary Intersection}',
      desc: 'Powers sphere tracing in Signed Distance Fields (SDFs) and graphics rendering.',
    },
    {
      title: 'Expected Runtime & CS Theory',
      math: '\\sum_{k=1}^{\\infty} k p (1-p)^{k-1} = \\frac{1}{p}',
      desc: 'Infinite series convergence in randomized algorithms and Markov chains.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Section 02 · Applications
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          Real-World & Computer Science Applications
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Limits form the bridge between discrete approximation and continuous physical systems.
        </p>
      </div>

      {/* Two Distinct Vertical Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Column 1: General Calculus & Engineering */}
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-5 space-y-3">
          <div className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-800 flex items-center justify-between">
            <span>General Calculus & Physics</span>
            <span className="text-zinc-500">5 Domains</span>
          </div>

          <div className="space-y-3">
            {generalApplications.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-200">
                  <span>{item.title}</span>
                  <span className="text-[11px] font-mono text-zinc-400"><MathView math={item.math} /></span>
                </div>
                <p className="text-xs text-zinc-500 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Computer Science */}
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-5 space-y-3">
          <div className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider pb-2 border-b border-zinc-800 flex items-center justify-between">
            <span>Computer Science & AI</span>
            <span className="text-zinc-500">5 Domains</span>
          </div>

          <div className="space-y-3">
            {csApplications.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-200">
                  <span>{item.title}</span>
                  <span className="text-[11px] font-mono text-zinc-400"><MathView math={item.math} /></span>
                </div>
                <p className="text-xs text-zinc-500 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
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
