import React, { useEffect, useRef, useState } from "react";

const PART1 = "WELCOME TO YANTRA '26, ";
const PART2 = "LUCIFER.";
const FULL = PART1 + PART2;

// Characters that look like corrupted/encoded data
const NOISE = "▓▒░01101001101000110101101#%$@!?><{}[]|\\";

export const Intro: React.FC = () => {
  const part1Ref = useRef<HTMLSpanElement>(null);
  const part2Ref = useRef<HTMLSpanElement>(null);
  const [decoded, setDecoded] = useState(false);

  useEffect(() => {
    const p1 = part1Ref.current;
    const p2 = part2Ref.current;
    if (!p1 || !p2) return;

    const CYCLES_PER_CHAR = 10;
    const FRAME_INTERVAL = 40;

    const lockFrame = FULL.split("").map((_, i) =>
      Math.floor(i * 2.2) + CYCLES_PER_CHAR
    );

    const randNoise = (ch: string) =>
      ch === " " || ch === "'" ? ch : NOISE[Math.floor(Math.random() * NOISE.length)];

    let frame = 0;
    let intervalId: ReturnType<typeof setInterval>;
    let glitchIntervalId: ReturnType<typeof setInterval>;

    // Post-decode glitch: briefly scramble ~4 chars every 2s
    const startGlitch = () => {
      glitchIntervalId = setInterval(() => {
        const scrambleCount = 4 + Math.floor(Math.random() * 4);
        const positions = Array.from({ length: scrambleCount }, () =>
          Math.floor(Math.random() * FULL.length)
        );

        let glitchFrames = 0;
        const glitchTick = setInterval(() => {
          let out = FULL.split("");
          positions.forEach(pos => {
            if (FULL[pos] !== " " && FULL[pos] !== "'") {
              out[pos] = randNoise(FULL[pos]);
            }
          });
          p1.textContent = out.slice(0, PART1.length).join("");
          p2.textContent = out.slice(PART1.length).join("");
          glitchFrames++;
          if (glitchFrames >= 5) {
            clearInterval(glitchTick);
            p1.textContent = PART1;
            p2.textContent = PART2;
          }
        }, 40);
      }, 2000);
    };

    const render = () => {
      frame++;
      let out = "";
      for (let i = 0; i < FULL.length; i++) {
        out += frame >= lockFrame[i] ? FULL[i] : randNoise(FULL[i]);
      }
      p1.textContent = out.slice(0, PART1.length);
      p2.textContent = out.slice(PART1.length);

      if (frame >= lockFrame[FULL.length - 1]) {
        clearInterval(intervalId);
        p1.textContent = PART1;
        p2.textContent = PART2;
        // Show description then start post-decode glitch
        setDecoded(true);
        startGlitch();
      }
    };

    const timeout = setTimeout(() => {
      intervalId = setInterval(render, FRAME_INTERVAL);
    }, 150);

  }, []);

  return (
    <section className="relative flex flex-col justify-start items-center text-center px-6 pt-0 pb-10 -mt-8 md:-mt-16">

      {/* Scan-line overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-3">

        {/* Robo-decode headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-normal leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.06em",
            color: "#e8d5d5",
          }}
        >
          <span ref={part1Ref} />
          <span ref={part2Ref} style={{ color: "#e03030" }} />
          <span
            className="inline-block w-0.5 h-8 md:h-10 bg-red-500 ml-1 align-middle"
            style={{ animation: "blink 0.9s step-end infinite" }}
          />
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(159,26,26,0.5))" }} />
          <span style={{ color: "rgba(159,26,26,0.6)", fontSize: "0.6rem", fontFamily: "'Lexend', sans-serif", letterSpacing: "0.3em" }}>◆</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(159,26,26,0.5))" }} />
        </div>

        {/* Body — fades in only after headline fully decodes */}
        <div
          style={{
            opacity: decoded ? 1 : 0,
            transform: decoded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          {/* Body text */}
          <div
            className="max-w-2xl text-base md:text-lg leading-[1.85] space-y-4"
            style={{ fontFamily: "'Lexend', sans-serif", color: "rgba(255,255,255,0.92)" }}
          >
            <p>
              YANTRA '26 is the flagship mini-fest by{" "}
              <span style={{ color: "rgba(220,80,80,0.9)" }}>Xplorica</span> — a multidisciplinary
              club spanning technology, techno-management, design, and beyond. Where machines
              think, code breathes, and bold ideas meet fierce execution.
            </p>
            <p>
              Whether you're here to compete, create, or witness what the future looks like —
              the grid is live. The clock is ticking.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-1">
            {[
              { val: "10+", label: "Events" },
              { val: "500+", label: "Participants" },
              { val: "1", label: "Day of Chaos" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "'Lexend', sans-serif", color: "rgba(220,60,60,0.9)" }}
                >
                  {val}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Lexend', sans-serif", color: "rgba(180,140,140,0.55)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-1 px-10 py-3.5 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-300 relative group"
            style={{
              fontFamily: "'Lexend', sans-serif",
              border: "1px solid rgba(159,26,26,0.65)",
              color: "rgba(230,100,100,0.9)",
              background: "rgba(159,26,26,0.05)",
            }}
            onClick={() => {
              document.getElementById("events-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10">EXPLORE EVENTS</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(159,26,26,0.16)" }}
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};
