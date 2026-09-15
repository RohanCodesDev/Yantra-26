import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Shield, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type EventCategory = "All" | "Hardware" | "Software" | "Non-Tech" | "Flash" | "Photography";

const NOISE_CHARS = "v/R░01#%$@!?><{}[]|\\".split("");

function GlitchText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let glitchTimeout: ReturnType<typeof setTimeout>;
    let glitchInterval: ReturnType<typeof setInterval>;

    const doGlitch = () => {
      const count = 2 + Math.floor(Math.random() * 2);
      const positions = Array.from({ length: count }, () =>
        Math.floor(Math.random() * text.length)
      );
      let frames = 0;
      glitchInterval = setInterval(() => {
        const out = text.split("");
        positions.forEach(pos => {
          if (text[pos] !== " " && text[pos] !== ":") {
            out[pos] = NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
          }
        });
        if (el) el.textContent = out.join("");
        frames++;
        if (frames >= 4) {
          clearInterval(glitchInterval);
          if (el) el.textContent = text;
          glitchTimeout = setTimeout(doGlitch, 900 + Math.random() * 300);
        }
      }, 40);
    };

    glitchTimeout = setTimeout(doGlitch, Math.random() * 1200);
    return () => { clearTimeout(glitchTimeout); clearInterval(glitchInterval); };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}

const EVENT_DATA = [
  // Hardware Events
  {
    number: "01",
    title: "MAZE RUNNER 2D",
    date: "23 SEP 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Robotics Arena",
    category: "Hardware" as const,
    description: "Design, calibrate, and navigate autonomous or manual bots through an intricate 2D maze filled with dead ends and tight turns.",
    accent: "#ff2f3f",
  },
  {
    number: "02",
    title: "TERRA DRIVE",
    date: "23 SEP 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Mech Courtyard",
    category: "Hardware" as const,
    description: "Command robust all-terrain rovers over rugged obstacles, steep inclines, and brutal suspension-testing tracks.",
    accent: "#f05a2a",
  },
  {
    number: "03",
    title: "COMBO",
    date: "23 SEP 2026",
    time: "11:00 AM - 02:00 PM",
    venue: "Hardware Bay",
    category: "Hardware" as const,
    description: "A high-stakes dual engineering trial challenging teams with circuit diagnosis, rapid breadboarding, and mechanical assembly.",
    accent: "#ff4b26",
  },

  // Software Events
  {
    number: "04",
    title: "CODEKSHETRA",
    date: "23 SEP 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Computing Lab",
    category: "Software" as const,
    description: "The ultimate competitive programming battleground where speed, logic, and algorithmic supremacy determine the victor.",
    accent: "#ff3d5a",
  },
  {
    number: "05",
    title: "VEDYANTRA",
    date: "23 SEP 2026",
    time: "09:00 AM - 09:00 PM",
    venue: "Innovation Hub",
    category: "Software" as const,
    description: "A powerhouse software hackathon and sprint where teams build bold, functional digital applications from scratch.",
    accent: "#ff8a3d",
  },

  // Non-Tech Events
  {
    number: "06",
    title: "MATCHSTICK ART",
    date: "23 SEP 2026",
    time: "10:30 AM - 12:30 PM",
    venue: "Arts Pavilion",
    category: "Non-Tech" as const,
    description: "Channel patience and architectural flair to construct intricate geometric sculptures and structures using only matchsticks.",
    accent: "#e63b55",
  },
  {
    number: "07",
    title: "XAGGERATE(WRITING)",
    date: "23 SEP 2026",
    time: "01:00 PM - 02:30 PM",
    venue: "The Red Room",
    category: "Non-Tech" as const,
    description: "Push hyperbole, melodrama, and creative writing to their wildest limits in a fast-paced battle of exaggerated storytelling.",
    accent: "#c8344e",
  },
  {
    number: "08",
    title: "XPRESSION(ART)",
    date: "23 SEP 2026",
    time: "02:00 PM - 04:00 PM",
    venue: "Design Quad",
    category: "Non-Tech" as const,
    description: "Translate concepts, raw thoughts, and vivid color schemes onto canvas in an expressive live fine-arts duel.",
    accent: "#f06a45",
  },
  {
    number: "09",
    title: "SHERLOCKOLOGY",
    date: "23 SEP 2026",
    time: "03:00 PM - 05:30 PM",
    venue: "Central Amphitheatre",
    category: "Non-Tech" as const,
    description: "Step into the shoes of a consulting detective to decipher cryptic riddles, examine evidence, and solve the crime.",
    accent: "#cf3857",
  },
  {
    number: "10",
    title: "TUNA TANK",
    date: "23 SEP 2026",
    time: "04:30 PM - 06:30 PM",
    venue: "Auditorium Hall",
    category: "Non-Tech" as const,
    description: "Pitch absurd, eccentric, or surprisingly genius ventures to our eccentric panel of sharp-tongued angel investors.",
    accent: "#ff7650",
  },

  // Flash Events
  {
    number: "11",
    title: "WORDSWORTH",
    date: "23 SEP 2026",
    time: "11:30 AM - 12:15 PM",
    venue: "Central Courtyard",
    category: "Flash" as const,
    description: "A high-octane vocabulary and anagram race testing quick recall, linguistic wit, and verbal reflex against the clock.",
    accent: "#ffb13b",
  },
  {
    number: "12",
    title: "GUESS THE CELEB",
    date: "23 SEP 2026",
    time: "01:30 PM - 02:15 PM",
    venue: "Student Hub",
    category: "Flash" as const,
    description: "Identify popular personalities from pixelated photos, disguised voices, and enigmatic hints before the buzzer sounds.",
    accent: "#ff6b35",
  },
  {
    number: "13",
    title: "120 SEC ART GUESSING",
    date: "23 SEP 2026",
    time: "03:00 PM - 03:45 PM",
    venue: "Open Arena",
    category: "Flash" as const,
    description: "A frantic drawing challenge where teams sketch and decipher high-speed prompts under a rigorous 120-second timer.",
    accent: "#ffd166",
  },
  {
    number: "14",
    title: "ORIGAMI",
    date: "23 SEP 2026",
    time: "04:00 PM - 04:45 PM",
    venue: "Activity Plaza",
    category: "Flash" as const,
    description: "Fold, crease, and craft intricate geometric designs and paper marvels within strict time constraints.",
    accent: "#ff9f43",
  },

  // Photography
  {
    number: "15",
    title: "COLORS",
    date: "23 SEP 2026",
    time: "All Day Submission",
    venue: "Campus Wide",
    category: "Photography" as const,
    description: "Frame the vivid hues, dynamic light patterns, and raw festival atmosphere through your lens in this signature photo contest.",
    accent: "#db304d",
  },
];

const FILTERS: EventCategory[] = ["All", "Hardware", "Software", "Non-Tech", "Flash", "Photography"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory>("All");
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENT_DATA[0] | null>(null);
  const visibleEvents = EVENT_DATA.filter((event) => activeFilter === "All" || event.category === activeFilter);

  useEffect(() => {
    if (!selectedEvent) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedEvent]);

  return (
    <>
      <Head>
        <title>Events | YANTRA 2026</title>
        <meta name="description" content="Explore every YANTRA 2026 event." />
      </Head>
      <main className="events-page min-h-screen overflow-hidden text-white">
        <div className="events-grid" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <Link className="events-back-link" href="/" aria-label="Back to YANTRA home"><ArrowLeft size={16} /><span>YANTRA / 26</span></Link>
          <span className="events-status"><i /> SYSTEM ONLINE</span>
        </header>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-16 text-center md:px-10 md:pt-24">
          <h1 className="events-title">Explore <em>Events</em></h1>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="events-filter-bar" aria-label="Filter events by category">
            <span className="events-filter-label">FILTER BY</span>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => <button key={filter} className={`events-filter ${activeFilter === filter ? "is-active" : ""}`} onClick={() => setActiveFilter(filter)} type="button">{filter}</button>)}
            </div>
            <span className="events-count">{String(visibleEvents.length).padStart(2, "0")} EVENTS</span>
          </div>
          <div className="events-list">
            {visibleEvents.map((event) => (
              <article className="event-row" key={event.number}>
                <span className="event-number" style={{ color: event.accent }}>{event.number}</span>
                <div className="event-main">
                  <div className="event-heading">
                    <div><span className="event-category">{event.category}</span><h2><GlitchText text={event.title} /></h2></div>
                    <ArrowUpRight className="event-arrow" size={25} strokeWidth={1.5} />
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta"><span><CalendarDays size={14} /> {event.date} / {event.time}</span><span><MapPin size={14} /> {event.venue}</span></div>
                  <button className="event-details-button" onClick={() => setSelectedEvent(event)} type="button">VIEW DETAILS <ArrowUpRight size={14} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      {selectedEvent && (
        <div className="event-modal-backdrop" onClick={() => setSelectedEvent(null)} role="presentation">
          <section
            className="event-modal"
            aria-labelledby="event-modal-title"
            aria-modal="true"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
            style={{
              borderColor: `${selectedEvent.accent}55`,
              boxShadow: `0 0 60px rgba(0, 0, 0, 0.95), 0 0 35px ${selectedEvent.accent}20, inset 0 0 25px ${selectedEvent.accent}08`,
            }}
          >
            {/* Ambient dynamic radial glow */}
            <div
              className="event-modal-glow"
              aria-hidden="true"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${selectedEvent.accent}30 0%, transparent 65%)`,
              }}
            />

            {/* CRT scanlines & noise overlay */}
            <div className="event-modal-scanlines" aria-hidden="true" />
            <div className="home-noise absolute inset-0 z-0 pointer-events-none opacity-30" aria-hidden="true" />

            {/* Tactical HUD Corner reticles */}
            <div className="hud-corner hud-corner-tl" style={{ borderColor: selectedEvent.accent }} />
            <div className="hud-corner hud-corner-tr" style={{ borderColor: selectedEvent.accent }} />
            <div className="hud-corner hud-corner-bl" style={{ borderColor: selectedEvent.accent }} />
            <div className="hud-corner hud-corner-br" style={{ borderColor: selectedEvent.accent }} />

            {/* Header Telemetry Bar */}
            <header className="event-modal-topbar">
              <div className="flex items-center gap-2.5">
                <span
                  className="event-modal-live-dot"
                  style={{
                    backgroundColor: selectedEvent.accent,
                    boxShadow: `0 0 10px ${selectedEvent.accent}`,
                  }}
                />
                <span className="event-modal-sys-tag">
                  PROTOCOL // YN26-ID_{selectedEvent.number}
                </span>
              </div>
              <div
                className="event-modal-category-pill"
                style={{
                  borderColor: `${selectedEvent.accent}66`,
                  color: selectedEvent.accent,
                  backgroundColor: `${selectedEvent.accent}14`,
                }}
              >
                {selectedEvent.category.toUpperCase()} DIVISION
              </div>
              <button
                className="event-modal-close-btn"
                aria-label="Close details"
                onClick={() => setSelectedEvent(null)}
                type="button"
              >
                <span className="event-modal-esc-hint">ESC</span>
                <X size={15} />
              </button>
            </header>

            {/* Modal Body: strictly non-scrollable */}
            <div className="event-modal-body">
              {/* Event Hero Area */}
              <div className="event-modal-hero">
                <div className="event-modal-hero-left">
                  <div className="event-modal-sec-code" style={{ color: selectedEvent.accent }}>
                    <span>NODE // {selectedEvent.venue.toUpperCase()}</span>
                    <span>•</span>
                    <span>SECTOR_{selectedEvent.number}</span>
                  </div>
                  <h2 id="event-modal-title" className="event-modal-title">
                    <GlitchText text={selectedEvent.title} />
                  </h2>
                </div>
                <div className="event-modal-watermark" style={{ color: selectedEvent.accent }} aria-hidden="true">
                  {selectedEvent.number}
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="event-modal-grid">
                <div className="event-modal-card">
                  <span className="event-modal-label">
                    <CalendarDays size={13} style={{ color: selectedEvent.accent }} />
                    TIMELINE
                  </span>
                  <span className="event-modal-val">{selectedEvent.date}</span>
                  <span className="event-modal-subval">{selectedEvent.time}</span>
                </div>
                <div className="event-modal-card">
                  <span className="event-modal-label">
                    <MapPin size={13} style={{ color: selectedEvent.accent }} />
                    ARENA / VENUE
                  </span>
                  <span className="event-modal-val">{selectedEvent.venue}</span>
                  <span className="event-modal-subval">YANTRA FEST GROUNDS</span>
                </div>
                <div className="event-modal-card">
                  <span className="event-modal-label">
                    <Shield size={13} style={{ color: selectedEvent.accent }} />
                    ACCESS & FORMAT
                  </span>
                  <span className="event-modal-val">OPEN TO ALL</span>
                  <span className="event-modal-subval">SOLO & SQUAD ENTRIES</span>
                </div>
              </div>

              {/* Cyber-divider */}
              <div className="event-modal-divider" aria-hidden="true">
                <div
                  className="event-modal-divider-line"
                  style={{
                    background: `linear-gradient(to right, transparent, ${selectedEvent.accent}66, transparent)`,
                  }}
                />
                <span className="event-modal-divider-diamond" style={{ color: selectedEvent.accent }}>
                  ◆
                </span>
                <div
                  className="event-modal-divider-line"
                  style={{
                    background: `linear-gradient(to right, transparent, ${selectedEvent.accent}66, transparent)`,
                  }}
                />
              </div>

              {/* Mission Briefing / Description */}
              <div className="event-modal-briefing">
                <span className="event-modal-briefing-label" style={{ color: selectedEvent.accent }}>
                  // MISSION BRIEFING & OBJECTIVES
                </span>
                <p className="event-modal-lead">{selectedEvent.description}</p>
              </div>

              {/* Footer Action Deck */}
              <footer className="event-modal-footer">
                <div className="event-modal-footer-status">
                  <span className="event-modal-status-text">STATUS: ACTIVE</span>
                  <span className="text-white/30 hidden sm:inline">|</span>
                  <span className="text-white/50 hidden sm:inline">CLEARANCE: CONFIRMED</span>
                </div>
                <div className="event-modal-footer-actions">
                  <button
                    className="event-modal-secondary-btn"
                    onClick={() => setSelectedEvent(null)}
                    type="button"
                  >
                    DISMISS
                  </button>
                  <button
                    className="event-modal-primary-btn"
                    style={{
                      borderColor: selectedEvent.accent,
                      background: `${selectedEvent.accent}18`,
                    }}
                    onClick={() => setSelectedEvent(null)}
                    type="button"
                  >
                    <span>REGISTER EVENT</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </footer>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
