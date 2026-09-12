// ─── Easing helpers ──────────────────────────────────────────────────────────
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInCubic  = (t: number): number => t * t * t;

/**
 * Smooth ease-in-out cubic: zero initial velocity jerk (f'(0) = 0)
 * and zero terminal velocity jerk (f'(1) = 0).
 */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));
