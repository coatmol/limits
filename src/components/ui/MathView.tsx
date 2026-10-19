import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.error('KaTeX error:', err);
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`my-2 overflow-x-auto text-center py-1 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-block mx-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
