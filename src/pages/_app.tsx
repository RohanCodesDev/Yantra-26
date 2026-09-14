import "@/styles/globals.css";
import "lenis/dist/lenis.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import Lenis from "lenis";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Dynamically calculate visible viewport height across all mobile browsers
    const updateAppHeight = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${vh}px`);
    };

    updateAppHeight();

    window.addEventListener("resize", updateAppHeight);
    window.addEventListener("orientationchange", updateAppHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateAppHeight);
      window.visualViewport.addEventListener("scroll", updateAppHeight);
    }

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
      window.removeEventListener("resize", updateAppHeight);
      window.removeEventListener("orientationchange", updateAppHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateAppHeight);
        window.visualViewport.removeEventListener("scroll", updateAppHeight);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
