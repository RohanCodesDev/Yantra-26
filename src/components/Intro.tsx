import React from "react";

export const Intro: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
      <div className="z-10 max-w-4xl">

        <p className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          The ultimate introductory fest of 2026. Step into a world where technology meets art, and reality blurs with the digital realm.
        </p>
        <div className="mt-10">
          <button className="px-8 py-4 bg-transparent border border-red-600 text-red-500 font-semibold rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,20,60,0.4)] hover:shadow-[0_0_25px_rgba(220,20,60,0.8)]">
            Explore Events
          </button>
        </div>
      </div>
    </section>
  );
};
