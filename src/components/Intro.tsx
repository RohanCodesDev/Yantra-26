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
    <section className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-0 pb-2 md:pb-4 -mt-11 sm:-mt-14 md:-mt-16">

      {/* Scan-line overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center" style={{ gap: "clamp(0.25rem, 0.7vh, 0.7rem)" }}>

        {/* Robo-decode headline */}
        <h1
          className="font-normal leading-tight flex flex-col items-center"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: "clamp(1.5rem, 6.4vw, 4rem)",
            letterSpacing: "0.035em",
          }}
        >
          {/* Line 1 — always one line */}
          <span className="whitespace-nowrap" style={{ color: "#ffffff" }} ref={part1Ref} />
          {/* Line 2 — LUCIFER + cursor inline */}
          <span className="flex items-center justify-center">
            <span style={{ color: "#e03030" }} ref={part2Ref} />
            <span
              className="inline-block w-0.5 h-[1.1em] bg-red-500 ml-1.5 align-middle"
              style={{ animation: "blink 0.9s step-end infinite" }}
            />
          </span>
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md my-0.5 md:my-0">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(159,26,26,0.5))" }} />
          <span style={{ color: "rgba(159,26,26,0.6)", fontSize: "0.6rem", fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.3em" }}>◆</span>
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
            gap: "clamp(0.45rem, 1.3vh, 1.6rem)",
            width: "100%",
          }}
        >
          {/* Body text */}
          <div
            className="px-1 sm:px-4 md:px-0"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "clamp(1.02rem, 2.2vh, 1.4rem)",
              lineHeight: 1.62,
              color: "rgba(255,255,255,0.92)",
              maxWidth: "42rem",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.25rem, 0.7vh, 0.7rem)",
              animation: decoded ? "textFlicker 7s infinite" : "none",
            }}
          >
            <p>
              YANTRA '26 is the flagship mini-fest by{" "}
              <span style={{ color: "rgba(220,80,80,0.9)", fontWeight: 700 }}>Xplorica</span> — a multidisciplinary
              club spanning technology, techno-management, design, and beyond. Where machines
              think, code breathes, and bold ideas meet fierce execution.
            </p>
            <p>
              Whether you're here to compete, create, or witness what the future looks like —
              the grid is live. The clock is ticking.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 w-full max-w-lg px-1 sm:px-0" style={{ gap: "clamp(0.4rem, 2vw, 1.5rem)" }}>
            {[
              { val: "10+", label: "Events" },
              { val: "500+", label: "Participants" },
              { val: "1", label: "Day of Chaos" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center" style={{ gap: "clamp(0.12rem, 0.3vh, 0.4rem)" }}>
                <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "clamp(1.55rem, 3.2vh, 2.4rem)", fontWeight: 700, color: "rgba(220,60,60,0.9)" }}>
                  {val}
                </span>
                <span
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "clamp(0.72rem, 1.2vh, 0.95rem)",
                    textTransform: "uppercase",
                    letterSpacing: "clamp(0.08em, 0.3vw, 0.15em)",
                    color: "rgba(235,210,210,0.78)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "clamp(0.92rem, 1.8vh, 1.15rem)",
              padding: "clamp(0.55rem, 1.2vh, 1.1rem) clamp(1.6rem, 4.5vw, 3.5rem)",
              letterSpacing: "0.14em",
              fontWeight: 600,
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,40,40,0.65)",
              color: "rgba(255,140,140,0.95)",
              background: "rgba(180,20,20,0.08)",
              cursor: "default",
            }}
          >
            EVENTS COMING SOON
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes textFlicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 1;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
};
