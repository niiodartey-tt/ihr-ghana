"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SYMBOLS = [
  {
    name: "Adinkrahene",
    meaning: "King of Adinkra — Leadership & Authority",
    src: "/symbols/adinkrahene.png",
    desc: "Three perfect circles — one within the other, no beginning, no end, no edge where authority surrenders itself. It is said that this single symbol inspired the design of all the others; the first mark from which an entire visual language was born. Leadership in the Akan tradition is not a title seized or inherited. It is a gravity — patient, inevitable — that draws all things into alignment around it.",
    colors: ["#C8651A", "#A83E10", "#3A7D6E", "#2D6459", "#C8651A", "#A83E10", "#3A7D6E", "#2D6459"],
  },
  {
    name: "Nea Onnim",
    meaning: "Knowledge & Life-Long Learning",
    src: "/symbols/nea-onnim.png",
    desc: "He who does not know can know from learning — a declaration that ignorance is never a destination, only a point of departure. The symbol stands as a permanent indictment of arrogance and a permanent invitation to humility. In every organisation, the most dangerous person is not the one who does not know — it is the one who does not know that they do not know.",
    colors: ["#A83E10", "#C8651A", "#2D6459", "#3A7D6E", "#A83E10", "#C8651A", "#2D6459", "#3A7D6E"],
  },
  {
    name: "Agyindawuru",
    meaning: "Alertness & Dutifulness",
    src: "/symbols/agyindawuru.png",
    desc: "The gong that calls the community to attention — not in alarm, but in readiness. To be alert is not to be anxious; it is to be present, fully and deliberately, in every moment that demands your best. The organisations that endure are not those that react fastest — they are those that never stopped paying attention.",
    colors: ["#2D6459", "#3A7D6E", "#A83E10", "#C8651A", "#2D6459", "#3A7D6E", "#A83E10", "#C8651A"],
  },
];

const HOLD_MS = 6500;
const FADE_MS = 2000;
const CIRC    = 2 * Math.PI * 204;
const PAT     = [
  "a","c","b","d","a","c","b","d",
  "c","b","d","a","c","b","d","a",
  "b","d","a","c","b","d","a","c",
  "d","a","c","b","d","a","c","b",
  "a","c","b","d","a","c","b","d",
];

function ease(t: number) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}

const EASE = [0.76, 0, 0.24, 1] as const;

export default function AdinkraHero() {
  const cvARef   = useRef<HTMLCanvasElement>(null);
  const cvBRef   = useRef<HTMLCanvasElement>(null);
  const arcRef   = useRef<SVGCircleElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgCache = useRef<Record<string, HTMLImageElement>>({});
  const stateRef = useRef({
    currentIdx:  0,
    isMorphing:  false,
    arcRAF:      0,
    morphRAF:    0,
    arcStart:    0,
    cycleActive: true,
  });

  const [currentIdx, setCurrentIdx]   = useState(0);
  const [hoveredDot, setHoveredDot]   = useState<number | null>(null);
  const [textVisible, setTextVisible] = useState(true);

  const DPR = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  // ── Size canvases ──
  function sizeCanvases() {
    const wrap = wrapRef.current;
    const cvA  = cvARef.current;
    const cvB  = cvBRef.current;
    if (!wrap || !cvA || !cvB) return;
    const W = wrap.offsetWidth;
    const H = wrap.offsetHeight;
    [cvA, cvB].forEach(cv => {
      cv.width  = W * DPR;
      cv.height = H * DPR;
      cv.getContext("2d")?.setTransform(DPR, 0, 0, DPR, 0, 0);
    });
  }

  // ── Load image ──
  function loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      if (imgCache.current[src]) { res(imgCache.current[src]); return; }
      const img = new Image();
      img.onload  = () => { imgCache.current[src] = img; res(img); };
      img.onerror = rej;
      img.src = src;
    });
  }

  // ── Draw symbol on canvas ──
  function drawSymbol(
    ctx: CanvasRenderingContext2D,
    src: string,
    alpha: number
  ) {
    const cvA = cvARef.current;
    if (!cvA) return;
    const W   = cvA.width  / DPR;
    const H   = cvA.height / DPR;
    const img = imgCache.current[src];
    ctx.clearRect(0, 0, W, H);
    if (!img) return;

    const pad = W * 0.08;
    const avW = W - pad * 2;
    const avH = H - pad * 2;
    const sc  = Math.min(avW / img.naturalWidth, avH / img.naturalHeight);
    const dw  = img.naturalWidth  * sc;
    const dh  = img.naturalHeight * sc;
    const dx  = (W - dw) / 2;
    const dy  = (H - dh) / 2;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "#1A3330";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // ── Update grid colours ──
  function updateGrid(idx: number) {
    const sym = SYMBOLS[idx];
    const map: Record<string, string> = {
      a: sym.colors[0],
      b: sym.colors[1],
      c: sym.colors[2],
      d: sym.colors[3],
    };
    const cells = document.querySelectorAll<HTMLDivElement>(".adinkra-cell");
    cells.forEach((cell, i) => {
      cell.style.background = map[PAT[i]];
    });
  }

  // ── Arc animation ──
  function runArc(duration: number, onDone: () => void) {
    const s = stateRef.current;
    s.arcStart = 0;
    cancelAnimationFrame(s.arcRAF);
    const arc = arcRef.current;
    if (!arc) return;
    function step(now: number) {
      if (!s.arcStart) s.arcStart = now;
      const t = Math.min((now - s.arcStart) / duration, 1);
      arc!.style.strokeDashoffset = String(CIRC * (1 - t));
      if (t < 1) s.arcRAF = requestAnimationFrame(step);
      else onDone();
    }
    s.arcRAF = requestAnimationFrame(step);
  }

  // ── Crossfade ──
  function crossFade(fromSrc: string, toSrc: string, onDone: () => void) {
    const s   = stateRef.current;
    const cvA = cvARef.current;
    const cvB = cvBRef.current;
    if (!cvA || !cvB) return;
    const ctxA = cvA.getContext("2d")!;
    const ctxB = cvB.getContext("2d")!;

    s.isMorphing     = true;
    cvA.style.zIndex = "3";
    cvB.style.zIndex = "2";
    drawSymbol(ctxA, fromSrc, 1);
    drawSymbol(ctxB, toSrc,   1);

    let start = 0;
    cancelAnimationFrame(s.morphRAF);

    function step(now: number) {
      if (!start) start = now;
      if (!cvA || !cvB) return;
      const raw = Math.min((now - start) / FADE_MS, 1);
      cvA.style.opacity = String(1 - ease(raw));
      if (raw < 1) {
        s.morphRAF = requestAnimationFrame(step);
      } else {
        drawSymbol(ctxA, toSrc, 1);
        cvA.style.opacity = "1";
        cvA.style.zIndex  = "3";
        const W = cvA.width / DPR;
        const H = cvA.height / DPR;
        ctxB.clearRect(0, 0, W, H);
        s.isMorphing = false;
        onDone();
      }
    }
    s.morphRAF = requestAnimationFrame(step);
  }

  // ── Start cycle ──
  function startCycle(idx: number) {
    const s   = stateRef.current;
    const arc = arcRef.current;
    if (!s.cycleActive) return;
    if (arc) arc.style.strokeDashoffset = String(CIRC);

    s.currentIdx = idx;
    setCurrentIdx(idx);
    updateGrid(idx);
    setTextVisible(false);
    setTimeout(() => setTextVisible(true), 300);

    runArc(HOLD_MS, () => {
      if (!s.cycleActive) return;
      const next = (idx + 1) % SYMBOLS.length;
      setTextVisible(false);
      updateGrid(next);
      setTimeout(() => {
        crossFade(SYMBOLS[idx].src, SYMBOLS[next].src, () => {
          if (!s.cycleActive) return;
          setCurrentIdx(next);
          setTextVisible(true);
          startCycle(next);
        });
      }, 300);
    });
  }

  // ── Jump to symbol ──
  function jumpTo(idx: number) {
    const s = stateRef.current;
    if (idx === s.currentIdx || s.isMorphing) return;
    cancelAnimationFrame(s.arcRAF);
    cancelAnimationFrame(s.morphRAF);
    const from = SYMBOLS[s.currentIdx].src;
    s.currentIdx = idx;
    setTextVisible(false);
    updateGrid(idx);
    setTimeout(() => {
      crossFade(from, SYMBOLS[idx].src, () => {
        setCurrentIdx(idx);
        setTextVisible(true);
        startCycle(idx);
      });
    }, 300);
  }

  // ── Init ──
  useEffect(() => {
    const s = stateRef.current;
    s.cycleActive = true;

    async function init() {
      sizeCanvases();
      await Promise.all(SYMBOLS.map(sym => loadImg(sym.src).catch(() => null)));
      const cvA = cvARef.current;
      if (!cvA) return;
      const ctxA = cvA.getContext("2d")!;
      drawSymbol(ctxA, SYMBOLS[0].src, 1);
      updateGrid(0);
      startCycle(0);
    }

    init();

    const handleResize = () => {
      sizeCanvases();
      const cvA = cvARef.current;
      if (!cvA) return;
      drawSymbol(cvA.getContext("2d")!, SYMBOLS[stateRef.current.currentIdx].src, 1);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      s.cycleActive = false;
      cancelAnimationFrame(s.arcRAF);
      cancelAnimationFrame(s.morphRAF);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sym = SYMBOLS[currentIdx];

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
    >

      {/* Checkerboard grid */}
      <div
        className="absolute inset-0 grid z-0"
        style={{
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows:    "repeat(5, 1fr)",
        }}
      >
        {PAT.map((_, i) => (
          <div
            key={i}
            className="adinkra-cell"
            style={{ transition: "background 1.6s ease" }}
          />
        ))}
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity:      0.4,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 48%, transparent 30%, rgba(26,20,16,0.78) 100%)",
        }}
      />

      {/* MAIN GRID — 2 rows */}
      <div
        style={{
          position:         "relative",
          zIndex:           10,
          display:          "grid",
          gridTemplateRows: "1fr 1fr",
          height:           "100%",
          padding:          "clamp(2rem, 4vw, 4rem)",
        }}
      >

        {/* ── TOP HALF — Welcome statement ── */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            alignItems:     "center",
            textAlign:      "center",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            style={{
              fontFamily:    "var(--font-cormorant)",
              fontSize:      "clamp(3.5rem, 5.5vw, 5.5rem)",
              fontWeight:    700,
              color:         "#F5EDD8",
              lineHeight:    1.0,
              letterSpacing: "-0.01em",
              marginBottom:  "1rem",
            }}
          >
            Welcome to IHR
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
            style={{
              fontFamily:   "var(--font-cormorant)",
              fontStyle:    "italic",
              fontSize:     "clamp(1rem, 1.5vw, 1.5rem)",
              fontWeight:   400,
              color:        "#F5EDD8",
              lineHeight:   1.2,
              marginBottom: "1.2rem",
            }}
          >
            Bespoke Business & HR Advisory Services
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
            style={{
              fontSize:   "clamp(0.82rem, 1.1vw, 1rem)",
              fontWeight: 300,
              color:      "#F5EDD8",
              lineHeight: 1.85,
              maxWidth:   "600px",
            }}
          >
            At IHR Ghana, we stand at the intersection of people and performance —
            delivering integrated, candid, and transformative Human Resource and
            Business Advisory solutions. We work alongside organisations to build
            cultures that inspire, systems that perform, and leaders who endure.
            Whether you are scaling, restructuring, or simply seeking to unlock the
            full potential of your people, we bring the expertise, the candour,
            and the commitment to make it happen.
          </motion.p>
        </div>

        {/* ── BOTTOM HALF — Adinkra in right side ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Bottom LEFT — negative space */}
          <div />

          {/* Bottom RIGHT — symbol left, text right */}
            <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.7 }}
            style={{
                display:       "flex",
                alignItems:    "center",
                gap:           "clamp(1.5rem, 3vw, 3rem)",
                padding:       "clamp(1rem, 2vw, 2rem)",
                height:        "100%",
            }}
            >
            {/* Symbol canvas */}
            <div
                ref={wrapRef}
                style={{
                position:   "relative",
                flexShrink: 0,
                width:      "clamp(180px, 22vmin, 280px)",
                height:     "clamp(180px, 22vmin, 280px)",
                }}
            >
                {/* Progress arc */}
                <svg
                viewBox="0 0 416 416"
                style={{
                    position:  "absolute",
                    inset:     "-8px",
                    width:     "calc(100% + 16px)",
                    height:    "calc(100% + 16px)",
                    transform: "rotate(-90deg)",
                    zIndex:    5,
                }}
                >
                <circle cx="208" cy="208" r="204"
                    fill="none" stroke="rgba(245,237,216,0.06)" strokeWidth="2"/>
                <circle ref={arcRef} cx="208" cy="208" r="204"
                    fill="none" stroke="#C8651A" strokeWidth="2"
                    strokeLinecap="round" opacity="0.7"
                    style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC }}
                />
                </svg>

                {/* Rotating rings */}
                <div style={{
                position:     "absolute",
                inset:        "-22px",
                borderRadius: "50%",
                border:       "1px solid rgba(245,237,216,0.07)",
                animation:    "spin 52s linear infinite",
                }}>
                <div style={{
                    position:     "absolute",
                    top:          "-4px",
                    left:         "50%",
                    transform:    "translateX(-50%)",
                    width:        "6px",
                    height:       "6px",
                    borderRadius: "50%",
                    background:   "#C8651A",
                    boxShadow:    "0 0 12px #C8651A, 0 0 24px rgba(200,101,26,0.45)",
                }}/>
                </div>
                <div style={{
                position:     "absolute",
                inset:        "-11px",
                borderRadius: "50%",
                border:       "1.5px solid rgba(245,237,216,0.11)",
                animation:    "spin 30s linear infinite reverse",
                }}/>

                {/* Glow */}
                <div style={{
                position:     "absolute",
                inset:        "-15%",
                borderRadius: "50%",
                background:   "radial-gradient(circle, rgba(200,101,26,0.12) 0%, transparent 68%)",
                zIndex:       0,
                }}/>

                {/* Canvas layers */}
                <canvas ref={cvARef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", zIndex: 2,
                }}/>
                <canvas ref={cvBRef} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", zIndex: 1,
                }}/>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>

                {/* Eyebrow */}
                <p style={{
                fontFamily:    "var(--font-cormorant)",
                fontSize:      "0.72rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "#F5EDD8",
                fontWeight:    600,
                marginBottom:  "0.4rem",
                opacity:       textVisible ? 0.7 : 0,
                transition:    "opacity 0.6s",
                }}>
                Adinkra Symbol
                </p>

                {/* Symbol name */}
                <p style={{
                fontFamily:   "var(--font-cormorant)",
                fontSize:     "clamp(1.6rem, 2.5vw, 2.8rem)",
                fontWeight:   700,
                color:        "#1A3330",
                lineHeight:   1.0,
                marginBottom: "0.6rem",
                textShadow:   "0 2px 20px rgba(0,0,0,0.4)",
                opacity:      textVisible ? 1 : 0,
                transform:    textVisible ? "translateY(0)" : "translateY(8px)",
                transition:   "opacity 0.6s 0.07s, transform 0.6s 0.07s",
                }}>
                {sym.name}
                </p>

                {/* Amber divider */}
                <div style={{
                height:       "2px",
                background:   "#C8651A",
                width:        textVisible ? "40px" : "0px",
                marginBottom: "0.8rem",
                transition:   "width 0.7s 0.1s ease",
                }}/>

                {/* Meaning */}
                <p style={{
                fontFamily:   "var(--font-cormorant)",
                fontStyle:    "italic",
                fontSize:     "clamp(0.95rem, 1.3vw, 1.2rem)",
                color:        "#F5EDD8",
                lineHeight:   1.4,
                marginBottom: "0.8rem",
                opacity:      textVisible ? 1 : 0,
                transform:    textVisible ? "translateY(0)" : "translateY(8px)",
                transition:   "opacity 0.6s 0.12s, transform 0.6s 0.12s",
                }}>
                {sym.meaning}
                </p>

                {/* Description */}
                <p style={{
                fontSize:     "clamp(0.75rem, 0.95vw, 0.88rem)",
                lineHeight:   1.8,
                color:        "#F5EDD8",
                fontWeight:   300,
                marginBottom: "1.2rem",
                opacity:      textVisible ? 0.85 : 0,
                transform:    textVisible ? "translateY(0)" : "translateY(8px)",
                transition:   "opacity 0.6s 0.18s, transform 0.6s 0.18s",
                }}>
                {sym.desc}
                </p>

                {/* Dots */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                {SYMBOLS.map((_, i) => (
                    <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    onMouseEnter={() => setHoveredDot(i)}
                    onMouseLeave={() => setHoveredDot(null)}
                    aria-label={`Symbol ${i + 1}`}
                    style={{
                        width:        hoveredDot === i || i === currentIdx ? "8px" : "5px",
                        height:       hoveredDot === i || i === currentIdx ? "8px" : "5px",
                        borderRadius: "50%",
                        background:   i === currentIdx ? "#C8651A" : "rgba(245,237,216,0.3)",
                        border:       "none",
                        cursor:       "pointer",
                        transition:   "all 0.35s ease",
                    }}
                    />
                ))}
                </div>
            </div>
            </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </motion.section>
  );
}