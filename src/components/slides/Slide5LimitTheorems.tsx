import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Layers, CheckCircle2 } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide5LimitTheorems: React.FC = () => {
  const [activeLawId, setActiveLawId] = useState<number>(0);
  const [showSqueezeDemo, setShowSqueezeDemo] = useState<boolean>(false);
  const [squeezeX, setSqueezeX] = useState<number>(0.35);

  const laws = [
    {
      id: 1,
      name: 'Sum Law',
      formula: '\\lim_{x \\to a} [f(x) + g(x)] = L + M',
      desc: 'The limit of a sum equals the sum of the individual limits.',
      condition: 'Provided both lim f(x) = L and lim g(x) = M exist independently.',
      example: '\\lim_{x \\to 2} (x^2 + 3x) = 4 + 6 = 10',
    },
    {
      id: 2,
      name: 'Difference Law',
      formula: '\\lim_{x \\to a} [f(x) - g(x)] = L - M',
      desc: 'The limit of a difference is the difference of the limits.',
      condition: 'Direct corollary of the Sum Law combined with Constant Multiple c = -1.',
      example: '\\lim_{x \\to 3} (x^2 - 4) = 9 - 4 = 5',
    },
    {
      id: 3,
      name: 'Constant Multiple Law',
      formula: '\\lim_{x \\to a} [c \\cdot f(x)] = c \\cdot L',
      desc: 'Constants can be factored outside the limit operator unharmed.',
      condition: 'Holds for any real constant scalar c ∈ ℝ.',
      example: '\\lim_{x \\to 5} [7x] = 7 \\cdot \\lim_{x \\to 5} x = 7 \\cdot 5 = 35',
    },
    {
      id: 4,
      name: 'Product Law',
      formula: '\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M',
      desc: 'The limit of a product is the product of the limits.',
      condition: 'Requires careful bounding of auxiliary terms in formal ε-δ proof.',
      example: '\\lim_{x \\to 1} [(x + 2)(x + 3)] = (3)(4) = 12',
    },
    {
      id: 5,
      name: 'Quotient Law',
      formula: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}',
      desc: 'The limit of a quotient is the quotient of the limits.',
      condition: 'Strict prerequisite: M = lim g(x) ≠ 0. If M = 0, division is undefined.',
      example: '\\lim_{x \\to 4} \\frac{2x + 1}{x - 2} = \\frac{9}{2} = 4.5',
    },
    {
      id: 6,
      name: 'Power & Root Law',
      formula: '\\lim_{x \\to a} [f(x)]^n = L^n, \\quad \\lim_{x \\to a} \\sqrt[n]{f(x)} = \\sqrt[n]{L}',
      desc: 'Limits pass seamlessly inside continuous power and root functions.',
      condition: 'If n is an even integer root, we require L > 0 to remain in real domain ℝ.',
      example: '\\lim_{x \\to 9} \\sqrt{x + 7} = \\sqrt{16} = 4',
    },
  ];

  // Squeeze theorem evaluation:
  // g(x) = -x², f(x) = x² sin(1/x), h(x) = x²
  const hVal = Math.pow(squeezeX, 2);
  const gVal = -Math.pow(squeezeX, 2);
  const fSqueezeVal = squeezeX === 0 ? 0 : Math.pow(squeezeX, 2) * Math.sin(1 / squeezeX);

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 3 · Limit Theorems
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            The Algebraic Toolbox & Squeeze Theorem
          </h2>
        </div>

        {/* Toggle Squeeze Theorem Sandbox */}
        <button
          onClick={() => {
            sound.playClick();
            setShowSqueezeDemo(!showSqueezeDemo);
          }}
          className={`mt-2 md:mt-0 px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center gap-2 ${
            showSqueezeDemo
              ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(255,184,0,0.4)]'
              : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{showSqueezeDemo ? 'Show Laws Grid' : 'Open Squeeze Theorem Lab'}</span>
        </button>
      </div>

      {!showSqueezeDemo ? (
        /* Standard 6-Laws Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {laws.map((law, idx) => {
            const isSelected = activeLawId === idx;
            return (
              <motion.div
                key={law.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  sound.playClick();
                  setActiveLawId(idx);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'glass-panel-cyan border-cyan-500/60 shadow-[0_0_25px_rgba(0,194,255,0.2)]'
                    : 'glass-panel border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      LAW #{law.id}
                    </span>
                    <span className="text-xs font-bold text-white">{law.name}</span>
                  </div>

                  {/* Formula */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-white/5 my-2 text-center">
                    <MathView math={law.formula} block className="text-cyan-200 font-bold" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {law.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1.5">
                  <div className="text-[11px] text-slate-400 flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{law.condition}</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300/90 bg-slate-900/50 p-1.5 rounded">
                    Ex: <MathView math={law.example} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Interactive Squeeze (Sandwich) Theorem Sandbox */
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 space-y-5 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                The Squeeze (Sandwich) Theorem
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Trapping the Oscillating Function: <MathView math="f(x) = x^2 \sin(1/x)" />
              </h3>
            </div>
            <div className="text-xs text-slate-300 max-w-md">
              Since <MathView math="-1 \le \sin(1/x) \le 1" />, multiplying by <MathView math="x^2 > 0" /> traps <MathView math="f(x)" /> strictly between <MathView math="-x^2" /> and <MathView math="x^2" />.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Interactive Squeeze Sliders & Mathematical Evaluation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Approach Distance x:</span>
                  <span className="text-amber-300 font-bold px-2 py-0.5 rounded bg-slate-950 border border-white/10">
                    x = {squeezeX.toFixed(3)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.01"
                  max="0.80"
                  step="0.01"
                  value={squeezeX}
                  onChange={(e) => setSqueezeX(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 block font-bold">Top Bound h(x) = x²</span>
                    <span className="text-white font-bold">+{hVal.toFixed(4)}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                    <span className="text-[10px] text-cyan-400 block font-bold">Middle f(x)</span>
                    <span className="text-amber-300 font-bold">{fSqueezeVal.toFixed(4)}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30">
                    <span className="text-[10px] text-rose-400 block font-bold">Bottom g(x) = -x²</span>
                    <span className="text-white font-bold">{gVal.toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {/* Theorem Formal Statement */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Formal Squeeze Deduction:
                </div>
                <div>
                  1. For all <MathView math="x \neq 0" />, <MathView math="-x^2 \le x^2 \sin(1/x) \le x^2" />.
                </div>
                <div>
                  2. As <MathView math="x \to 0" />, <MathView math="\lim_{x \to 0} (-x^2) = 0" /> and <MathView math="\lim_{x \to 0} x^2 = 0" />.
                </div>
                <div className="font-bold text-white text-sm pt-1">
                  ∴ By Squeeze Theorem: <MathView math="\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0" />
                </div>
              </div>
            </div>

            {/* Right: SVG Squeeze Envelope Visualization */}
            <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl border border-white/10 p-3 flex flex-col items-center justify-center">
              <div className="text-[11px] font-mono text-slate-400 mb-1">
                Visual Envelope: Function Trapped in Parabolic Funnel
              </div>
              <svg viewBox="0 0 360 220" className="w-full max-h-[220px]">
                {/* Axes */}
                <line x1="20" y1="110" x2="340" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="180" y1="20" x2="180" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                {/* Parabola Upper h(x) = x² */}
                <path
                  d="M 60 40 Q 180 110 300 40"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text x="305" y="45" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">+x²</text>

                {/* Parabola Lower g(x) = -x² */}
                <path
                  d="M 60 180 Q 180 110 300 180"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text x="305" y="185" fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono">-x²</text>

                {/* Oscillating Function f(x) = x² sin(1/x) squeezed */}
                <path
                  d="M 60 40 Q 80 150 100 70 T 120 135 T 140 90 T 160 120 T 180 110 T 200 100 T 220 130 T 240 85 T 260 145 T 280 65 T 300 40"
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="2"
                />

                {/* Center pinch point at (0, 0) */}
                <circle cx="180" cy="110" r="5" fill="#00C2FF" stroke="#FFFFFF" strokeWidth="2" />
                <text x="180" y="130" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">
                  Limit = 0
                </text>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
