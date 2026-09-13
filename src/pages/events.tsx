import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

type EventCategory = "All" | "Tech" | "Nontech" | "photography";

const EVENT_DATA = [
  { number: "01", title: "VEDYANTRA", date: "23 SEP 2026", time: "09:00 AM - 09:00 PM", venue: "Innovation Lab", category: "Tech" as const, description: "A fast-moving build sprint for teams turning strange ideas into useful digital tools.", accent: "#ff2f3f" },
  { number: "02", title: "CODEKHESTRA", date: "23 SEP 2026", time: "10:00 AM - 06:00 PM", venue: "Main Arena", category: "Tech" as const, description: "High-pressure brackets, live spectators, and a final round made for the big screen.", accent: "#f05a2a" },
  { number: "03", title: "AI Synthesis Panel", date: "23 SEP 2026", time: "11:30 AM - 12:30 PM", venue: "Auditorium", category: "Tech" as const, description: "A candid conversation about artificial intelligence, creative work, and what comes next.", accent: "#ff8a3d" },
  { number: "04", title: "Design After Dark", date: "23 SEP 2026", time: "01:00 PM - 03:00 PM", venue: "Studio Floor", category: "photography" as const, description: "A visual challenge where teams shape a bold identity from a prompt revealed on the day.", accent: "#db304d" },
  { number: "05", title: "Robo Rumble", date: "23 SEP 2026", time: "03:30 PM - 05:30 PM", venue: "Workshop Bay", category: "Tech" as const, description: "Build, battle, and improvise in a mechanical arena designed to reward clever engineering.", accent: "#ff4b26" },
  { number: "06", title: "Open Mic: Frequency", date: "23 SEP 2026", time: "07:00 PM - 09:00 PM", venue: "The Red Room", category: "Nontech" as const, description: "Music, poetry, comedy, and unfiltered voices from the people who make the fest what it is.", accent: "#c8344e" },
];

const FILTERS: EventCategory[] = ["All", "Tech", "Nontech", "photography"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory>("All");
  const visibleEvents = EVENT_DATA.filter((event) => activeFilter === "All" || event.category === activeFilter);

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
          <h1 className="events-title">Explore Events</h1>
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
                  <div className="event-heading"><div><span className="event-category">{event.category}</span><h2>{event.title}</h2></div><ArrowUpRight className="event-arrow" size={25} strokeWidth={1.5} /></div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta"><span><CalendarDays size={14} /> {event.date} / {event.time}</span><span><MapPin size={14} /> {event.venue}</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}