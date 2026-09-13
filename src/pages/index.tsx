import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ParticleStage } from "@/components/ParticleStage";
import { HomeContent } from "@/pages/home";

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isUnlockedRef = useRef(false);

  // Hydraulic smoothed progress tracker for slow, late-responding curtain
  const animState = useRef({
    currentProgress: 0,
    targetProgress: 0,
    rafId: 0,
  });

  const handleAnimationComplete = () => {
    if (isUnlockedRef.current) return;
    isUnlockedRef.current = true;
    setIsUnlocked(true);

    // Unlock document and Lenis scroll
    document.body.style.overflow = "";
    const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
    if (lenis) {
      lenis.start();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Always start at top on load
    window.scrollTo(0, 0);

    // Lock scrolling initially until the particle animation finishes
    document.body.style.overflow = "hidden";
    const stopLenisUntilDone = () => {
      const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
      if (lenis && !isUnlockedRef.current) {
        lenis.stop();
      } else if (!isUnlockedRef.current) {
        setTimeout(stopLenisUntilDone, 50);
      }
    };
    stopLenisUntilDone();

    // Safety fallback: unlock after 6.8s in case tab was background-throttled
    const fallbackTimer = setTimeout(() => {
      handleAnimationComplete();
    }, 6800);

    const track = trackRef.current;
    const landing = landingRef.current;
    const home = homeRef.current;
    const state = animState.current;

    // Continuous hydraulic smooth follower loop
    // Makes the slide-up feel slow, weighted, and respond with immersive delay
    const renderLoop = () => {
      if (!track || !landing) {
        state.rafId = requestAnimationFrame(renderLoop);
        return;
      }

      // Late response / slow trailing hydraulic physics:
      // A damping rate of 0.05 gives that luxurious, slow, delayed response
      const diff = state.targetProgress - state.currentProgress;
      if (Math.abs(diff) > 0.00005) {
        state.currentProgress += diff * 0.052;
      } else {
        state.currentProgress = state.targetProgress;
      }

      const p = state.currentProgress;

      // GPU-accelerated curtain slide up with subpixel precision
      landing.style.transform = `translate3d(0, ${(-p * 100).toFixed(3)}%, 0)`;

      // Immersive depth reveal on Home page
      if (home) {
        const homeScale = 0.955 + 0.045 * p;
        const homeOpacity = 0.2 + 0.8 * p;
        home.style.transform = `scale(${homeScale.toFixed(4)})`;
        home.style.opacity = homeOpacity.toFixed(3);
      }

      // Manage interactivity
      if (p >= 0.995) {
        landing.style.visibility = "hidden";
        landing.style.pointerEvents = "none";
      } else {
        landing.style.visibility = "visible";
        landing.style.pointerEvents = p > 0.88 ? "none" : "auto";
      }

      state.rafId = requestAnimationFrame(renderLoop);
    };

    state.rafId = requestAnimationFrame(renderLoop);

    // Scroll listener updates targetProgress with a late-response ease curve
    const onScrollUpdate = (scrollVal?: number) => {
      if (!isUnlockedRef.current) return;
      if (!track) return;

      const trackHeight = track.offsetHeight;
      const viewH = window.innerHeight;
      const maxScroll = Math.max(1, trackHeight - viewH);

      const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
      const currentScroll = typeof scrollVal === "number"
        ? scrollVal
        : (typeof lenis?.scroll === "number" ? lenis.scroll : (window.scrollY || window.pageYOffset || 0));

      const rawProgress = Math.min(1, Math.max(0, currentScroll / maxScroll));

      // Power curve makes the slide-up respond late with weighted inertia:
      // The curtain barely moves at first, then majestically accelerates into motion
      state.targetProgress = Math.pow(rawProgress, 1.35);
    };

    const onLenisScroll = (instance: import("lenis").default) => {
      onScrollUpdate(instance.scroll);
    };

    const onNativeScroll = () => {
      onScrollUpdate();
    };

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onNativeScroll);

    let checkTimer: ReturnType<typeof setTimeout>;
    const bindLenis = () => {
      const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
      if (lenis) {
        lenis.on("scroll", onLenisScroll);
        if (!isUnlockedRef.current) {
          lenis.stop();
        }
      } else {
        checkTimer = setTimeout(bindLenis, 50);
      }
    };
    bindLenis();

    return () => {
      cancelAnimationFrame(state.rafId);
      clearTimeout(fallbackTimer);
      clearTimeout(checkTimer);
      document.body.style.overflow = "";
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onNativeScroll);
      const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
      if (lenis) {
        lenis.off("scroll", onLenisScroll);
        lenis.start();
      }
    };
  }, []);

  const handleScrollToHome = () => {
    if (!isUnlockedRef.current) return;
    const track = trackRef.current;
    const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
    const maxScroll = track ? track.offsetHeight - window.innerHeight : window.innerHeight * 1.8;

    if (lenis) {
      lenis.scrollTo(maxScroll, {
        duration: 2.4,
        easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out
      });
    } else {
      window.scrollTo({ top: maxScroll, behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>YANTRA 2026</title>
        <meta name="description" content="YANTRA — Introductory Fest 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 280vh track provides substantial, scroll-driven travel (180vh scroll distance) */}
      <div
        ref={trackRef}
        className="relative w-full bg-black"
        style={{ height: "280vh" }}
      >
        {/* Home Page: sits sticky at top-0 underneath (z-10) and is revealed as landing slides up */}
        <div
          ref={homeRef}
          className="sticky top-0 z-10 w-full h-screen min-h-[100dvh] overflow-hidden"
          style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
        >
          <HomeContent />
        </div>

        {/* Landing Page: sits sticky at top-0 in front (z-20) with negative margin, slides completely up on scroll */}
        <div
          ref={landingRef}
          className="sticky top-0 z-20 w-full h-screen min-h-[100dvh] -mt-[100vh] overflow-hidden select-none border-b border-red-500/20"
          style={{
            willChange: "transform",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.95), 0 8px 30px rgba(220, 20, 40, 0.15)",
          }}
        >
          <ParticleStage
            onScrollClick={handleScrollToHome}
            onAnimationComplete={handleAnimationComplete}
            isUnlocked={isUnlocked}
          />
        </div>
      </div>
    </>
  );
}

