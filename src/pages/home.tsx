import React from "react";
import Head from "next/head";
import { Intro } from "@/components/Intro";
import ParticleDrift from "@/components/netAnimation";

export function HomeContent() {
    return (
        <div id="home-section" className="relative min-h-screen min-h-[100dvh] overflow-x-hidden overflow-y-auto flex flex-col md:h-screen md:overflow-hidden bg-black">
            {/* Pitch black base */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Net animation layer */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-60">
                <ParticleDrift background="transparent" />
            </div>

            {/* Noise texture overlay */}
            <div className="home-noise absolute inset-0 z-[2] pointer-events-none" aria-hidden="true" />

            {/* YANTRA SVG Header */}
            <header
                onClick={() => {
                    if (typeof window !== "undefined") {
                        const lenis = (window as unknown as { lenis?: import("lenis").default }).lenis;
                        if (lenis && window.scrollY > 50) {
                            lenis.scrollTo(0, { duration: 1.8 });
                        } else if (window.scrollY > 50) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }
                }}
                className="w-full bg-transparent flex justify-center items-center px-4 md:px-8 pt-1 sm:pt-2 md:pt-0 pb-0 relative z-10 cursor-pointer select-none"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/YANTRA.svg"
                    alt="YANTRA"
                    className="h-48 xs:h-56 sm:h-64 md:h-[22rem] mt-0 sm:mt-1 md:-mt-20 -translate-y-[18px] md:translate-y-0 max-w-[94vw] md:max-w-none w-auto object-contain"
                />
            </header>

            <main className="relative z-[50] flex-1 w-full text-white font-sans flex flex-col justify-start md:justify-center">
                {/* Content Layers */}
                <div className="relative z-10 w-full h-full flex flex-col justify-start md:justify-center">
                    <Intro />
                </div>
            </main>

            {/* Mobile Footer with FB, IG, LI */}
            <footer className="relative z-[50] w-full flex md:hidden justify-center items-center gap-5 pb-3 pt-0">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-red-800/40 bg-red-950/30 text-red-400 hover:text-white hover:border-red-500 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-red-800/40 bg-red-950/30 text-red-400 hover:text-white hover:border-red-500 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-red-800/40 bg-red-950/30 text-red-400 hover:text-white hover:border-red-500 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </a>
            </footer>
        </div>
    );
}

export default function HomePage() {
    return (
        <>
            <Head>
                <title>YANTRA 2026 - Home</title>
                <meta name="description" content="Explore YANTRA 2026 Events and Activities" />
            </Head>
            <HomeContent />
        </>
    );
}