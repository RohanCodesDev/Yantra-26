// ─── Timeline (seconds) ─────────────────────────────────────────────────────
// Phase 1 — Convergence : 0 → T_FORM
//   Particles begin travelling immediately on load (no drift wait).
// Phase 2 — SVG crossfade : T_SVG_START → T_FORM
//   SVG only starts appearing when particles are ~85% gathered,
//   so the wordmark is clearly formed before the crisp SVG materialises.
export const T_DRIFT      = 0;     // no dormant wait — move on load immediately
export const T_FORM       = 6.0;   // total time for particles to fully converge
export const T_SVG_START  = 5.1;   // SVG fades in only in the last ~0.9 s (85% done)
export const T_TOTAL      = T_FORM;

// ─── Particle count ──────────────────────────────────────────────────────────
export const COUNT_DESKTOP = 3000;
export const COUNT_MOBILE  = 1100;
