import "@/styles/globals.css";
import "lenis/dist/lenis.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Lenis from "lenis";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.095, // Buttery smooth, responsive and directly scroll-driven
      wheelMultiplier: 0.92, // Controlled, tactile, firm scroll response
      touchMultiplier: 1.15,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.095,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <Component {...pageProps} />;
}
