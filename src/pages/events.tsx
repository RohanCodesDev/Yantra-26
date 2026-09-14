import Head from "next/head";
import Link from "next/link";
<<<<<<< HEAD
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
=======
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
>>>>>>> 9e47935b0c86a3eb1379f38dfa68a1084e7701c0

type EventCategory = "All" | "Tech" | "Nontech" | "Flash" | "photography";

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
  { number: "01", title: "VEDYANTRA", date: "23 SEP 2026", time: "09:00 AM - 09:00 PM", venue: "Innovation Lab", category: "Tech" as const, description: "A fast-moving build sprint for teams turning strange ideas into useful digital tools.", accent: "#ff2f3f" },
  { number: "02", title: "CODEKHESTRA", date: "23 SEP 2026", time: "10:00 AM - 06:00 PM", venue: "Main Arena", category: "Tech" as const, description: "High-pressure brackets, live spectators, and a final round made for the big screen.", accent: "#f05a2a" },
  { number: "03", title: "AI Synthesis Panel", date: "23 SEP 2026", time: "11:30 AM - 12:30 PM", venue: "Auditorium", category: "Tech" as const, description: "A candid conversation about artificial intelligence, creative work, and what comes next.", accent: "#ff8a3d" },
  { number: "04", title: "Design After Dark", date: "23 SEP 2026", time: "01:00 PM - 03:00 PM", venue: "Studio Floor", category: "photography" as const, description: "A visual challenge where teams shape a bold identity from a prompt revealed on the day.", accent: "#db304d" },
  { number: "05", title: "Robo Rumble", date: "23 SEP 2026", time: "03:30 PM - 05:30 PM", venue: "Workshop Bay", category: "Tech" as const, description: "Build, battle, and improvise in a mechanical arena designed to reward clever engineering.", accent: "#ff4b26" },
  { number: "06", title: "Open Mic: Frequency", date: "23 SEP 2026", time: "07:00 PM - 09:00 PM", venue: "The Red Room", category: "Nontech" as const, description: "Music, poetry, comedy, and unfiltered voices from the people who make the fest what it is.", accent: "#c8344e" },
  { number: "07", title: "Battle of Bands", date: "23 SEP 2026", time: "10:00 AM - 12:00 PM", venue: "Main Stage", category: "Nontech" as const, description: "Live bands go head-to-head with original sets, electric energy, and a crowd-picked winner.", accent: "#e63b55" },
  { number: "08", title: "Nritya", date: "23 SEP 2026", time: "12:30 PM - 02:00 PM", venue: "Cultural Court", category: "Nontech" as const, description: "A high-spirited dance showcase bringing classical, folk, and contemporary movement together.", accent: "#f06a45" },
  { number: "09", title: "Street Play", date: "23 SEP 2026", time: "02:30 PM - 03:30 PM", venue: "Central Courtyard", category: "Nontech" as const, description: "Short, sharp performances that turn everyday stories into theatre with a point of view.", accent: "#cf3857" },
  { number: "10", title: "Campus Canvas", date: "23 SEP 2026", time: "04:00 PM - 06:00 PM", venue: "Arts Pavilion", category: "Nontech" as const, description: "Artists collaborate on a live mural where every brushstroke becomes part of the festival story.", accent: "#ff7650" },
  { number: "11", title: "Battle of Poets", date: "23 SEP 2026", time: "06:30 PM - 08:00 PM", venue: "The Red Room", category: "Nontech" as const, description: "Words take the stage in a fast-paced poetry slam judged by rhythm, wit, and feeling.", accent: "#b93d62" },
  { number: "12", title: "Flash Mob", date: "23 SEP 2026", time: "11:00 AM - 11:15 AM", venue: "Central Courtyard", category: "Flash" as const, description: "A surprise burst of choreography appears in the crowd and turns the courtyard into a moving stage.", accent: "#ffb13b" },
  { number: "13", title: "60-Second Stories", date: "23 SEP 2026", time: "02:00 PM - 02:30 PM", venue: "Main Stage", category: "Flash" as const, description: "Step up, take the mic, and tell a complete story before the countdown hits zero.", accent: "#ff6b35" },
  { number: "14", title: "Quick Draw", date: "23 SEP 2026", time: "05:00 PM - 05:30 PM", venue: "Arts Pavilion", category: "Flash" as const, description: "Artists race the clock to turn a surprise prompt into a finished sketch in thirty minutes.", accent: "#ffd166" },
];

const FILTERS: EventCategory[] = ["All", "Tech", "Nontech", "Flash", "photography"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory>("All");
  const [isVedyantraModalOpen, setIsVedyantraModalOpen] = useState(false);
  const visibleEvents = EVENT_DATA.filter((event) => activeFilter === "All" || event.category === activeFilter);

  useEffect(() => {
    if (!isVedyantraModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVedyantraModalOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVedyantraModalOpen]);

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
                  {event.title === "VEDYANTRA" && <button className="event-details-button" onClick={() => setIsVedyantraModalOpen(true)} type="button">VIEW DETAILS <ArrowUpRight size={14} /></button>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      {isVedyantraModalOpen && (
        <div className="event-modal-backdrop" onClick={() => setIsVedyantraModalOpen(false)} role="presentation">
          <section className="event-modal" aria-labelledby="vedyantra-modal-title" aria-modal="true" role="dialog" onClick={(event) => event.stopPropagation()}>
            <button className="event-modal-close" aria-label="Close VEDYANTRA details" onClick={() => setIsVedyantraModalOpen(false)} type="button"><X size={18} /></button>
            <div className="event-modal-visual" aria-hidden="true">
              <span className="event-modal-number">01</span>
              <span className="event-modal-coordinate">YANTRA / 26<br />INNOVATION LAB</span>
            </div>
            <div className="event-modal-content">
              <span className="event-category">TECH / FLAGSHIP EVENT</span>
              <h2 id="vedyantra-modal-title">VEDYANTRA</h2>
              <p className="event-modal-lead">Turn an unexpected idea into a useful digital tool during YANTRA&apos;s flagship build sprint.</p>
              <div className="event-modal-meta">
                <span><CalendarDays size={15} /> 23 SEP 2026 / 09:00 AM - 09:00 PM</span>
                <span><MapPin size={15} /> Innovation Lab</span>
              </div>
              <div className="event-modal-copy">
                <span>THE BRIEF</span>
                <p>Teams have one day to find a problem, shape a sharp idea, and build a working prototype. Bring your curiosity, your crew, and the nerve to make something real.</p>
              </div>
              <button className="event-modal-action" onClick={() => setIsVedyantraModalOpen(false)} type="button">RETURN TO EVENTS <ArrowUpRight size={14} /></button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
