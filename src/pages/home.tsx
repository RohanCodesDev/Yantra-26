import React from "react";
import Head from "next/head";
import { Intro } from "@/components/Intro";

import ParticleDrift from "@/components/netAnimation";

export default function HomePage() {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Head>
                <title>YANTRA 2026 - Home</title>
                <meta name="description" content="Explore YANTRA 2026 Events and Activities" />
            </Head>

            {/* Pitch black base */}
            <div className="fixed inset-0 z-0 bg-black" />

            {/* Net animation layer above black bg */}
            <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden opacity-60">
                <ParticleDrift background="transparent" />
            </div>

            {/* Noise texture overlay */}
            <div className="home-noise fixed inset-0 z-[2] pointer-events-none" aria-hidden="true" />

            {/* YANTRA SVG Header */}
            <header className="w-full bg-transparent flex justify-center items-center px-8 pt-0 pb-0 relative z-10 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/YANTRA.svg"
                    alt="YANTRA"
                    className="h-52 md:h-[22rem] -mt-20 w-auto"
                />
            </header>

            <main className="relative z-[50] flex-1 w-full text-white font-sans">
                {/* Content Layers */}
                <div className="relative z-10 h-full">
                    <Intro />
                </div>
            </main>
        </div>
    );
}