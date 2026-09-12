import React from "react";

const EVENT_DATA = [
  {
    id: 1,
    title: "Cyberpunk Hackathon",
    date: "March 12, 2026",
    description: "A 24-hour coding marathon to build the next generation of digital solutions.",
  },
  {
    id: 2,
    title: "Neon E-Sports",
    date: "March 13, 2026",
    description: "Compete in high-octane virtual arenas against the best gamers in the district.",
  },
  {
    id: 3,
    title: "AI Synthesis Panel",
    date: "March 14, 2026",
    description: "Industry leaders discuss the convergence of artificial intelligence and human creativity.",
  },
];

export const Events: React.FC = () => {
  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center uppercase tracking-widest">
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
