import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized percentage
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingMathSymbols = [
    { text: 'lim', x: '10%', y: '18%', size: 'text-2xl', delay: 0 },
    { text: 'ε', x: '85%', y: '25%', size: 'text-3xl', delay: 1.2 },
    { text: 'δ', x: '15%', y: '75%', size: 'text-3xl', delay: 0.8 },
    { text: 'x → a', x: '80%', y: '70%', size: 'text-xl', delay: 2.1 },
    { text: '∞', x: '45%', y: '10%', size: 'text-2xl', delay: 1.5 },
    { text: '0/0', x: '92%', y: '48%', size: 'text-lg', delay: 2.7 },
    { text: '|x - a| < δ', x: '5%', y: '45%', size: 'text-base', delay: 3.2 },
    { text: 'L', x: '52%', y: '88%', size: 'text-2xl', delay: 1.9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Cursor Light Aura */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-all duration-700 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, rgba(0, 194, 255, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Primary Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[160px]" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Floating mathematical glyphs */}
      {floatingMathSymbols.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute select-none font-mono font-bold text-cyan-400/10 ${item.size}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: ['-8px', '12px', '-8px'],
            opacity: [0.08, 0.18, 0.08],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 6 + (idx % 4),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};
