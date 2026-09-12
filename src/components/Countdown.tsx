"use client"

import React, { useEffect, useState } from "react"

// ── TARGET DATE ─────────────────────────────────────────────────────────────
// YANTRA 2026 event — 23rd September 2026
const TARGET_DATE = new Date("2026-09-23T00:00:00+05:30")
// ────────────────────────────────────────────────────────────────────────────

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

function getTimeLeft(): TimeLeft {
    const diff = Math.max(0, TARGET_DATE.getTime() - Date.now())
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}

function pad(n: number): string {
    return String(n).padStart(2, "0")
}

interface UnitProps {
    value: number
    label: string
}

function CountUnit({ value, label }: UnitProps) {
    return (
        <div className="flex flex-col items-center gap-1 group">
            {/* digit box */}
            <div
                className="relative flex items-center justify-center"
                style={{
                    width: "clamp(54px, 15vw, 112px)",
                    height: "clamp(64px, 17vw, 124px)",
                }}
            >
                {/* red outer glow border */}
                <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                        border: "1px solid rgba(200,0,0,0.45)",
                        background:
                            "linear-gradient(145deg, rgba(80,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)",
                        backdropFilter: "blur(4px)",
                    }}
                />
                {/* scanline overlay */}
                <div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
                    }}
                />
                {/* digit */}
                <span
                    className="relative z-10 font-black tabular-nums select-none"
                    style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(1.75rem, 6vw, 3.5rem)",
                        color: "#FF1A1A",
                        letterSpacing: "2px",
                    }}
                >
                    {pad(value)}
                </span>
            </div>
            {/* label */}
            <span
                className="uppercase tracking-[0.22em] select-none"
                style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: "clamp(0.55rem, 1.2vw, 0.75rem)",
                    color: "rgba(200,40,40,0.7)",
                    letterSpacing: "0.25em",
                }}
            >
                {label}
            </span>
        </div>
    )
}

function Separator() {
    return (
        <span
            className="font-black select-none mb-3 md:mb-6 mx-0.5 md:mx-1"
            style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: "clamp(1.2rem, 4vw, 2.8rem)",
                color: "rgba(200,0,0,0.55)",
            }}
        >
            :
        </span>
    )
}

export function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(id)
    }, [])

    if (!mounted) return null

    const isExpired =
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0

    return (
        <div className="flex flex-col items-center gap-5 select-none">
            {/* eyebrow label */}
            <p
                className="uppercase tracking-[0.35em] text-center"
                style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                    color: "rgba(200,50,50,0.6)",
                }}
            >
                WILL FIND YOU LUCIFER
            </p>

            {isExpired ? (
                <p
                    className="font-bold uppercase tracking-widest"
                    style={{ fontFamily: "'Lexend', sans-serif", color: "#FF1A1A", fontSize: "1.5rem" }}
                >
                    It&apos;s happening now!
                </p>
            ) : (
                <div className="flex items-end gap-1 md:gap-3">
                    <CountUnit value={timeLeft.days} label="days" />
                    <Separator />
                    <CountUnit value={timeLeft.hours} label="hrs" />
                    <Separator />
                    <CountUnit value={timeLeft.minutes} label="min" />
                    <Separator />
                    <CountUnit value={timeLeft.seconds} label="sec" />
                </div>
            )}
        </div>
    )
}
