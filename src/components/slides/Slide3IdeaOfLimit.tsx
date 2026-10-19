import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide3IdeaOfLimit: React.FC = () => {
  // x slider value between 0.85 and 1.15
  const [xVal, setXVal] = useState<number>(0.92);

  // Exact function calculation
  const isExactlyOne = Math.abs(xVal - 1.0) < 0.0001;
  const fVal = isExactlyOne ? null : (Math.pow(xVal, 2) - 1) / (xVal - 1);
  const simplifiedVal = xVal + 1;

  const leftSamples = [
    { x: 0.9, f: 1.9 },
    { x: 0.99, f: 1.99 },
    { x: 0.999, f: 1.999 },
    { x: 0.9999, f: 1.9999 },
  ];

  const rightSamples = [
    { x: 1.1, f: 2.1 },
    { x: 1.01, f: 2.01 },
    { x: 1.001, f: 2.001 },
    { x: 1.0001, f: 2.0001 },
  ];

  // SVG coordinate transformation
  // Graph bounds: x in [0.5, 1.5], y in [1.5, 2.5]
  const svgWidth = 460;
  const svgHeight = 280;
  const padding = 45;

  const toSvgX = (x: number) => {
    return padding + ((x - 0.5) / (1.5 - 0.5)) * (svgWidth - 2 * padding);
  };
  const toSvgY = (y: number) => {
    return svgHeight - padding - ((y - 1.5) / (2.5 - 1.5)) * (svgHeight - 2 * padding);
  };

  const holeSvgX = toSvgX(1.0);
  const holeSvgY = toSvgY(2.0);

  const curSvgX = toSvgX(xVal);
  const curSvgY = toSvgY(simplifiedVal);

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Slide Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 1 · The Idea of a Limit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Approaching Without Touching: The Removable Hole
          </h2>
        </div>
        <div className="mt-2 md:mt-0 flex items-center gap-2 text-xs font-mono bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-300">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>f(x) = (x² - 1) / (x - 1)</span>
        </div>
      </div>

      {/* Main Grid: Left is Theory & Table, Right is Interactive Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Algebraic Insight & Numerical Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Algebraic Breakdown Card */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Apparent Paradox at x = 1
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If we naively plug in <MathView math="x = 1" /> into the original function:
            </p>
            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-center">
              <MathView math="f(1) = \frac{1^2 - 1}{1 - 1} = \frac{0}{0} \quad \text{\bf [Indeterminate Form]}" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              However, for every <MathView math="x \neq 1" />, we can factor the difference of squares:
            </p>
            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center">
              <MathView math="f(x) = \frac{(x-1)(x+1)}{x-1} = x + 1 \quad (x \neq 1)" />
            </div>
          </div>

          {/* Squeezing Table */}
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Left vs Right Approach Table
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Both squeeze to 2</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {/* Left Approach */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-cyan-500/20">
                <div className="text-[11px] font-bold text-cyan-400 mb-1.5 border-b border-white/5 pb-1">
                  x → 1⁻ (From Left)
                </div>
                <div className="space-y-1 text-slate-300">
                  {leftSamples.map((s, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-slate-400">{s.x}:</span>
                      <span className="text-cyan-300 font-bold">{s.f.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Approach */}
              <div className="bg-slate-900/70 p-2.5 rounded-lg border border-indigo-500/20">
                <div className="text-[11px] font-bold text-indigo-400 mb-1.5 border-b border-white/5 pb-1">
                  x → 1⁺ (From Right)
                </div>
                <div className="space-y-1 text-slate-300">
                  {rightSamples.map((s, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-slate-400">{s.x}:</span>
                      <span className="text-indigo-300 font-bold">{s.f.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 p-2 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-center text-xs text-emerald-300 font-semibold">
              <MathView math="\lim_{x \to 1^-} f(x) = \lim_{x \to 1^+} f(x) = 2 \implies \lim_{x \to 1} f(x) = 2" />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Graph & Live Probe (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interactive Removable Discontinuity Graph
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setXVal(1.0);
                }}
                className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold transition-all flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Jump to x = 1.0 (The Hole)
              </button>
            </div>

            {/* SVG Graph Canvas */}
            <div className="relative bg-slate-950/80 rounded-xl border border-white/10 p-2 overflow-hidden flex items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-h-[290px] select-none"
              >
                {/* Grid Lines */}
                <line x1={padding} y1={toSvgY(2.0)} x2={svgWidth - padding} y2={toSvgY(2.0)} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1={toSvgX(1.0)} y1={padding} x2={toSvgX(1.0)} y2={svgHeight - padding} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                {/* X & Y Axes */}
                <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x={svgWidth - padding + 5} y={svgHeight - padding + 4} fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono">x</text>
                <text x={padding - 5} y={padding - 8} fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end">y = f(x)</text>

                {/* Axis values */}
                <text x={toSvgX(0.7)} y={svgHeight - padding + 15} fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">0.7</text>
                <text x={toSvgX(1.0)} y={svgHeight - padding + 15} fill="#38BDF8" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="JetBrains Mono">1.0</text>
                <text x={toSvgX(1.3)} y={svgHeight - padding + 15} fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">1.3</text>

                <text x={padding - 8} y={toSvgY(1.7) + 3} fill="#64748B" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">1.7</text>
                <text x={padding - 8} y={toSvgY(2.0) + 3} fill="#38BDF8" fontSize="10" textAnchor="end" fontWeight="bold" fontFamily="JetBrains Mono">2.0</text>
                <text x={padding - 8} y={toSvgY(2.3) + 3} fill="#64748B" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">2.3</text>

                {/* The Linear Curve y = x + 1 */}
                <line
                  x1={toSvgX(0.55)}
                  y1={toSvgY(1.55)}
                  x2={toSvgX(1.45)}
                  y2={toSvgY(2.45)}
                  stroke="#00C2FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Current probe projection lines */}
                <line
                  x1={curSvgX}
                  y1={svgHeight - padding}
                  x2={curSvgX}
                  y2={curSvgY}
                  stroke="#FFB800"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <line
                  x1={padding}
                  y1={curSvgY}
                  x2={curSvgX}
                  y2={curSvgY}
                  stroke="#FFB800"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />

                {/* Approach direction arrows */}
                {xVal < 1.0 ? (
                  <path
                    d={`M ${toSvgX(0.85)} ${toSvgY(1.85) - 15} L ${toSvgX(0.95)} ${toSvgY(1.95) - 15}`}
                    stroke="#38BDF8"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                ) : xVal > 1.0 ? (
                  <path
                    d={`M ${toSvgX(1.15)} ${toSvgY(2.15) - 15} L ${toSvgX(1.05)} ${toSvgY(2.05) - 15}`}
                    stroke="#818CF8"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                ) : null}

                {/* The Removable Discontinuity Hollow Circle at (1, 2) */}
                <circle
                  cx={holeSvgX}
                  cy={holeSvgY}
                  r="6"
                  fill="#080B14"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                />
                <text
                  x={holeSvgX + 10}
                  y={holeSvgY - 8}
                  fill="#F87171"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                >
                  Hole (1, 2) [0/0]
                </text>

                {/* Active Interactive Probe Point */}
                {!isExactlyOne && (
                  <circle
                    cx={curSvgX}
                    cy={curSvgY}
                    r="6"
                    fill="#FFB800"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]"
                  />
                )}
              </svg>

              {/* Exact hole overlay alert if x=1 */}
              {isExactlyOne && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Point Undefined: f(1) = 0 / 0
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mt-1">
                    The function has no value at <span className="font-mono text-rose-400">x = 1</span>. Yet, as you step even <span className="font-mono text-cyan-300">0.0001</span> away to the left or right, the function lands smoothly near <span className="font-mono text-amber-300">2.0000</span>!
                  </p>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setXVal(0.999);
                    }}
                    className="mt-3 px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all"
                  >
                    Resume Nearness (x = 0.999)
                  </button>
                </div>
              )}
            </div>

            {/* Slider Controls */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Slide Probe x:</span>
                <span className="text-amber-300 font-bold px-2 py-0.5 rounded bg-slate-900 border border-white/10">
                  x = {xVal.toFixed(4)}
                </span>
                <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-slate-900 border border-white/10">
                  f(x) = {isExactlyOne ? 'UNDEFINED (0/0)' : fVal?.toFixed(4)}
                </span>
              </div>

              <input
                type="range"
                min="0.85"
                max="1.15"
                step="0.001"
                value={xVal}
                onChange={(e) => {
                  setXVal(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              {/* Quick preset buttons */}
              <div className="flex flex-wrap items-center justify-between gap-1 pt-1 text-[11px] font-mono">
                <span className="text-slate-500">Quick Presets:</span>
                <div className="flex items-center gap-1">
                  {[0.9, 0.99, 0.999, 1.001, 1.01, 1.1].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        sound.playClick();
                        setXVal(val);
                      }}
                      className={`px-2 py-0.5 rounded border transition-all ${
                        Math.abs(xVal - val) < 0.0001
                          ? 'bg-cyan-500/30 text-cyan-300 border-cyan-500/60'
                          : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Takeaway */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-white">Crucial Concept:</strong> Limits inspect the trend as <MathView math="x \to a" />. What happens <em>at</em> <MathView math="x = a" /> is completely irrelevant to the existence or value of the limit!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
