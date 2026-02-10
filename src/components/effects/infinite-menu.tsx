"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Item {
  link: string;
}

interface InfiniteImageGridProps {
  items: Item[];
  /** Heading text rendered behind everything. Default: "Gallery" */
  title?: string;
  /** Cell slot size in px (image renders at 60% of this due to 20% padding). Default: 50 */
  cellSize?: number;
  /** Gap between cell slots in px. Default: 150 */
  gap?: number;
  /** Page background color. Default: "#f5f5f0" */
  bgColor?: string;
  /** Heading text color. Default: "#111111" */
  textColor?: string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function moveArrayIndex<T>(array: T[], oldIndex: number, newIndex: number): T[] {
  if (newIndex >= array.length) newIndex = array.length - 1;
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

// ─── Component ────────────────────────────────────────────────────────────────

const InfiniteImageGrid: React.FC<InfiniteImageGridProps> = ({
  items,
  title     = "Gallery",
  cellSize: cellSizeProp = 250,
  gap: gapProp           = 250,
  bgColor   = "#f5f5f0",
  textColor = "#111111",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef      = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  const s = useRef({
    rowArray:         [] as HTMLDivElement[],
    imgRep:           [] as HTMLDivElement[][],
    rows:             [] as HTMLDivElement[],
    imgMidIndex:      0,
    rowMidIndex:      0,
    boxWidth:         cellSizeProp,
    boxHeight:        cellSizeProp,
    gutter:           gapProp,
    horizSpacing:     0,
    vertSpacing:      0,
    horizOffset:      0,
    vertOffset:       0,
    winMidX:          0,
    winMidY:          0,
    lastCenteredElem: null as HTMLDivElement | null,
    rowNum:           0,
    imgNum:           0,
  });

  // ─── Tile count ───────────────────────────────────────────────────────────

  const getGridDimensions = useCallback(() => {
    const spacing = cellSizeProp + gapProp;
    return {
      cols: Math.ceil(window.innerWidth  / spacing) + 7,
      rows: 2 + 6, // 2 visible rows + buffer for infinite recycling
    };
  }, [cellSizeProp, gapProp]);

  // ─── Infinite recycling ───────────────────────────────────────────────────

  const recycleByPosition = useCallback(() => {
    const st = s.current;
    const container = containerRef.current;
    if (!container) return;

    const x = gsap.getProperty(container, "x") as number;
    const y = gsap.getProperty(container, "y") as number;

    const limitX = st.horizSpacing;
    const limitY = st.vertSpacing;

    // Vertical recycling
    while (y > limitY) {
      const row = st.rowArray.pop()!;
      const first = st.rowArray[0];
      const firstY = gsap.getProperty(first, "y") as number;

      gsap.set(row, { y: firstY - st.vertSpacing });
      st.rowArray.unshift(row);
      moveArrayIndex(st.imgRep, st.imgRep.length - 1, 0);
    }

    while (y < -limitY) {
      const row = st.rowArray.shift()!;
      const last = st.rowArray[st.rowArray.length - 1];
      const lastY = gsap.getProperty(last, "y") as number;

      gsap.set(row, { y: lastY + st.vertSpacing });
      st.rowArray.push(row);
      moveArrayIndex(st.imgRep, 0, st.imgRep.length - 1);
    }

    // Horizontal recycling
    st.imgRep.forEach((row) => {
      while ((gsap.getProperty(row[0], "x") as number) + x > limitX) {
        const cell = row.pop()!;
        const firstX = gsap.getProperty(row[0], "x") as number;
        gsap.set(cell, { x: firstX - st.horizSpacing });
        row.unshift(cell);
      }

      while ((gsap.getProperty(row[row.length - 1], "x") as number) + x < -limitX) {
        const cell = row.shift()!;
        const lastX = gsap.getProperty(row[row.length - 1], "x") as number;
        gsap.set(cell, { x: lastX + st.horizSpacing });
        row.push(cell);
      }
    });
  }, []);

  // ─── Resize ───────────────────────────────────────────────────────────────

  const resize = useCallback(() => {
    const st = s.current;
    if (!containerRef.current) return;

    st.winMidX      = window.innerWidth  / 2;
    st.winMidY      = window.innerHeight / 2;
    st.boxWidth     = cellSizeProp;
    st.boxHeight    = cellSizeProp;
    st.gutter       = gapProp;
    st.horizSpacing = st.boxWidth  + st.gutter;
    st.vertSpacing  = st.boxHeight + st.gutter;
    st.horizOffset  = -(st.imgMidIndex * st.horizSpacing + st.boxWidth  / 2) + st.winMidX;
    st.vertOffset   = -(st.rowMidIndex * st.vertSpacing  + st.boxHeight / 2) + st.winMidY;

    gsap.set(containerRef.current, { x: 0, y: 0 });

    st.rowArray.forEach((row, i) => {
      gsap.set(row, {
        attr: { "data-offset": i % 2 === 0 ? "false" : "true" },
        x: i % 2 === 0 ? st.horizOffset : st.horizOffset - st.boxWidth / 2,
        y: i * st.vertSpacing + st.vertOffset,
      });
      gsap.set(row.querySelectorAll<HTMLElement>(".ig-cell"), {
        x: (index: number) => index * st.horizSpacing,
      });
    });
  }, [cellSizeProp, gapProp]);

  // ─── Init ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const container = containerRef.current;
    const mask      = maskRef.current;
    if (!container || !mask) return;

    const st = s.current;
    container.innerHTML = "";
    st.rowArray.length  = 0;
    st.imgRep.length    = 0;

    const { cols: imgNum, rows: rowNum } = getGridDimensions();
    st.imgNum      = imgNum;
    st.rowNum      = rowNum;
    st.imgMidIndex = Math.floor(imgNum / 2);
    st.rowMidIndex = Math.floor(rowNum / 2);

    for (let y = 0; y < rowNum; y++) {
      const row          = document.createElement("div");
      row.className      = "ig-row";
      row.style.position = "absolute";

      for (let x = 0; x < imgNum; x++) {
        const cell         = document.createElement("div");
        cell.className     = "ig-cell";
        /*
         * The cell occupies the full slot (cellSizeProp × cellSizeProp).
         * 20% padding on every side means the image area is 60% of the slot
         * in each dimension — same composition, just smaller, never cropped.
         * box-sizing: border-box ensures padding is included in the declared size.
         */
        cell.style.cssText = `
          position: absolute; top: 0; left: 0;
          width: ${cellSizeProp}px; height: ${cellSizeProp}px;
          padding: 20%; box-sizing: border-box;
          display: flex; align-items: center; justify-content: center;
          user-select: none; -webkit-user-drag: none;
        `;

        const img     = document.createElement("img");
        img.src       = items[(y * imgNum + x) % items.length].link;
        img.alt       = "";
        img.draggable = false;
        /*
         * object-fit: contain → image is scaled to fit entirely within its box.
         * The natural aspect ratio and full composition are always preserved.
         * No cropping. No color/filter changes.
         */
        img.style.cssText = `
          width: 100%; height: 100%;
          object-fit: contain; object-position: center;
          display: block; pointer-events: none; user-select: none;
        `;

        // Hover: scale only, no opacity or filter changes
        cell.addEventListener("mouseenter", () =>
          gsap.to(cell, { scale: 1.15, duration: 0.28, ease: "power2.out"   })
        );
        cell.addEventListener("mouseleave", () =>
          gsap.to(cell, { scale: 1,    duration: 0.28, ease: "power2.inOut" })
        );

        cell.appendChild(img);
        row.appendChild(cell);
      }

      container.appendChild(row);
      st.imgRep.push(Array.from(row.querySelectorAll<HTMLDivElement>(".ig-cell")));
    }

    st.rows = Array.from(container.querySelectorAll<HTMLDivElement>(".ig-row"));
    st.rowArray.push(...st.rows);
    st.lastCenteredElem =
      container.querySelectorAll<HTMLDivElement>(".ig-cell")[
        st.rowMidIndex * imgNum + st.imgMidIndex
      ] ?? null;

    gsap.set(container, { willChange: "transform" });
    gsap.set("body",    { margin: 0, overflow: "hidden" });

    resize();

    draggableRef.current?.[0]?.kill();
    draggableRef.current = Draggable.create(container, {
      trigger:         mask,
      dragResistance:  0.15,
      resistance:      250,
      inertia:         true,
      cursor:          "grab",
      activeCursor:    "grabbing",
      onDrag:          recycleByPosition,
      onThrowUpdate:   recycleByPosition,
    });

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      draggableRef.current?.[0]?.kill();
      container.innerHTML = "";
    };
  }, [items, cellSizeProp, gapProp, getGridDimensions, resize, recycleByPosition]);

  // ─── Title split for mobile ───────────────────────────────────────────────

  const words      = title.trim().split(" ");
  const mid        = Math.ceil(words.length / 2);
  const line1      = words.slice(0, mid).join(" ");
  const line2      = words.slice(mid).join(" ");
  const singleWord = words.length === 1;

  const headingStyle: React.CSSProperties = {
    fontFamily:    "var(--font-aktura, 'Arial Black', 'Helvetica Neue', Impact, sans-serif)",
    fontWeight:    900,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    lineHeight:    0.92,
    color:         textColor,
    textAlign:     "center",
    whiteSpace:    "nowrap",
    userSelect:    "none",
    willChange:    "transform",
    margin:        0,
    overflow:      "hidden",
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  /*
   * Layer order (bottom → top):
   *   z-index 0  →  big text          (bottommost — sits behind the grid)
   *   z-index 1  →  draggable grid    (floats above the text)
   *   z-index 2  →  invisible mask    (captures drag/touch input on top of everything)
   */

  return (
    <main
      style={{
        position:   "relative",
        width:      "100vw",
        height:     "100dvh",
        overflow:   "hidden",
        background: bgColor,
        margin:     0,
        padding:    0,
      }}
    >
      {/* ── z0: big heading — behind everything ── */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          zIndex:         0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
        }}
      >
        {/* Desktop — single line */}
        <h1
          className="ig-title-desktop"
          style={{
            ...headingStyle,
            display:  "none",  /* overridden by media query */
            fontSize: "clamp(80px, 14vw, 500px)",
          }}
        >
          {title}
        </h1>

        {/* Mobile — stacked lines */}
        <div
          className="ig-title-mobile"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h1 style={{ ...headingStyle, fontSize: "clamp(72px, 22vw, 300px)" }}>
            {singleWord ? title : line1}
          </h1>
          {!singleWord && line2 && (
            <h1 style={{ ...headingStyle, fontSize: "clamp(72px, 22vw, 300px)" }}>
              {line2}
            </h1>
          )}
        </div>
      </div>

      {/* ── z1: draggable image grid ── */}
      <section
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          zIndex:        1,
          overflow:      "hidden",
          pointerEvents: "none",   /* Draggable uses the mask above, not this */
        }}
      >
        <div
          ref={containerRef}
          id="ig-container"
          style={{ position: "absolute", willChange: "transform" }}
        />
      </section>

      {/* ── z2: invisible full-screen drag surface ── */}
      <div
        ref={maskRef}
        style={{
          position:    "absolute",
          inset:       0,
          zIndex:      2,
          cursor:      "grab",
          touchAction: "none",
        }}
      />

      {/* Responsive: single-line heading on md+ */}
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