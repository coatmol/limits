import React, { useState } from 'react';
import { Cpu, Activity, TrendingUp, Layers, Compass, Zap, Terminal, Sparkles } from 'lucide-react';
import { MathView } from '../ui/MathView';
import { sound } from '../../utils/sound';

export const Slide4Applications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cs' | 'calculus'>('cs');
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  // Big-O interactive simulator state
  const [inputN, setInputN] = useState<number>(100);

  const csTopics = [
    {
      title: 'Big-O & Asymptotic Growth Rates',
      badge: 'Theoretical CS & Algorithms',
      icon: Terminal,
      formula: '\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = c \\implies f(n) = \\Theta(g(n))',
      summary: 'To prove an algorithm is strictly faster than another, computer scientists compute the limit of their operation ratios as dataset size n approaches infinity. If the limit is 0, f(n) dominates g(n).',
      details: [
        'Distinguishes polynomial O(n²) from exponential O(2ⁿ) scaling.',
        'Eliminates hardware-dependent constants to isolate algorithmic efficiency.',
        'Used in Master Theorem derivations and divide-and-conquer recurrences.'
      ]
    },
    {
      title: 'Gradient Descent & Continuous Optimization',
      badge: 'Machine Learning & Deep Learning',
      icon: Cpu,
      formula: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla L(\\theta) \\xrightarrow{\\alpha \\to 0} \\frac{d\\theta}{dt} = -\\nabla L(\\theta)',
      summary: 'In training neural networks, gradient descent takes discrete steps of size α. The continuous limit as the learning rate step α approaches 0 turns optimization into a continuous gradient flow ODE.',
      details: [
        'Enables Neural ODE architectures and continuous backpropagation.',
        'Predicts learning rate stability bounds before catastrophic divergence occurs.',
        'Underpins modern Adam and RMSprop convergence proofs.'
      ]
    },
    {
      title: 'Numerical Step-Size & Truncation Errors',
      badge: 'Scientific Computing & Simulation',
      icon: Layers,
      formula: '\\lim_{h \\to 0} \\frac{E_{\\text{trunc}}(h)}{h^p} = C \\quad \\text{vs.} \\quad E_{\\text{roundoff}} \\propto \\frac{\\epsilon_{\\text{mach}}}{h}',
      summary: 'Numerical solvers (Euler, Runge-Kutta) approximate differential equations by discretizing time step h. In theory, limit h → 0 yields exact solutions; in floating-point hardware, roundoff error blows up.',
      details: [
        'Calculus limits identify the theoretical order of convergence (p = 1, 2, 4).',
        'Helps numerical engineers find the optimal "Goldilocks" step size h*.',
        'Vital for aerospace flight simulations and climate models.'
      ]
    },
    {
      title: 'Computer Graphics & Ray Marching',
      badge: 'Game Engines & VFX Rendering',
      icon: Zap,
      formula: '\\lim_{k \\to \\infty} \\mathbf{p}_{k+1} = \\mathbf{p}_k + d(\\mathbf{p}_k) \\mathbf{v} = \\text{Surface Intersection}',
      summary: 'Signed Distance Fields (SDFs) and ray marching calculate the distance d(p) to the nearest scene geometry. The ray position converges in the limit to the exact boundary intersection.',
      details: [
        'Anti-aliasing integrates infinite subpixel photon samples via Monte Carlo limits.',
        'Used in Unreal Engine 5 Nanite / Lumen real-time global illumination.',
        'Solves surface normals through infinitesimal central differences.'
      ]
    }
  ];

  const calculusTopics = [
    {
      title: 'Instantaneous Velocity & Derivatives',
      badge: 'Classical Physics & Kinematics',
      icon: Activity,
      formula: 'v(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t + \\Delta t) - s(t)}{\\Delta t} = \\frac{ds}{dt}',
      summary: 'Resolves Zeno\'s Paradox of the Arrow. At a single instant Δt = 0, distance traversed is 0 and time elapsed is 0 (0/0). The limit reveals the exact instantaneous speed.',
      details: [
        'Foundation for Isaac Newton\'s laws of motion (F = m · dv/dt).',
        'Directly powers automobile speedometer telemetry and aerospace flight computers.',
        'Bridges discrete average measurements with continuous instantaneous reality.'
      ]
    },
    {
      title: 'Definite Integrals & Riemann Sums',
      badge: 'Geometry & Continuous Accumulation',
      icon: TrendingUp,
      formula: '\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x',
      summary: 'To find the exact curved area under irregular shapes, we chop the region into n rectangles and take the limit as n approaches infinity while rectangle width Δx squeezes to 0.',
      details: [
        'Computes center of mass, fluid pressure, and work done by variable forces.',
        'The Fundamental Theorem of Calculus links this limit directly back to derivatives.',
        'Essential for signal energy analysis in Fourier Transforms.'
      ]
    },
    {
      title: 'Marginal Cost & Profit in Economics',
      badge: 'Quantitative Finance & Microeconomics',
      icon: Compass,
      formula: 'MC(q) = \\lim_{\\Delta q \\to 0} \\frac{C(q + \\Delta q) - C(q)}{\\Delta q} = C\'(q)',
      summary: 'Quantifies the exact incremental expense incurred to produce one single additional unit when producing continuous commodity output at scale.',
      details: [
        'Used by algorithmic trading desks and supply chain optimizers.',
        'Maximizes company profit by solving the limit balance MC(q) = MR(q).',
        'Critical for option pricing models (Black-Scholes partial differential equations).'
      ]
    },
    {
      title: 'Control Theory & Asymptotic Stability',
      badge: 'Robotics & Electrical Systems',
      icon: Sparkles,
      formula: '\\lim_{t \\to \\infty} |y(t) - y_{\\text{target}}| = 0 \\iff \\text{Asymptotically Stable}',
      summary: 'Autonomous drones, quadcopters, and industrial robotics use PID feedback control loops engineered so tracking error limits to zero as time t advances to infinity.',
      details: [
        'Routh-Hurwitz and Nyquist criteria use pole limit positions on the complex plane.',
        'Prevents self-exciting mechanical resonance and chaotic flutter in aircraft wings.',
        'Ensures power grid voltage stability during sudden demand spikes.'
      ]
    }
  ];

  const currentTopics = activeTab === 'cs' ? csTopics : calculusTopics;
  const activeTopic = currentTopics[selectedTopic] || currentTopics[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 border-b border-white/10 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Section 2 · Real-World & CS Applications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Limits Powering Modern Computing & Engineering
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="mt-3 md:mt-0 flex items-center p-1 rounded-xl bg-slate-900 border border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('cs');
              setSelectedTopic(0);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'cs'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,194,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Computer Science & AI</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('calculus');
              setSelectedTopic(0);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'calculus'
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(255,184,0,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Calculus & Engineering</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left is Topic Selector Cards, Right is Detail Display + Live Mini Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: 4 Topic Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {currentTopics.map((topic, idx) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setSelectedTopic(idx);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? activeTab === 'cs'
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(0,194,255,0.2)]'
                      : 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_20px_rgba(255,184,0,0.2)]'
                    : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40 hover:border-white/10'
                }`}
              >
                <div
                  className={`p-2 rounded-lg border shrink-0 ${
                    isSelected
                      ? activeTab === 'cs'
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {topic.badge}
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {topic.title}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Interactive Big-O live tester widget when CS tab is active */}
          {activeTab === 'cs' && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-cyan-400 font-bold">Interactive Limit Probe (n → ∞)</span>
                <span className="text-amber-300">n = {inputN}</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="50"
                value={inputN}
                onChange={(e) => setInputN(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg mb-2"
              />
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
                <div className="p-1.5 rounded bg-slate-950 border border-white/5">
                  <span className="text-slate-400 block">O(log n)</span>
                  <span className="text-emerald-400 font-bold">{Math.log2(inputN).toFixed(1)} ops</span>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-white/5">
                  <span className="text-slate-400 block">O(n log n)</span>
                  <span className="text-cyan-400 font-bold">{(inputN * Math.log2(inputN)).toFixed(0)}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-white/5">
                  <span className="text-slate-400 block">O(n²)</span>
                  <span className="text-rose-400 font-bold">{(inputN * inputN).toLocaleString()}</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 text-center mt-2">
                <MathView math="\lim_{n \to \infty} \frac{\log n}{n^2} = 0 \implies \mathcal{O}(\log n) \text{ infinitely outscales } \mathcal{O}(n^2)" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Deep Dive Display Card (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                {activeTopic.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Pillar {selectedTopic + 1} of 4
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">
              {activeTopic.title}
            </h3>

            {/* Prominent LaTeX Formula Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 my-3 text-center shadow-inner">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
                Mathematical Limit Formulation
              </div>
              <MathView math={activeTopic.formula} block className="text-lg md:text-xl text-white font-bold" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {activeTopic.summary}
            </p>

            {/* Bullet Points */}
            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                Key Technical Implications:
              </div>
              {activeTopic.details.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Footer Tag */}
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Course: Calculus I · Foundations</span>
            <span className="text-cyan-400">Omar Elgohary (EUI)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
