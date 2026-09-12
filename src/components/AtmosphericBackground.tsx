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

      {/* Red Light Effect - Fast & Punchy Breathing Pulse */}
      <div
        className="absolute inset-0 z-0 animate-red-light-breathe origin-center"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(240, 20, 50, 0.35) 0%, rgba(160, 10, 30, 0.14) 40%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
});

AtmosphericBackground.displayName = "AtmosphericBackground";




