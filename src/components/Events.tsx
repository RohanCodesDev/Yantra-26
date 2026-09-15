import React from "react";

const EVENT_DATA = [
  {
    id: 1,
    title: "CODEKSHETRA",
    date: "September 23, 2026",
    description: "An intense competitive programming battle where algorithm masters duel across high-pressure speed and logic rounds.",
  },
  {
    id: 2,
    title: "ROBO DRIFT",
    date: "September 23, 2026",
    description: "Build a fast bot to conquer challenging obstacle terrain in a 2-bot head-to-head racing showdown.",
  },
  {
    id: 3,
    title: "VEDYANTRA",
    date: "September 23, 2026",
    description: "The flagship hackathon and software build sprint turning unorthodox ideas into functional digital products.",
  },
];

export const Events: React.FC = () => {
  return (
    <section className="relative py-12 md:py-14 -mt-6 md:-mt-10 px-6 max-w-7xl mx-auto z-10">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center uppercase tracking-widest">
        Upcoming <span className="text-red-600">Events</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EVENT_DATA.map((event) => (
          <div
            key={event.id}
            className="group relative bg-black/40 backdrop-blur-md border border-gray-800 p-8 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-900 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(220,20,60,0.15)]"
          >
            {/* Hover Glitch Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            
            <p className="text-red-500 text-sm font-mono mb-2">{event.date}</p>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">{event.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
