import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Particle } from "@/types/particle";
import {
  T_FORM,
  T_SVG_START,
  T_TOTAL,
  COUNT_DESKTOP,
  COUNT_MOBILE,
} from "@/constants/animation";
import { easeInOutCubic, clamp } from "@/utils/math";
import { sampleSVGPoints } from "@/utils/svgSampler";
import { AtmosphericBackground } from "./AtmosphericBackground";
import { SVGOverlay } from "./SVGOverlay";
import { Countdown } from "./Countdown";

// Pre-computed fade window normalised to [0, 1]
const CONV_START = T_SVG_START / T_TOTAL;

export const ParticleStage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);


  // Everything mutable lives in one ref — never touched by React render
  const eng = useRef({
    particles: [] as Particle[],
    ctx: null as CanvasRenderingContext2D | null,
    ready: false,
    elapsed: 0,
    lastTs: 0,
    rafId: 0,
    mounted: false,
  });

  useEffect(() => {
    const e = eng.current;
    e.mounted = true;

    // ── Canvas initialisation ──────────────────────────────────────────────
    const cv = canvasRef.current!;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    e.ctx = cv.getContext("2d", { alpha: true })!;

    // ── Build particle array ───────────────────────────────────────────────
    const buildParticles = async () => {
      const W = (cv.width = window.innerWidth);
      const H = (cv.height = window.innerHeight);
      e.ctx = cv.getContext("2d", { alpha: true })!;
      const mobile = W < 768;
      const count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;

      const targets = await sampleSVGPoints("/YANTRA.svg", count, W, H, H * -0.15);
      if (!e.mounted) return;

      const ps: Particle[] = targets.map((t) => {
        const angle = Math.random() * Math.PI * 2;
        const minR = Math.max(W, H) * 0.45;
        const maxR = Math.max(W, H) * 0.85;
        const radius = minR + Math.random() * (maxR - minR);

        const roll = Math.random();
        let r = 200, g = 16, b = 46;
        if (roll > 0.84) { r = 226; g = 27; b = 45; }
        else if (roll > 0.95) { r = 255; g = 77; b = 94; }
        else if (roll < 0.18) { r = 138; g = 10; b = 29; }

        // Centre of where the SVG actually renders (shifted up by 15vh)
        const svgCY = H / 2 - H * 0.15;
        const ix = W / 2 + Math.cos(angle) * radius;
        const iy = svgCY + Math.sin(angle) * radius;

        return {
          x: ix, y: iy,
          ix, iy,
          tx: t.x, ty: t.y,
          delay: Math.random() * 0.38,
          arcX: (Math.random() - 0.5) * (mobile ? 55 : 140),
          arcY: (Math.random() - 0.5) * (mobile ? 55 : 140),
          size: mobile ? 0.9 + Math.random() * 1.2 : 1.2 + Math.random() * 1.6,
          alpha: 0.28 + Math.random() * 0.62,
          r, g, b,
          jPhase: Math.random() * Math.PI * 2,
          jSpeed: 0.9 + Math.random() * 2.2,
          vx: 0, vy: 0,
        };
      });

      if (!e.mounted) return;

      e.particles = ps;
      e.elapsed = 0;
      e.lastTs = performance.now();
      e.ready = true;
    };

    // ── Render loop ────────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (!e.mounted) return;

      const svg = svgRef.current;
      const ctx = e.ctx;

      if (!e.ready || !ctx) {
        e.lastTs = ts;
        e.rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((ts - e.lastTs) / 1000, 0.032);
      e.lastTs = ts;
      e.elapsed += dt;

      const W = cv.width;
      const H = cv.height;
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
      // Minimum 0.001 to keep the pre-warmed layer alive and avoid repaint spike
      let svgOp = 0.001;
      if (masterP >= 1.0) {
        svgOp = 1;
      } else if (masterP > CONV_START) {
        svgOp = Math.max(0.001, easeInOutCubic((masterP - CONV_START) / (1.0 - CONV_START)));
      }

      // Apply flicker effect to SVG once it is fully formed and 1.5s have passed
      if (e.elapsed > T_TOTAL + 1.5) {
        const now = performance.now();
        const flickerCycle = now % 1000;
        let flickerMult = 1.0;
        if (flickerCycle < 150) {
          flickerMult = Math.random() > 0.3 ? 0.7 : 0.95;
        } else if (Math.random() < 0.03) {
          flickerMult = 0.8;
        }
        svgOp *= flickerMult;
      }

      if (svg) svg.style.opacity = String(svgOp);

      // ── Atmospheric Background breath reduction when SVG appears ──────────
      let bgOp = 1.0;
      if (masterP > CONV_START) {
        const p = clamp((masterP - CONV_START) / (1.0 - CONV_START), 0, 1);
        bgOp = 1.0 - 0.40 * easeInOutCubic(p); // Eases down by 40% (down to 0.60 opacity) when fully formed
      }
      const bg = bgRef.current;
      if (bg) bg.style.opacity = bgOp.toFixed(3);

      // ── Countdown fades in after SVG is fully visible ──────────────────────
      const cdEl = countdownRef.current;
      if (cdEl) {
        if (masterP >= 1.0) {
          cdEl.style.opacity = "1";
        } else if (masterP > CONV_START) {
          const p = clamp((masterP - CONV_START) / (1.0 - CONV_START), 0, 1);
          cdEl.style.opacity = easeInOutCubic(p).toFixed(3);
        } else {
          cdEl.style.opacity = "0";
        }
      }

      // ── Draw particles ──────────────────────────────────────────────────
      if (pVis > 0.002) {
        const convP = clamp(e.elapsed / T_FORM, 0, 1);

        for (let i = 0, len = e.particles.length; i < len; i++) {
          const pt = e.particles[i];
          const local = clamp((convP - pt.delay * 0.4) / (1 - pt.delay * 0.4), 0, 1);
          const easedT = easeInOutCubic(local);
          const sinArc = Math.sin(local * Math.PI);
          const arc = sinArc * sinArc;

          const baseX = pt.ix + (pt.tx - pt.ix) * easedT + pt.arcX * arc;
          const baseY = pt.iy + (pt.ty - pt.iy) * easedT + pt.arcY * arc;

          // Quadratic jitter dampening — smoothly reaches zero
          const jAmt = 2.0 * (1 - convP) * (1 - convP);
          pt.x = baseX + Math.sin(e.elapsed * pt.jSpeed + pt.jPhase) * jAmt;
          pt.y = baseY + Math.cos(e.elapsed * pt.jSpeed * 1.1 + pt.jPhase) * jAmt;

          const a = pt.alpha * (0.35 + masterP * 0.65) * pVis;
          // Avoid expensive string allocations and toFixed() in hot loop
          ctx.fillStyle = "rgba(" + pt.r + "," + pt.g + "," + pt.b + "," + (Math.round(a * 1000) / 1000) + ")";
          const s = pt.size * (0.8 + masterP * 0.3);
          ctx.fillRect(pt.x - s, pt.y - s, s * 2, s * 2);
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
      <Link className="home-events-link" href="/events">
        <span>EXPLORE EVENTS</span>
        <span aria-hidden="true">↗</span>
      </Link>
      <audio
        src="/Ra.One BGM ( RIO REMIX ) @OFFICIALRIOMUSIC.mp3"
        autoPlay
        loop
        className="hidden"
      />
      <AtmosphericBackground ref={bgRef} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />

      <SVGOverlay ref={svgRef} />

      {/* Countdown — fades in once particles finish forming the SVG */}
      <div
        ref={countdownRef}
        className="absolute left-1/2 pointer-events-none -translate-x-1/2 -translate-y-[calc(50%-4vh)] md:-translate-y-[calc(50%-20vh)]"
        style={{
          opacity: 0,
          top: "50%",
          transition: "opacity 0.4s ease",
          whiteSpace: "nowrap",
        }}
      >
        <Countdown />
      </div>
    </div>
  );
};

