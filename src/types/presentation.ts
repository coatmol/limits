export interface SlideInfo {
  id: number;
  title: string;
  subtitle: string;
  section: string;
  category: 'intro' | 'intuition' | 'applications' | 'theorems' | 'definition' | 'proofs' | 'examples' | 'conclusion';
  notes: string[];
}

export const SLIDES_DATA: SlideInfo[] = [
  {
    id: 1,
    title: 'Limits: From Intuition to Proof',
    subtitle: 'Calculus · Foundations of Analysis',
    section: 'Title & Overview',
    category: 'intro',
    notes: [
      'Welcome everyone! Presenting today: Limits from Intuition to Proof.',
      'Prepared by Omar Elgohary for Dr. Mahmoud Mohamed and Eng. Youssef Hamed at Egypt University of Informatics.',
      'Core thesis: Limits bridge the gap between finite arithmetic and the continuous world.'
    ]
  },
  {
    id: 2,
    title: 'The Roadmap: 5 Pillars of Limits',
    subtitle: 'From geometric intuition to mathematical rigor',
    section: 'Curriculum Roadmap',
    category: 'intro',
    notes: [
      'We journey through 5 progressive stages: Intuition, Applications, Limit Laws, ε-δ Definition, and Formal Proofs.',
      'Notice how we transition from numerical curiosity to absolute mathematical certainty.'
    ]
  },
  {
    id: 3,
    title: 'The Idea of a Limit',
    subtitle: 'Approaching values without touching: The removable hole at (1, 2)',
    section: 'Section 1: Intuition',
    category: 'intuition',
    notes: [
      'Key insight: f(x) = (x² - 1)/(x - 1). At x = 1, it yields 0/0 (indeterminate).',
      'Yet for any x ≠ 1, it factors into (x-1)(x+1)/(x-1) = x + 1.',
      'Limits describe local behavior near x = a, not what happens at x = a.'
    ]
  },
  {
    id: 4,
    title: 'Real-World & CS Applications',
    subtitle: 'From physics trajectories to AI optimization & Big-O complexity',
    section: 'Section 2: Applications',
    category: 'applications',
    notes: [
      'Limits are the backbone of modern computer science and engineering.',
      'Highlight asymptotic complexity (Big-O ratio limits), Gradient Descent continuous flows, and graphics ray-marching.'
    ]
  },
  {
    id: 5,
    title: 'Fundamental Limit Theorems',
    subtitle: 'The algebraic toolkit and the Squeeze Theorem',
    section: 'Section 3: Limit Theorems',
    category: 'theorems',
    notes: [
      'Theorems allow us to dismantle complicated rational expressions into basic limits.',
      'Emphasize the Squeeze Theorem: trapping stubborn oscillating functions between known bounds.'
    ]
  },
  {
    id: 6,
    title: 'Precise (ε–δ) Definition of a Limit',
    subtitle: 'Cauchy & Weierstrass formulation: The challenge-and-response guarantee',
    section: 'Section 4: Formal Definition',
    category: 'definition',
    notes: [
      'Intuition is not enough: we need a strict metric definition.',
      'Explain the interactive game: You choose arbitrary tolerance ε > 0, we provide δ > 0 so f(x) is trapped in (L-ε, L+ε).'
    ]
  },
  {
    id: 7,
    title: 'Rigorous Proof: Sum Law',
    subtitle: 'lim [f(x) + g(x)] = L + M via the ε/2 budget strategy',
    section: 'Section 5: Proofs (Part 1)',
    category: 'proofs',
    notes: [
      'Walk through the triangle inequality: |(f-L) + (g-M)| ≤ |f-L| + |g-M|.',
      'Explain why we divide tolerance by 2: ε/2 + ε/2 = ε.'
    ]
  },
  {
    id: 8,
    title: 'Rigorous Proof: Product Law',
    subtitle: 'lim [f(x) · g(x)] = L · M and bounding the auxiliary term',
    section: 'Section 5: Proofs (Part 2)',
    category: 'proofs',
    notes: [
      'The classic trick: Add and subtract L·g(x).',
      'Notice we must bound |g(x)| by |M| + 1 first, yielding master δ = min(δ0, δ1, δ2).'
    ]
  },
  {
    id: 9,
    title: 'Worked Example Walkthrough',
    subtitle: 'Evaluating lim (3x + 1) as x → 2 = 7 with dual verification',
    section: 'Section 6: Worked Example',
    category: 'examples',
    notes: [
      'Method 1: Direct algebraic law evaluation: 3(2) + 1 = 7.',
      'Method 2: Rigorous ε-δ derivation: |3x - 6| = 3|x - 2| < ε ⇒ δ = ε/3.'
    ]
  },
  {
    id: 10,
    title: 'Conclusion & Academic Acknowledgments',
    subtitle: 'Mastery achieved · Prepared for Dr. Mahmoud & Eng. Youssef (EUI)',
    section: 'Conclusion & Outro',
    category: 'conclusion',
    notes: [
      'Recap the intellectual journey from 0/0 to formal epsilon-delta mastery.',
      'Special thanks to Egypt University of Informatics mentors Dr. Mahmoud Mohamed and Eng. Youssef Hamed.'
    ]
  }
];
