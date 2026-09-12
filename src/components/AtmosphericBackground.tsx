import React, { forwardRef } from "react";

export const AtmosphericBackground = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Deep Edge Vignette */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 15%, rgba(0,0,0,0.88) 85%)",
        }}
      />

      {/* Red Light Effect - Fast & Punchy Breathing Pulse (Desktop & Mobile optimized) */}
      <div className="absolute inset-0 z-0 animate-red-light-breathe origin-center red-light-glow" />
    </div>
  );
});

AtmosphericBackground.displayName = "AtmosphericBackground";




