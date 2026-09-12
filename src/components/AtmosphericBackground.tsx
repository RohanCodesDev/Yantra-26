import React from "react";

export const AtmosphericBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,16,46,0.07) 0%, rgba(24,5,7,0.04) 50%, transparent 80%)",
      }}
    />
  );
};
