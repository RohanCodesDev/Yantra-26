import React, { forwardRef } from "react";

export const SVGOverlay = forwardRef<HTMLImageElement>((props, ref) => {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={ref}
      src="/YANTRA.svg"
      alt="YANTRA"
      className="absolute left-1/2 pointer-events-none select-none w-[92vw] md:w-[75vw] max-w-[1000px]"
      style={{
        // Start at 0.001 (invisible to eye) so the browser pre-rasterizes
        // the SVG on first paint, avoiding a cold-paint frame spike when
        // the crossfade actually begins.
        opacity: 0.001,
        height: "auto",
        willChange: "opacity",
        transform: "translateX(-50%) translateY(calc(-50% - 15vh))",
        top: "50%",
      }}
      draggable={false}
    />
  );
});

SVGOverlay.displayName = "SVGOverlay";
