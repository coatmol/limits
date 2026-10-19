import React from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { MathView } from './MathView';
import { sound } from '../../utils/sound';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-2xl border border-amber-500/30 shadow-[0_20px_60px_rgba(255,184,0,0.15)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Limits Quick Reference & Cheat Sheet
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Formal definitions, algebraic laws, and analytical theorems
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Epsilon-Delta Definition Box */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              1. The Precise (ε–δ) Definition
            </h3>
            <MathView
              math="\lim_{x \to a} f(x) = L \iff \forall \varepsilon > 0, \; \exists \delta > 0 \; \text{such that} \; 0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon"
              block
              className="text-cyan-200"
            />
            <p className="text-xs text-slate-300 mt-2 text-center">
              "For any tolerance window on the output axis (y), there exists an input proximity window (x) that guarantees the output stays confined."
            </p>
          </div>

          {/* Limit Laws Grid */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              2. Fundamental Limit Laws (Assuming lim f(x) = L, lim g(x) = M)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Sum Law:</span>
                <MathView math="\lim [f(x) + g(x)] = L + M" block />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Difference Law:</span>
                <MathView math="\lim [f(x) - g(x)] = L - M" block />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Constant Multiple:</span>
                <MathView math="\lim [c \cdot f(x)] = c \cdot L" block />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Product Law:</span>
                <MathView math="\lim [f(x) \cdot g(x)] = L \cdot M" block />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Quotient Law:</span>
                <MathView math="\lim \frac{f(x)}{g(x)} = \frac{L}{M} \quad (M \neq 0)" block />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 font-semibold">Power & Root Laws:</span>
                <MathView math="\lim [f(x)]^n = L^n, \quad \lim \sqrt[n]{f(x)} = \sqrt[n]{L}" block />
              </div>
            </div>
          </div>

          {/* Squeeze Theorem & Indeterminate Forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                3. The Squeeze (Sandwich) Theorem
              </h4>
              <p className="text-xs text-slate-300 mb-2">
                If <MathView math="g(x) \le f(x) \le h(x)" /> near <MathView math="a" /> (except possibly at <MathView math="a" />), and:
              </p>
              <MathView math="\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L" block />
              <p className="text-xs text-slate-300 mt-2">
                Then <MathView math="\lim_{x \to a} f(x) = L" />.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                4. Seven Classic Indeterminate Forms
              </h4>
              <p className="text-xs text-slate-300 mb-2">
                Require algebraic factoring, conjugates, or L'Hôpital:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">0 / 0</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">∞ / ∞</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">0 · ∞</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">∞ - ∞</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">0⁰</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">1^∞</span>
                <span className="px-2 py-1 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">∞⁰</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
