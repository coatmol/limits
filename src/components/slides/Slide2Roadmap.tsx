import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Cpu, BookCheck, Target, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Slide2RoadmapProps {
  onSelectSlide: (slideIndex: number) => void;
}

export const Slide2Roadmap: React.FC<Slide2RoadmapProps> = ({ onSelectSlide }) => {
  const milestones = [
    {
      step: '01',
      slide: 3,
      title: 'Geometric Intuition',
      subtitle: 'The Limiting Behavior & Removable Singularities',
      desc: 'Investigating what happens as x approaches 1 for f(x) = (x² - 1)/(x - 1). Why 0/0 is not the end of the story, and how left/right limits agree on 2.',
      icon: Eye,
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30',
      badge: 'Interactive Hole at (1,2)',
    },
    {
      step: '02',
      slide: 4,
      title: 'Real-World & CS Applications',
      subtitle: 'From Instantaneous Velocity to Big-O & AI',
      desc: 'Discovering limits in action: algorithmic asymptotic growth, machine learning gradient descent continuous flows, and graphics ray-marching.',
      icon: Cpu,
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30',
      badge: 'Calculus + Computer Science',
    },
    {
      step: '03',
      slide: 5,
      title: 'Limit Theorems Grid',
      subtitle: 'The Algebraic Toolkit & Squeeze Theorem',
      desc: 'Mastering the fundamental laws: Sum, Product, Quotient, and the remarkable Squeeze (Sandwich) theorem for bounded oscillations.',
      icon: BookCheck,
      accent: 'border-amber-500/40 text-amber-400 bg-amber-950/30',
      badge: 'Algebraic Laws',
    },
    {
      step: '04',
      slide: 6,
      title: 'The Precise (ε–δ) Definition',
      subtitle: 'Cauchy & Weierstrass Formal Language',
      desc: 'Replacing hand-wavy "getting close" with quantitative guarantees. The challenge-and-response tolerance game on the coordinate plane.',
      icon: Target,
      accent: 'border-purple-500/40 text-purple-400 bg-purple-950/30',
      badge: 'Interactive Lab & Graph',
    },
    {
      step: '05',
      slide: 7,
      title: 'Rigorous Q.E.D. Proofs',
      subtitle: 'Sum Law, Product Law & Worked Examples',
      desc: 'Step-by-step interactive derivation of the Sum Law (ε/2 budget), Product Law (bounding auxiliary factors), and complete worked problems.',
      icon: ShieldCheck,
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
      badge: 'Formal Mathematical Rigor',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          PRESENTATION ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The 5 Pillars of Our Journey
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-1">
          Bridging the gap between initial geometric intuition and rigorous modern analysis
        </p>
      </div>

      {/* Grid of 5 Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => {
                sound.playSlideTransition();
                onSelectSlide(m.slide);
              }}
              className="group cursor-pointer glass-panel rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,194,255,0.15)]"
            >
              <div>
                {/* Step badge & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${m.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-cyan-400/60 transition-colors">
                    {m.step}
                  </span>
                </div>

                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                  {m.badge}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {m.title}
                </h3>

                <div className="text-xs font-medium text-slate-400 mt-0.5 mb-2 line-clamp-1">
                  {m.subtitle}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              {/* Bottom Jump Indicator */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-cyan-400">
                <span>Jump to Slide #{m.slide}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}

        {/* 6th Card: Presenter's Thesis */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel-gold rounded-2xl p-5 border border-amber-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs uppercase font-mono font-bold tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Core Presentation Thesis
            </div>
            <h4 className="text-sm font-bold text-white leading-snug">
              "A limit is never about where you arrive, but the direction and integrity of your approach."
            </h4>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Functions can be broken, undefined, or singular at an exact point <span className="font-mono text-amber-300">x = a</span>, yet their limiting behavior can remain completely well-behaved and predictable.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/80 font-mono">
            Omar Elgohary · Egypt University of Informatics
          </div>
        </motion.div>
      </div>
    </div>
  );
};
