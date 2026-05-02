import type { AdinkraSymbol } from "@/types";

// ── Class name helper ────────────────────────────────────
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Image processing ─────────────────────────────────────
// Converts a black-on-white symbol PNG to cream-on-transparent
// Run this in a build script or server component — not in the browser
export async function processSymbolImage(src: string): Promise<string> {
  const response = await fetch(src);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        // Alpha = inverse luminance (black → opaque, white → transparent)
        data[i + 3] = 255 - lum;
        // Tint to cream #F5EDD8
        data[i]     = 245;
        data[i + 1] = 237;
        data[i + 2] = 216;
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = URL.createObjectURL(blob);
  });
}

// ── Canvas symbol drawing ─────────────────────────────────
// SVG-on-canvas for symbols that don't have image files
export function drawSVGSymbol(
  ctx: CanvasRenderingContext2D,
  name: string,
  W: number,
  H: number
): void {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.strokeStyle = "#F5EDD8";
  ctx.fillStyle   = "#F5EDD8";
  ctx.lineCap     = "round";
  ctx.lineJoin    = "round";

  if (name === "adinkrahene") {
    const cx = W / 2;
    const cy = H / 2;
    const radii = [W * 0.42, W * 0.28, W * 0.14];
    radii.forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = W * 0.045;
      ctx.stroke();
    });
  }

  if (name === "nyansapo") {
    const cx = W / 2;
    const cy = H / 2;
    const s  = W * 0.38;
    ctx.lineWidth = W * 0.055;
    // Outer oval
    ctx.beginPath();
    ctx.ellipse(cx, cy, s, s * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Inner loops
    const r = s * 0.38;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.55, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.55, r * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    // Cross bars
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.55, cy);
    ctx.lineTo(cx + r * 0.55, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 0.3);
    ctx.lineTo(cx, cy + r * 0.3);
    ctx.stroke();
  }

  ctx.restore();
}

// ── Canvas draw symbol from data ──────────────────────────
export function drawSymbolOnCanvas(
  ctx: CanvasRenderingContext2D,
  sym: AdinkraSymbol,
  W: number,
  H: number,
  alpha: number,
  imgCache: Record<string, HTMLImageElement>
): void {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.globalAlpha = alpha;

  if (sym.imgType === "b64" && sym.src) {
    const img = imgCache[sym.src];
    if (!img) { ctx.restore(); return; }
    const pad  = W * 0.06;
    const avW  = W - pad * 2;
    const avH  = H - pad * 2;
    const sc   = Math.min(avW / img.naturalWidth, avH / img.naturalHeight);
    const dw   = img.naturalWidth  * sc;
    const dh   = img.naturalHeight * sc;
    const dx   = (W - dw) / 2;
    const dy   = (H - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  } else if (sym.imgType === "svg" && sym.svgDraw) {
    drawSVGSymbol(ctx, sym.svgDraw, W, H);
  }

  ctx.restore();
}

// ── Easing ───────────────────────────────────────────────
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Format date ──────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

// ── Reading time ─────────────────────────────────────────
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}