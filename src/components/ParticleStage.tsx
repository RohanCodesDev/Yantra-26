import React, { useEffect, useRef } from "react";
import { Particle } from "@/types/particle";
import {
  T_FORM,
  T_SVG_START,
  T_TOTAL,
  COUNT_DESKTOP,
  COUNT_MOBILE,
} from "@/constants/animation";
import { easeInCubic, easeInOutCubic, clamp } from "@/utils/math";
import { sampleSVGPoints } from "@/utils/svgSampler";
import { AtmosphericBackground } from "./AtmosphericBackground";
import { SVGOverlay } from "./SVGOverlay";

// Pre-computed fade window normalised to [0, 1]
const CONV_START = T_SVG_START / T_TOTAL;

export const ParticleStage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef    = useRef<HTMLImageElement>(null);

  // Everything mutable lives in one ref — never touched by React render
  const eng = useRef({
    particles: [] as Particle[],
    ready:     false,
    elapsed:   0,
    lastTs:    0,
    rafId:     0,
    mounted:   false,   // lifecycle guard stored in the ref, not a closure
  });

  useEffect(() => {
    const e = eng.current;
    e.mounted = true;

    // ── Canvas initialisation ──────────────────────────────────────────────
    const cv = canvasRef.current!;
    cv.width  = window.innerWidth;
    cv.height = window.innerHeight;

    // ── Build particle array ───────────────────────────────────────────────
    const buildParticles = async () => {
      const W = (cv.width  = window.innerWidth);
      const H = (cv.height = window.innerHeight);
      const mobile = W < 768;
      const count  = mobile ? COUNT_MOBILE : COUNT_DESKTOP;

      const targets = await sampleSVGPoints("/YANTRA.svg", count, W, H);
      if (!e.mounted) return;

      const ps: Particle[] = targets.map((t) => {
        // Spawn from a wide ring around the full viewport
        const angle  = Math.random() * Math.PI * 2;
        // Radius goes from 0.45× to 0.85× of the larger dimension
        // so particles travel across nearly the full screen
        const minR   = Math.max(W, H) * 0.45;
        const maxR   = Math.max(W, H) * 0.85;
        const radius = minR + Math.random() * (maxR - minR);

        const roll = Math.random();
        let r = 200, g = 16, b = 46;
        if      (roll > 0.84) { r = 226; g = 27;  b = 45; }
        else if (roll > 0.95) { r = 255; g = 77;  b = 94; }
        else if (roll < 0.18) { r = 138; g = 10;  b = 29; }

        const ix = W / 2 + Math.cos(angle) * radius;
        const iy = H / 2 + Math.sin(angle) * radius;

        return {
          x: ix, y: iy,
          ix, iy,
          tx: t.x, ty: t.y,
          delay:  Math.random() * 0.38,
          arcX:   (Math.random() - 0.5) * (mobile ? 55 : 140),
          arcY:   (Math.random() - 0.5) * (mobile ? 55 : 140),
          size:   mobile ? 0.9 + Math.random() * 1.2 : 1.2 + Math.random() * 1.6,
          alpha:  0.28 + Math.random() * 0.62,
          r, g, b,
          jPhase: Math.random() * Math.PI * 2,
          jSpeed: 0.9 + Math.random() * 2.2,
          vx: 0, vy: 0,
        };
      });

      if (!e.mounted) return;

      // Reset clock precisely when particles are ready
      e.particles = ps;
      e.elapsed   = 0;
      e.lastTs    = performance.now();
      e.ready     = true;
    };

    // ── Render loop ────────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (!e.mounted) return;   // stops the loop if unmounted

      const svg = svgRef.current;

      if (!e.ready) {
        // Keep lastTs fresh so the first frame after ready has dt ≈ 16ms
        e.lastTs = ts;
        e.rafId  = requestAnimationFrame(tick);
        return;
      }

      // Clamp dt to two frames max to absorb tab-switch spikes
      const dt = Math.min((ts - e.lastTs) / 1000, 0.032);
      e.lastTs  = ts;
      e.elapsed += dt;

      const W   = cv.width;
      const H   = cv.height;
      const ctx = cv.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);

      const masterP = clamp(e.elapsed / T_TOTAL, 0, 1);

      // ── Particle visibility (fade out as SVG fades in) ──────────────────
      let pVis = 1.0;
      if (masterP >= 1.0) {
        pVis = 0;
      } else if (masterP > CONV_START) {
        pVis = 1 - easeInOutCubic((masterP - CONV_START) / (1.0 - CONV_START));
      }

      // ── SVG opacity (inverse of pVis window) ───────────────────────────
      let svgOp = 0;
      if (masterP >= 1.0) {
        svgOp = 1;
      } else if (masterP > CONV_START) {
        svgOp = easeInOutCubic((masterP - CONV_START) / (1.0 - CONV_START));
      }
      if (svg) svg.style.opacity = svgOp.toFixed(4);

      // ── Draw particles ──────────────────────────────────────────────────
      if (pVis > 0.002) {
        // convP: 0→1 over the full convergence window
        const convP = clamp(e.elapsed / T_FORM, 0, 1);

        for (const pt of e.particles) {
          // Per-particle staggered local progress
          const local  = clamp((convP - pt.delay * 0.4) / (1 - pt.delay * 0.4), 0, 1);

          // easeInOutCubic: zero initial and terminal velocity — no kick/snap
          const easedT = easeInOutCubic(local);

          // sin² arc: smooth start and end, peaks in the middle
          const sinArc = Math.sin(local * Math.PI);
          const arc    = sinArc * sinArc;

          const baseX = pt.ix + (pt.tx - pt.ix) * easedT + pt.arcX * arc;
          const baseY = pt.iy + (pt.ty - pt.iy) * easedT + pt.arcY * arc;

          // Organic micro-jitter, quadratically dampened to zero as formation completes
          const jAmt = 2.0 * Math.pow(1 - convP, 2);
          pt.x = baseX + Math.sin(e.elapsed * pt.jSpeed + pt.jPhase) * jAmt;
          pt.y = baseY + Math.cos(e.elapsed * pt.jSpeed * 1.1 + pt.jPhase) * jAmt;

          const a = pt.alpha * (0.35 + masterP * 0.65) * pVis;
          ctx.fillStyle = `rgba(${pt.r},${pt.g},${pt.b},${a.toFixed(3)})`;
          const currentSize = pt.size * (0.8 + masterP * 0.3);
          // Using fillRect instead of beginPath/arc is 3-5x faster for the browser
          ctx.fillRect(pt.x - currentSize, pt.y - currentSize, currentSize * 2, currentSize * 2);
        }
      }

      e.rafId = requestAnimationFrame(tick);
    };

    // Start the loop before even loading points — loop auto-idles until ready
    e.rafId = requestAnimationFrame(tick);
    buildParticles();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      e.ready = false;
      buildParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      e.mounted = false;
      cancelAnimationFrame(e.rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []); // runs exactly once — no dependency drift

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <AtmosphericBackground />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      <SVGOverlay ref={svgRef} />
    </div>
  );
};
