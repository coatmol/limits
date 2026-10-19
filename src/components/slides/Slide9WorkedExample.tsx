import React, { useState } from 'react';
import { Calculator, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide9WorkedExample: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'laws' | 'epsilon-delta'>('laws');

  // Interactive Delta calculator state
  const [userEps, setUserEps] = useState<number>(0.06);
  const computedDelta = userEps / 3.0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 6 · Worked Example Walkthrough
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Problem: Evaluate <MathView math="\lim_{x \to 2} (3x + 1) = 7" />
          </h2>
        </div>

        {/* Method Switcher */}
        <div className="mt-2 md:mt-0 flex items-center p-1 rounded-xl bg-slate-900 border border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              setActiveMethod('laws');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMethod === 'laws'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,194,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Method A: Limit Laws</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveMethod('epsilon-delta');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMethod === 'epsilon-delta'
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(255,184,0,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Method B: ε–δ Proof</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Method Walkthrough (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          {activeMethod === 'laws' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Deconstruction via Axiomatic Laws
                </span>
                <span className="text-[11px] font-mono text-slate-400">Algebraic Decomposition</span>
              </div>

              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="text-cyan-400 font-mono">1. Apply the Sum Law:</span>
                  <span className="text-slate-500 text-[11px]">lim [f + g] = lim f + lim g</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-white/5 text-center">
                  <MathView math="\lim_{x \to 2} (3x + 1) = \lim_{x \to 2} (3x) + \lim_{x \to 2} 1" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="text-amber-400 font-mono">2. Factor the Constant Scalar (3):</span>
                  <span className="text-slate-500 text-[11px]">Constant Multiple Law</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-white/5 text-center">
                  <MathView math="= 3 \cdot \left[ \lim_{x \to 2} x \right] + \lim_{x \to 2} 1" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 font-mono">3. Evaluate Elementary Limits:</span>
                  <span className="text-slate-500 text-[11px]">lim x = a and lim c = c</span>
                </div>
                <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-center font-bold text-emerald-300">
                  <MathView math="= 3(2) + 1 = 6 + 1 = \mathbf{7}" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Rigorous (ε–δ) Proof Construction
                </span>
                <span className="text-[11px] font-mono text-slate-400">Formal Verification</span>
              </div>

              {/* Phase 1: Scratch Work */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5">
                <div className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                  Phase 1: Scratch Work (Find δ in terms of ε)
                </div>
                <p className="text-xs text-slate-300">
                  We seek <MathView math="\delta > 0" /> such that <MathView math="0 < |x - 2| < \delta \implies |(3x + 1) - 7| < \varepsilon" />.
                </p>
                <div className="p-2 rounded bg-slate-950 border border-white/5 text-center text-xs">
                  <MathView math="|(3x + 1) - 7| = |3x - 6| = 3|x - 2| < \varepsilon \iff |x - 2| < \frac{\varepsilon}{3}" />
                </div>
                <div className="text-xs text-cyan-300 font-mono">
                  💡 This suggests choosing <MathView math="\delta = \frac{\varepsilon}{3}" />.
                </div>
              </div>

              {/* Phase 2: Formal Proof */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  Phase 2: The Formal Proof Execution
                </div>
                <p className="text-xs text-slate-300">
                  Given any <MathView math="\varepsilon > 0" />, choose <MathView math="\delta = \frac{\varepsilon}{3} > 0" />.
                </p>
                <p className="text-xs text-slate-300">
                  If <MathView math="0 < |x - 2| < \delta" />, then:
                </p>
                <div className="p-2 rounded bg-slate-950 border border-white/5 text-center text-xs font-bold text-emerald-300">
                  <MathView math="|(3x + 1) - 7| = 3|x - 2| < 3\delta = 3\left(\frac{\varepsilon}{3}\right) = \varepsilon \quad \blacksquare" />
                </div>
              </div>
            </div>
          )}

          {/* Academic Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Result: Limit is unconditionally validated as 7</span>
            <span className="text-cyan-400 font-mono">Omar Elgohary (EUI)</span>
          </div>
        </div>

        {/* Right Column: Interactive Delta Calculator & Live Verification (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Interactive (δ = ε / 3) Calculator
              </h3>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Test any arbitrary output tolerance <MathView math="\varepsilon" /> and observe how our proven formula automatically computes the safe input radius <MathView math="\delta" />:
            </p>

            {/* Slider & Presets */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">Pick ε Tolerance:</span>
                <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30">
                  ε = {userEps.toFixed(4)}
                </span>
              </div>

              <input
                type="range"
                min="0.003"
                max="0.300"
                step="0.003"
                value={userEps}
                onChange={(e) => setUserEps(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              {/* Preset buttons */}
              <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
                <span className="text-slate-500">Presets:</span>
                {[0.03, 0.06, 0.12, 0.24].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      sound.playClick();
                      setUserEps(p);
                    }}
                    className={`px-2 py-0.5 rounded border ${
                      Math.abs(userEps - p) < 0.001
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Computed Results Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2.5">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Computed Delta Window
              </div>
              <div className="text-xl font-mono font-bold text-amber-300">
                δ = ε / 3 = {computedDelta.toFixed(5)}
              </div>
              <div className="text-xs text-slate-300 space-y-1 font-mono pt-1 border-t border-white/5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Safe Input x-range:</span>
                  <span className="text-white">({(2 - computedDelta).toFixed(4)}, {(2 + computedDelta).toFixed(4)})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resulting Output f(x):</span>
                  <span className="text-emerald-400">({(7 - userEps).toFixed(4)}, {(7 + userEps).toFixed(4)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Seal */}
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Guaranteed: Max error |f(x) - 7| strictly below {userEps.toFixed(4)}.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
