import React, { useState } from 'react';
import { MathView } from '../ui/MathView';

export const Slide3IdeaOfLimit: React.FC = () => {
  const [xVal, setXVal] = useState<number>(0.95);

  const isExactlyOne = Math.abs(xVal - 1.0) < 0.001;
  const fVal = isExactlyOne ? null : (Math.pow(xVal, 2) - 1) / (xVal - 1);
  const lineY = xVal + 1;

  // SVG coordinate transformation
  // x in [0.5, 1.5], y in [1.5, 2.5]
  const svgWidth = 360;
  const svgHeight = 220;
  const pad = 36;

  const toSvgX = (x: number) => pad + ((x - 0.5) / (1.5 - 0.5)) * (svgWidth - 2 * pad);
  const toSvgY = (y: number) => svgHeight - pad - ((y - 1.5) / (2.5 - 1.5)) * (svgHeight - 2 * pad);

  const holeX = toSvgX(1.0);
  const holeY = toSvgY(2.0);
  const probeX = toSvgX(xVal);
  const probeY = toSvgY(lineY);

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Section 01 · Intuition
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          The Idea of a Limit
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Investigating behavior as we get arbitrarily close to a point, without evaluating at it.
        </p>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left Column: Algebraic Context & Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm leading-relaxed text-zinc-300 space-y-2">
            <div className="text-zinc-100 font-medium flex items-center justify-between">
              <span>Function Definition:</span>
              <MathView math="f(x) = \frac{x^2 - 1}{x - 1}" />
            </div>
            <p className="text-xs text-zinc-400">
              At <MathView math="x = 1" />, direct substitution gives <MathView math="f(1) = \frac{0}{0}" /> (undefined).
              However, for any <MathView math="x \neq 1" />, factoring yields:
            </p>
            <div className="py-1 text-center font-mono text-zinc-200 text-xs bg-zinc-950/60 rounded border border-zinc-800/80">
              <MathView math="f(x) = \frac{(x-1)(x+1)}{x-1} = x + 1 \quad (x \neq 1)" />
            </div>
          </div>

          {/* Numerical Table */}
          <div className="rounded-xl bg-zinc-900/40 border border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-zinc-800 text-xs font-mono">
              {/* Left Approach */}
              <div className="p-3">
                <div className="text-zinc-500 text-[11px] mb-2 uppercase font-medium">
                  Approaching from Left (x → 1⁻)
                </div>
                <div className="space-y-1 text-zinc-300">
                  <div className="flex justify-between"><span>0.900</span><span className="text-zinc-100">1.900</span></div>
                  <div className="flex justify-between"><span>0.990</span><span className="text-zinc-100">1.990</span></div>
                  <div className="flex justify-between"><span>0.999</span><span className="text-blue-400 font-semibold">1.999</span></div>
                </div>
              </div>

              {/* Right Approach */}
              <div className="p-3">
                <div className="text-zinc-500 text-[11px] mb-2 uppercase font-medium">
                  Approaching from Right (x → 1⁺)
                </div>
                <div className="space-y-1 text-zinc-300">
                  <div className="flex justify-between"><span>1.100</span><span className="text-zinc-100">2.100</span></div>
                  <div className="flex justify-between"><span>1.010</span><span className="text-zinc-100">2.010</span></div>
                  <div className="flex justify-between"><span>1.001</span><span className="text-blue-400 font-semibold">2.001</span></div>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 bg-zinc-950/80 border-t border-zinc-800 text-center text-xs text-zinc-300 font-mono">
              <MathView math="\lim_{x \to 1^-} f(x) = \lim_{x \to 1^+} f(x) = 2 \implies \lim_{x \to 1} f(x) = 2" />
            </div>
          </div>
        </div>

        {/* Right Column: Clean SVG Graph & Single Slider (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Graph of y = x + 1 (x ≠ 1)</span>
            <span className="text-zinc-500">Hole at (1, 2)</span>
          </div>

          {/* SVG Canvas */}
          <div className="bg-zinc-950 rounded-lg border border-zinc-800/80 flex items-center justify-center p-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full select-none">
              {/* Axes */}
              <line x1={pad} y1={svgHeight - pad} x2={svgWidth - pad} y2={svgHeight - pad} stroke="#27272a" strokeWidth="1" />
              <line x1={pad} y1={pad} x2={pad} y2={svgHeight - pad} stroke="#27272a" strokeWidth="1" />

              {/* Axis labels */}
              <text x={svgWidth - pad + 5} y={svgHeight - pad + 4} fill="#71717a" fontSize="10" fontFamily="JetBrains Mono">x</text>
              <text x={pad - 5} y={pad - 4} fill="#71717a" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">y</text>

              {/* Coordinate references */}
              <text x={toSvgX(1.0)} y={svgHeight - pad + 14} fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">1.0</text>
              <text x={pad - 6} y={toSvgY(2.0) + 3} fill="#a1a1aa" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">2.0</text>

              {/* Linear Curve y = x + 1 */}
              <line
                x1={toSvgX(0.55)}
                y1={toSvgY(1.55)}
                x2={toSvgX(1.45)}
                y2={toSvgY(2.45)}
                stroke="#d4d4d8"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Projection dashed lines for probe */}
              <line x1={probeX} y1={svgHeight - pad} x2={probeX} y2={probeY} stroke="#3b82f6" strokeDasharray="3 3" strokeWidth="1" />
              <line x1={pad} y1={probeY} x2={probeX} y2={probeY} stroke="#3b82f6" strokeDasharray="3 3" strokeWidth="1" />

              {/* The Hole at (1, 2) */}
              <circle cx={holeX} cy={holeY} r="5" fill="#09090b" stroke="#ef4444" strokeWidth="2" />

              {/* Current probe point */}
              {!isExactlyOne && (
                <circle cx={probeX} cy={probeY} r="4.5" fill="#3b82f6" />
              )}
            </svg>
          </div>

          {/* Interactive Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Scrub x:</span>
              <span className="text-zinc-200">x = {xVal.toFixed(3)}</span>
              <span className={isExactlyOne ? 'text-red-400 font-semibold' : 'text-blue-400 font-semibold'}>
                f(x) = {isExactlyOne ? '0/0 (Hole)' : fVal?.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.005"
              value={xVal}
              onChange={(e) => setXVal(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Subtle Footer */}
      <div className="text-xs text-zinc-500">
        Key Takeaway: The limit describes the trend near <span className="font-mono text-zinc-300">x = 1</span>, regardless of whether <span className="font-mono text-zinc-300">f(1)</span> is defined.
      </div>
    </div>
  );
};
