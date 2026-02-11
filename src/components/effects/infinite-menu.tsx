"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import TextBottomReveal from "../ui/text-bottom-reveal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Item {
  link: string;
}

interface InfiniteImageGridProps {
  items: Item[];
  title?: string;
  cellSize?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW INFINITE WORKS
// ─────────────────────────────────────────────────────────────────────────────
//
// The container is one div. GSAP Draggable moves it freely. Inside are N rows,
// each with M cells. All positions are stored as GSAP transforms.
//
// Every drag tick, recycle() computes the WORLD position of each row/cell:
//
//   worldY(row)  = gsap.getProperty(rowEl,  "y") + gsap.getProperty(container, "y")
//   worldX(cell) = gsap.getProperty(cellEl, "x") + gsap.getProperty(rowEl, "x")
//                + gsap.getProperty(container, "x")
//
// If a row/cell is fully outside the viewport (+/- one step buffer):
//   → teleport it to the opposite side by ± (total * step)
//   → update img.src using its new logical position
//
// No array shuffling. No threshold drift. Works at any drag distance forever.
//
// NATURAL IMAGE SIZE:
//   Each cell is a fixed-size "slot" (cellSize × cellSize).
//   The <img> inside has max-width/max-height = cellSize and width/height = auto.
//   So a portrait image is tall-and-narrow, a landscape image is wide-and-short.
//   Images are never cropped or stretched.
// ─────────────────────────────────────────────────────────────────────────────

const InfiniteImageGrid: React.FC<InfiniteImageGridProps> = ({
  items,
  title = "Gallery",
  cellSize: cellSizeProp = 250,
  gap: gapProp = 250,
  bgColor = "#f5f5f0",
  textColor = "#111111",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  // All mutable grid state in one ref — never triggers re-renders
  const G = useRef({
    step: 0,
    totalRows: 0,
    totalCols: 0,
    rows: [] as Array<{ el: HTMLDivElement; logRow: number }>,
    cells: [] as Array<{
      rowRef: { el: HTMLDivElement; logRow: number };
      el: HTMLDivElement;
      img: HTMLImageElement;
      logCol: number;
    }>,
  });

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const getSrc = useCallback(
    (logRow: number, logCol: number) =>
      items[mod(logRow * G.current.totalCols + logCol, items.length)].link,
    [items]
  );

  // ─── Recycle (called every drag tick) ────────────────────────────────────
  const recycle = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { step, totalRows, totalCols, rows, cells } = G.current;
    if (!rows.length) return;

    const cx = gsap.getProperty(container, "x") as number;
    const cy = gsap.getProperty(container, "y") as number;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const buf = step; // one-step buffer so images never flash into view mid-swap

    // ── Recycle rows vertically ───────────────────────────────────────────
    for (const row of rows) {
      const ry = gsap.getProperty(row.el, "y") as number;
      const worldY = ry + cy;

      if (worldY + step < -buf) {
        // Entirely above viewport → jump to bottom
        row.logRow += totalRows;
        gsap.set(row.el, { y: ry + totalRows * step });
        // Refresh every cell in this row
        for (const c of cells) {
          if (c.rowRef === row) {
            c.img.src = getSrc(row.logRow, c.logCol);
          }
        }
      } else if (worldY - step > vh + buf) {
        // Entirely below viewport → jump to top
        row.logRow -= totalRows;
        gsap.set(row.el, { y: ry - totalRows * step });
        for (const c of cells) {
          if (c.rowRef === row) {
            c.img.src = getSrc(row.logRow, c.logCol);
          }
        }
      }
    }

    // ── Recycle cells horizontally ────────────────────────────────────────
    // worldX must include the row's own x (stagger offset) + container x
    for (const c of cells) {
      const rx = gsap.getProperty(c.rowRef.el, "x") as number;
      const cx2 = gsap.getProperty(c.el, "x") as number;
      const worldX = cx2 + rx + cx;

      if (worldX + step < -buf) {
        // Entirely left of viewport → jump to right
        c.logCol += totalCols;
        gsap.set(c.el, { x: cx2 + totalCols * step });
        c.img.src = getSrc(c.rowRef.logRow, c.logCol);
      } else if (worldX - step > vw + buf) {
        // Entirely right of viewport → jump to left
        c.logCol -= totalCols;
        gsap.set(c.el, { x: cx2 - totalCols * step });
        c.img.src = getSrc(c.rowRef.logRow, c.logCol);
      }
    }
  }, [getSrc]);

  // ─── Build grid ───────────────────────────────────────────────────────────
  const buildGrid = useCallback(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const container = containerRef.current;
    const mask = maskRef.current;
    if (!container || !mask) return;

    draggableRef.current?.[0]?.kill();
    container.innerHTML = "";

    const step = cellSizeProp + gapProp;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // +4 total (2 on each side) ensures no gap is ever visible during fast drags
    const totalCols = Math.ceil(vw / step) + 4;
    const totalRows = Math.ceil(vh / step) + 4;

    G.current.step = step;
    G.current.totalCols = totalCols;
    G.current.totalRows = totalRows;
    G.current.rows = [];
    G.current.cells = [];

    // Center the grid so the middle cell lands in the middle of the viewport
    // originX/Y = position of the top-left cell's slot
    const originX = vw / 2 - Math.floor(totalCols / 2) * step - cellSizeProp / 2;
    const originY = vh / 2 - Math.floor(totalRows / 2) * step - cellSizeProp / 2;

    for (let r = 0; r < totalRows; r++) {
      const logRow = r - Math.floor(totalRows / 2);

      const rowEl = document.createElement("div");
      rowEl.style.cssText = "position:absolute;top:0;left:0;will-change:transform;";

      // Odd rows are nudged right by half a step for a staggered brick layout
      const rowStagger = r % 2 === 1 ? step * 0.5 : 0;
      gsap.set(rowEl, {
        x: originX + rowStagger,
        y: originY + r * step,
      });

      const rowRef = { el: rowEl, logRow };
      G.current.rows.push(rowRef);

      for (let c = 0; c < totalCols; c++) {
        const logCol = c - Math.floor(totalCols / 2);

        const cellEl = document.createElement("div");
        // Cell is a fixed slot; the image inside renders at its natural size
        cellEl.style.cssText = `
          position: absolute; top: 0; left: 0;
          width: ${cellSizeProp}px; height: ${cellSizeProp}px;
          display: flex; align-items: center; justify-content: center;
          will-change: transform;
          cursor: inherit;
          overflow: hidden;
          border-radius: 10px;
        `;
        gsap.set(cellEl, { x: c * step, y: 0 });

        const imgEl = document.createElement("img");
        imgEl.src = getSrc(logRow, logCol);
        imgEl.alt = "";
        imgEl.draggable = false;
        imgEl.loading = "eager";

        // Natural size: width/height are auto, capped at the slot size.
        // The image renders at its true aspect ratio — no cropping, no stretching.
        imgEl.style.cssText = `
          display: block;
          width: auto;
          height: auto;
          max-width: ${cellSizeProp}px;
          max-height: ${cellSizeProp}px;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        `;

        // Hover: subtle scale
        cellEl.addEventListener("mouseenter", () =>
          gsap.to(imgEl, { scale: 1.07, duration: 0.32, ease: "power2.out" })
        );
        cellEl.addEventListener("mouseleave", () =>
          gsap.to(imgEl, { scale: 1, duration: 0.32, ease: "power2.inOut" })
        );

        cellEl.appendChild(imgEl);
        rowEl.appendChild(cellEl);

        G.current.cells.push({ rowRef, el: cellEl, img: imgEl, logCol });
      }

      container.appendChild(rowEl);
    }

    gsap.set(container, { x: 0, y: 0 });

    draggableRef.current = Draggable.create(container, {
      trigger: mask,
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      dragResistance: 0,
      onDrag: recycle,
      onThrowUpdate: recycle,
    });
  }, [items, cellSizeProp, gapProp, getSrc, recycle]);

  useEffect(() => {
    buildGrid();
    const onResize = () => buildGrid();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      draggableRef.current?.[0]?.kill();
    };
  }, [buildGrid]);

  // ─── Title ────────────────────────────────────────────────────────────────
  const words = title.trim().split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  const oneWord = words.length === 1;

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-aktura), 'Arial Black', 'Helvetica Neue', Impact, sans-serif",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    lineHeight: 0.92,
    color: textColor,
    textAlign: "center",
    whiteSpace: "nowrap",
    userSelect: "none",
    margin: 0,
  };

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: bgColor,
        margin: 0,
        padding: 0,
        backgroundColor: "#fffff0",
      }}
    >
      {/* z0 ── heading behind the grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <TextBottomReveal delay={0.5}>
          <h1
            className="ig-title-desktop"
            style={{ ...headingStyle, display: "none", fontSize: "clamp(80px,14vw,500px)" }}
          >
            {title}
          </h1>
        </TextBottomReveal>

        <div
          className="ig-title-mobile"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h1 style={{ ...headingStyle, fontSize: "clamp(72px,22vw,300px)" }}>
            {oneWord ? title : line1}
          </h1>
          {!oneWord && line2 && (
            <h1 style={{ ...headingStyle, fontSize: "clamp(72px,22vw,300px)" }}>
              {line2}
            </h1>
          )}
        </div>
      </div>

      {/* z1 ── grid */}
      <section
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}
      >
        <div ref={containerRef} style={{ position: "absolute", willChange: "transform" }} />
      </section>

      {/* z2 ── drag surface */}
      <div
        ref={maskRef}
        style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "grab", touchAction: "none" }}
      />

      <style>{`
        @media (min-width: 768px) {
          .ig-title-desktop { display: block !important; }
          .ig-title-mobile  { display: none  !important; }
        }
      `}</style>
    </main>
  );
};

export default InfiniteImageGrid;