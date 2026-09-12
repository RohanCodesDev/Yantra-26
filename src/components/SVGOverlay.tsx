import React, { forwardRef } from "react";

export const SVGOverlay = forwardRef<HTMLImageElement>((props, ref) => {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={ref}
      src="/YANTRA.svg"
      alt="YANTRA"
      className="absolute inset-0 m-auto pointer-events-none select-none"
      style={{
        opacity: 0,
        width: "min(75vw, 1000px)",
        height: "auto",
        filter:
          "drop-shadow(0 0 10px rgba(200,16,46,0.35)) drop-shadow(0 0 35px rgba(200,16,46,0.15))",
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
      draggable={false}
    />
  );
});

SVGOverlay.displayName = "SVGOverlay";
