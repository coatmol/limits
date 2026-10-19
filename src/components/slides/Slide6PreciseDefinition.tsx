import React, { useState } from 'react';
import { MathView } from '../ui/MathView';

export const Slide6PreciseDefinition: React.FC = () => {
  // Test function: f(x) = 2x + 1, a = 2, L = 5
  // Requires delta <= epsilon / 2
  const a = 2.0;
  const L = 5.0;

  const [epsilon, setEpsilon] = useState<number>(0.8);
  const [delta, setDelta] = useState<number>(0.35);

  const maxDelta = epsilon / 2.0;
  const isSatisfied = delta <= maxDelta + 0.001;

  // SVG coordinate transformation
  // x in [0.8, 3.2], y in [2.5, 7.5]
  const svgWidth = 360;
  const svgHeight = 240;
  const pad = 38;

  const toSvgX = (x: number) => pad + ((x - 0.8) / (3.2 - 0.8)) * (svgWidth - 2 * pad);
  const toSvgY = (y: number) => svgHeight - pad - ((y - 2.5) / (7.5 - 2.5)) * (svgHeight - 2 * pad);

  const aSvgX = toSvgX(a);
  const lSvgY = toSvgY(L);

  const epsTop = toSvgY(L + epsilon);
  const epsBot = toSvgY(L - epsilon);
  const deltaLeft = toSvgX(a - delta);
  const deltaRight = toSvgX(a + delta);

  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-14">
      {/* Header */}
      <div>
        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          Section 04 · Formal Definition
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          The Precise (ε–δ) Definition
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Transforming "infinitesimal approach" into a verifiable challenge-and-response inequality.
        </p>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left Column: Formal Definition & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase font-medium">
              Formal Statement
            </div>
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800 text-center">
              <MathView
                math="\lim_{x \to a} f(x) = L \iff \forall \varepsilon > 0, \; \exists \delta > 0 \; \text{s.t.} \; 0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon"
                block
                className="text-sm md:text-base font-medium text-zinc-100"
              />
            </div>
            <div className="text-xs text-zinc-400 space-y-1 leading-relaxed">
              <p>• <span className="text-zinc-200 font-mono">∀ ε &gt; 0</span>: For every target tolerance on the vertical y-axis,</p>
              <p>• <span className="text-zinc-200 font-mono">∃ δ &gt; 0</span>: There exists an input distance on the horizontal x-axis,</p>
              <p>• Such that any input within <span className="text-zinc-200 font-mono">(a − δ, a + δ)</span> produces an output trapped strictly inside <span className="text-zinc-200 font-mono">(L − ε, L + ε)</span>.</p>
            </div>
          </div>

          {/* Dual Sliders */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Output Tolerance (ε):</span>
                <span className="text-zinc-200 font-medium">ε = {epsilon.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.5"
                step="0.05"
                value={epsilon}
                onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                className="w-full accent-zinc-300 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Input Window (δ):</span>
                <span className="text-zinc-200 font-medium">δ = {delta.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.02"
                value={delta}
                onChange={(e) => setDelta(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-xs font-mono border-t border-zinc-800/80">
              <span className="text-zinc-500">For f(x)=2x+1: Valid when δ ≤ ε/2 (={maxDelta.toFixed(2)})</span>
              <span className={isSatisfied ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                {isSatisfied ? 'Condition Satisfied' : 'Tolerance Breached'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Coordinate Graph (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Graph: f(x) = 2x + 1</span>
            <span>Target: (2, 5)</span>
          </div>

          <div className="bg-zinc-950 rounded-lg border border-zinc-800/80 flex items-center justify-center p-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full select-none">
              {/* Epsilon Horizontal Corridor */}
              <rect
                x={pad}
                y={epsTop}
                width={svgWidth - 2 * pad}
                height={epsBot - epsTop}
                fill="rgba(59, 130, 246, 0.08)"
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Delta Vertical Corridor */}
              <rect
                x={deltaLeft}
                y={pad}
                width={deltaRight - deltaLeft}
                height={svgHeight - 2 * pad}
                fill="rgba(255, 255, 255, 0.04)"
                stroke="#71717a"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Overlap Box */}
              <rect
                x={deltaLeft}
                y={epsTop}
                width={deltaRight - deltaLeft}
                height={epsBot - epsTop}
                fill={isSatisfied ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.15)'}
                stroke={isSatisfied ? '#10b981' : '#ef4444'}
                strokeWidth="1"
              />

              {/* Axes */}
              <line x1={pad} y1={svgHeight - pad} x2={svgWidth - pad} y2={svgHeight - pad} stroke="#27272a" strokeWidth="1" />
              <line x1={pad} y1={pad} x2={pad} y2={svgHeight - pad} stroke="#27272a" strokeWidth="1" />

              {/* Target Guides */}
              <line x1={pad} y1={lSvgY} x2={svgWidth - pad} y2={lSvgY} stroke="#3f3f46" strokeDasharray="2 2" strokeWidth="1" />
              <line x1={aSvgX} y1={pad} x2={aSvgX} y2={svgHeight - pad} stroke="#3f3f46" strokeDasharray="2 2" strokeWidth="1" />

              {/* Axis labels */}
              <text x={aSvgX} y={svgHeight - pad + 14} fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">a=2</text>
              <text x={pad - 6} y={lSvgY + 3} fill="#a1a1aa" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">L=5</text>

              {/* Function Line f(x) = 2x + 1 */}
              <line
                x1={toSvgX(1.0)}
                y1={toSvgY(3.0)}
                x2={toSvgX(3.0)}
                y2={toSvgY(7.0)}
                stroke="#e4e4e7"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Target Point (2, 5) */}
              <circle cx={aSvgX} cy={lSvgY} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 text-center">
            {isSatisfied
              ? 'All points in the input δ-strip map inside the target ε-strip.'
              : 'Points escape the ε-strip horizontally. Reduce δ.'}
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
