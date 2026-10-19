import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Wand2, Info, CheckCircle2 } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide6PreciseDefinition: React.FC = () => {
  // Test function: f(x) = 2x + 1 at a = 2, so L = 5.
  // Condition for validity: |f(x) - 5| = |2x - 4| = 2|x - 2| < ε  ==>  |x - 2| < ε / 2
  // Therefore, any delta <= ε / 2 is mathematically valid!
  const a = 2.0;
  const L = 5.0;

  const [epsilon, setEpsilon] = useState<number>(0.80);
  const [delta, setDelta] = useState<number>(0.35);

  const maxAllowedDelta = epsilon / 2.0;
  const isValid = delta <= maxAllowedDelta + 0.0001;

  // SVG coordinate transformation
  // X bounds: [0.5, 3.5], Y bounds: [2.0, 8.0]
  const svgWidth = 460;
  const svgHeight = 300;
  const padding = 45;

  const toSvgX = (x: number) => {
    return padding + ((x - 0.5) / (3.5 - 0.5)) * (svgWidth - 2 * padding);
  };
  const toSvgY = (y: number) => {
    return svgHeight - padding - ((y - 2.0) / (8.0 - 2.0)) * (svgHeight - 2 * padding);
  };

  const aSvgX = toSvgX(a);
  const lSvgY = toSvgY(L);

  // Epsilon corridor bounds (horizontal band)
  const epsTopSvgY = toSvgY(L + epsilon);
  const epsBottomSvgY = toSvgY(L - epsilon);

  // Delta corridor bounds (vertical band)
  const deltaLeftSvgX = toSvgX(a - delta);
  const deltaRightSvgX = toSvgX(a + delta);

  // Function endpoints within [0.5, 3.5]
  const lineStartSvgX = toSvgX(0.7);
  const lineStartSvgY = toSvgY(2 * 0.7 + 1);
  const lineEndSvgX = toSvgX(3.3);
  const lineEndSvgY = toSvgY(2 * 3.3 + 1);

  const handleAutoSolve = () => {
    sound.playSuccess();
    setDelta(parseFloat((epsilon / 2.0).toFixed(2)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 4 · Precise Definition
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            The (ε–δ) Cauchy-Weierstrass Guarantee
          </h2>
        </div>

        {/* Status Indicator */}
        <div
          className={`mt-2 md:mt-0 px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center gap-2 ${
            isValid
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'bg-rose-950/60 border-rose-500/50 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
          }`}
        >
          {isValid ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>VALID δ GUARANTEE (Trapped inside ε-band)</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>INVALID δ (Function escapes ε-corridor!)</span>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: Left is Formal Definition Card & Controls, Right is Interactive SVG Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Formal Definition & Dual Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Formal Definition Card */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Rigorous Mathematical Statement
            </div>
            <MathView
              math="\lim_{x \to a} f(x) = L \iff \forall \varepsilon > 0, \; \exists \delta > 0 \;\text{ s.t. }\; 0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon"
              block
              className="text-cyan-200 text-sm md:text-base font-semibold"
            />
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>The ε-δ Game:</strong> A skeptic challenges you with an arbitrary tolerance <MathView math="\varepsilon > 0" /> on output <MathView math="y" />. You win if you can specify an input window <MathView math="\delta > 0" /> on <MathView math="x" /> that forces all points into the target corridor.
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-4">
            {/* Epsilon Slider (Challenge) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  1. Skeptic sets Epsilon (ε) Tolerance:
                </span>
                <span className="text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  ε = ±{epsilon.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.30"
                max="1.60"
                step="0.05"
                value={epsilon}
                onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="text-[11px] text-slate-400">
                Target Output Window: <span className="font-mono text-cyan-300">({(L - epsilon).toFixed(2)}, {(L + epsilon).toFixed(2)})</span>
              </div>
            </div>

            {/* Delta Slider (Response) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  2. You supply Delta (δ) Window:
                </span>
                <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  δ = ±{delta.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="1.20"
                step="0.02"
                value={delta}
                onChange={(e) => setDelta(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Input Domain: <span className="font-mono text-amber-300">({(a - delta).toFixed(2)}, {(a + delta).toFixed(2)})</span></span>
                <span className="font-mono text-slate-400">Max δ = {(epsilon / 2).toFixed(2)}</span>
              </div>
            </div>

            {/* Auto Solve Button */}
            <button
              onClick={handleAutoSolve}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-amber-500/20 hover:from-cyan-500/30 hover:to-amber-500/30 border border-cyan-500/30 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Auto-Solve Optimal δ = ε / 2 (={maxAllowedDelta.toFixed(2)})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Coordinate Graph (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive (ε–δ) Coordinate Graph: f(x) = 2x + 1 at a = 2, L = 5
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Target Point: (2.0, 5.0)
              </span>
            </div>

            {/* SVG Graph Canvas */}
            <div className="relative bg-slate-950/90 rounded-xl border border-white/10 p-2 overflow-hidden flex items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-h-[300px] select-none"
              >
                {/* Horizontal Epsilon Corridor [L - eps, L + eps] */}
                <rect
                  x={padding}
                  y={epsTopSvgY}
                  width={svgWidth - 2 * padding}
                  height={epsBottomSvgY - epsTopSvgY}
                  fill="rgba(0, 194, 255, 0.12)"
                  stroke="#00C2FF"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Vertical Delta Corridor [a - delta, a + delta] */}
                <rect
                  x={deltaLeftSvgX}
                  y={padding}
                  width={deltaRightSvgX - deltaLeftSvgX}
                  height={svgHeight - 2 * padding}
                  fill="rgba(255, 184, 0, 0.10)"
                  stroke="#FFB800"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Overlap Bounding Box: The Challenge Arena */}
                <rect
                  x={deltaLeftSvgX}
                  y={epsTopSvgY}
                  width={deltaRightSvgX - deltaLeftSvgX}
                  height={epsBottomSvgY - epsTopSvgY}
                  fill={isValid ? 'rgba(16, 185, 129, 0.20)' : 'rgba(239, 68, 68, 0.25)'}
                  stroke={isValid ? '#10B981' : '#EF4444'}
                  strokeWidth="1.5"
                />

                {/* Axes */}
                <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x={svgWidth - padding + 5} y={svgHeight - padding + 4} fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono">x</text>
                <text x={padding - 5} y={padding - 8} fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end">y</text>

                {/* Center Target Point Guides */}
                <line x1={padding} y1={lSvgY} x2={svgWidth - padding} y2={lSvgY} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
                <line x1={aSvgX} y1={padding} x2={aSvgX} y2={svgHeight - padding} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />

                {/* Target Point Coordinates Labels */}
                <text x={aSvgX} y={svgHeight - padding + 15} fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="JetBrains Mono">a = 2.0</text>
                <text x={padding - 8} y={lSvgY + 3} fill="#FFFFFF" fontSize="10" textAnchor="end" fontWeight="bold" fontFamily="JetBrains Mono">L = 5.0</text>

                {/* Epsilon Boundary Labels on Y axis */}
                <text x={padding - 6} y={epsTopSvgY + 3} fill="#00C2FF" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">L + ε</text>
                <text x={padding - 6} y={epsBottomSvgY + 3} fill="#00C2FF" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">L - ε</text>

                {/* Delta Boundary Labels on X axis */}
                <text x={deltaLeftSvgX} y={svgHeight - padding + 15} fill="#FFB800" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">a - δ</text>
                <text x={deltaRightSvgX} y={svgHeight - padding + 15} fill="#FFB800" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">a + δ</text>

                {/* Linear Function Line f(x) = 2x + 1 */}
                <line
                  x1={lineStartSvgX}
                  y1={lineStartSvgY}
                  x2={lineEndSvgX}
                  y2={lineEndSvgY}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Highlighted segment inside the Delta interval */}
                <line
                  x1={deltaLeftSvgX}
                  y1={toSvgY(2 * (a - delta) + 1)}
                  x2={deltaRightSvgX}
                  y2={toSvgY(2 * (a + delta) + 1)}
                  stroke={isValid ? '#10B981' : '#EF4444'}
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Target Point (2, 5) */}
                <circle cx={aSvgX} cy={lSvgY} r="5" fill="#00C2FF" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Explanation Footer Box */}
          <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
            {isValid ? (
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Success:</strong> Every point in the gold <MathView math="\delta" />-strip lands squarely within the cyan <MathView math="\varepsilon" />-strip. Since <MathView math="\delta = \frac{\varepsilon}{2}" /> guarantees this for <em>any</em> <MathView math="\varepsilon > 0" />, the limit is proven!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-300">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  <strong>Tolerance Breached:</strong> <MathView math="\delta" /> is too wide! The extremities of the green line breach the horizontal cyan boundaries. Shrink <MathView math="\delta \le \frac{\varepsilon}{2}" /> to restore the guarantee.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
