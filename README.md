# Limits: From Intuition to Proof
### An Interactive Calculus Presentation App for Egypt University of Informatics (EUI)

**Presenter:** Omar Elgohary  
**Prepared For:** Dr. Mahmoud Mohamed & Eng. Youssef Hamed  
**Institution:** Egypt University of Informatics (EUI) — Department of Basic Sciences  

---

## 🚀 Overview

A production-grade, fully animated, interactive web-based presentation app designed for teaching and mastering the mathematical foundations of limits in Calculus I.

Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **KaTeX**, and **Lucide React**.

---

## ✨ Features & Interactive Modules

- **Slide 1: Hero Cover** — Bold typography, dynamic cursor light tracking, ambient radial glows, and academic EUI emblem.
- **Slide 2: Interactive Roadmap** — 5 milestone chapter cards with staggered entry animations and direct jump navigation.
- **Slide 3: Section 1 (The Idea of a Limit)** — Interactive real-time slider for $f(x) = \frac{x^2 - 1}{x - 1}$ with dynamic table of left/right values and rendered SVG coordinate graph featuring a glowing removable singularity (hole) at $(1, 2)$.
- **Slide 4: Section 2 (Real-World & CS Applications)** — Split interactive tabs exploring Calculus & Engineering vs. Computer Science (Big-O asymptotic growth rates, Continuous Gradient Descent flows, Ray Marching, and Numerical Step-Size errors) with a live Big-O complexity probe.
- **Slide 5: Section 3 (Limit Theorems Grid)** — Grid of 6 algebraic limit laws and an interactive sandbox visualizer for the **Squeeze (Sandwich) Theorem** trapping $x^2 \sin(1/x)$.
- **Slide 6: Section 4 (Precise $\varepsilon$–$\delta$ Definition)** — Dual slider laboratory for Epsilon tolerance and Delta windows with real-time SVG coordinate graph, shaded corridors, boundary breach detection, and auto-solve solver.
- **Slide 7: Section 5 (Rigorous Proof: Sum Law)** — 5-step interactive wizard deriving $\lim [f(x) + g(x)] = L + M$ using the Triangle Inequality and $\varepsilon/2$ budget allocation.
- **Slide 8: Section 5 (Rigorous Proof: Product Law)** — 5-step interactive wizard demonstrating the strategic $L \cdot g(x)$ algebraic trick, bounding $|g(x)| < |M| + 1$, and geometric rectangle area intuition.
- **Slide 9: Worked Example Walkthrough** — Problem $\lim_{x \to 2} (3x + 1) = 7$ evaluated via both Limit Laws and $\varepsilon$–$\delta$ verification with a live $\delta = \varepsilon / 3$ calculator.
- **Slide 10: Conclusion & Outro** — 5 Pillars recap, EUI academic tribute card, confetti celebration, and instant formula reference cheat sheet.

---

## 🎮 Presentation Controls & Navigation

| Key / Action | Function |
|---|---|
| `→` / `Space` / `PageDown` | Advance to Next Slide |
| `←` / `PageUp` | Return to Previous Slide |
| `Home` / `End` | Jump to Slide 1 / Slide 10 |
| `O` | Open Slide Sorter Overview Grid |
| `F` | Toggle Fullscreen Mode |
| `P` | Open Presenter Teleprompter / Speaker Notes |
| `M` | Toggle Procedural Sound Effects (Mute) |
| `C` | Open Formula Cheat Sheet Reference |
| `?` | Show Keyboard Shortcuts Modal |
| `1` - `9`, `0` | Direct Jump to Slide #1 through #10 |
| **Touch Swipe** | Swipe left/right on mobile and touchscreen tablets |

---

## 🛠️ Development & Deployment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
