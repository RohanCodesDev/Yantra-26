export interface TargetPoint {
  x: number;
  y: number;
}

/**
 * Draws the SVG onto an offscreen canvas and returns pixel coords of
 * all filled (non-transparent) pixels, scaled to fit the viewport.
 */
export async function sampleSVGPoints(
  svgUrl: string,
  count: number,
  vpW: number,
  vpH: number,
  yOffset: number = 0   // pixels to shift target points vertically
): Promise<TargetPoint[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const SW = 900;
        const SH = Math.round((SW * (img.height || 300)) / (img.width || 900)) || 270;

        const oc = document.createElement("canvas");
        oc.width = SW;
        oc.height = SH;
        const ctx = oc.getContext("2d", { willReadFrequently: true })!;
        ctx.clearRect(0, 0, SW, SH);
        ctx.drawImage(img, 0, 0, SW, SH);

        const data = ctx.getImageData(0, 0, SW, SH).data;
        const filled: { x: number; y: number }[] = [];

        const step = Math.max(1, Math.floor(Math.sqrt((SW * SH) / (count * 4))));
        for (let y = 0; y < SH; y += step) {
          for (let x = 0; x < SW; x += step) {
            if (data[(y * SW + x) * 4 + 3] > 30) filled.push({ x, y });
          }
        }

        if (!filled.length) return resolve(fallback(count, vpW, vpH));

        // Bounding box
        let minX = SW, maxX = 0, minY = SH, maxY = 0;
        for (const p of filled) {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }

        const bw = maxX - minX || 1;
        const bh = maxY - minY || 1;
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        // Scale so wordmark is ~75vw on desktop, ~92vw on mobile (max 1000 px)
        const isMobile = vpW < 768;
        let scale = Math.min(vpW * (isMobile ? 0.92 : 0.75), 1000) / bw;
        if (bh * scale > vpH * 0.42) scale = (vpH * 0.42) / bh;

        const out: TargetPoint[] = [];
        for (let i = 0; i < count; i++) {
          const p = filled[Math.floor(Math.random() * filled.length)];
          out.push({
            x: vpW / 2 + (p.x - cx) * scale + (Math.random() - 0.5) * 1.5,
            y: vpH / 2 + yOffset + (p.y - cy) * scale + (Math.random() - 0.5) * 1.5,
          });
        }
        resolve(out);
      } catch {
        resolve(fallback(count, vpW, vpH));
      }
    };

    img.onerror = () => resolve(fallback(count, vpW, vpH, yOffset));
    img.src = svgUrl;
  });
}

function fallback(count: number, w: number, h: number, yOffset: number = 0): TargetPoint[] {
  const oc = document.createElement("canvas");
  oc.width = 800; oc.height = 220;
  const ctx = oc.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = "900 130px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("YANTRA", 400, 110);
  const data = ctx.getImageData(0, 0, 800, 220).data;
  const filled: TargetPoint[] = [];
  for (let y = 0; y < 220; y += 3)
    for (let x = 0; x < 800; x += 3)
      if (data[(y * 800 + x) * 4 + 3] > 100)
        filled.push({ x: w / 2 + (x - 400) * 0.9, y: h / 2 + yOffset + (y - 110) * 0.9 });

  const out: TargetPoint[] = [];
  for (let i = 0; i < count; i++)
    out.push(filled.length ? filled[Math.floor(Math.random() * filled.length)]
      : { x: w / 2 + (Math.random() - 0.5) * 400, y: h / 2 + (Math.random() - 0.5) * 100 });
  return out;
}
