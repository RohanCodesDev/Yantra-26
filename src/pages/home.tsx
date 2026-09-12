import React from "react";
import Head from "next/head";
import { Intro } from "@/components/Intro";
import { Events } from "@/components/Events";
import ParticleDrift from "@/components/netAnimation";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>YANTRA 2026 - Home</title>
                <meta name="description" content="Explore YANTRA 2026 Events and Activities" />
            </Head>

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
                {/* Adjust the opacity value below to change transparency. 
                    Lower values (e.g., opacity-10, opacity-20) = More transparent 
                    Higher values (e.g., opacity-60, opacity-80) = More visible/opaque */}
                <div className="absolute inset-0 opacity-35">
                    <ParticleDrift background="transparent" baseColor="#800000ff" accentColor="#ff0000" />
                </div>
            </div>

            {/* YANTRA SVG Header */}
            <header className="w-full bg-transparent flex justify-center items-center px-8 pt-0 pb-6 relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/YANTRA.svg"
                    alt="YANTRA"
                    className="h-52 md:h-[22rem] -mt-20 w-auto"
                />
            </header>

            <main className="relative min-h-screen w-full text-white font-sans overflow-x-hidden">
                {/* Content Layers */}
                <div className="relative z-10 pb-20">
                    <Intro />
                    <Events />
                </div>
            </main>
        </>
    );
}