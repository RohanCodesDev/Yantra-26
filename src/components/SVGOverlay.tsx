import React, { forwardRef } from "react";

export const SVGOverlay = forwardRef<HTMLImageElement>((props, ref) => {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={ref}
      src="/YANTRA.svg"
      alt="YANTRA"
      className="absolute inset-0 m-auto pointer-events-none select-none w-[92vw] md:w-[75vw] max-w-[1000px]"
      style={{
        // Start at 0.001 (invisible to eye) so the browser pre-rasterizes
        // the SVG + its drop-shadow filters on first paint, avoiding a
        // cold-paint frame spike when the crossfade actually begins.
        opacity: 0.001,
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
