"use client";

import { useEffect, useState, useRef } from "react";

interface LoadingPageProps {
  /** Called when the counter reaches 100 and the exit animation finishes */
  onComplete?: () => void;
  /** How long the full 0→100 count takes in ms. Default: 2200 */
  duration?: number;
}

export default function LoadingPage({
  onComplete,
  duration = 2200,
}: LoadingPageProps) {
  const [count, setCount]       = useState(0);
  const [leaving, setLeaving]   = useState(false);
  const [hidden, setHidden]     = useState(false);
  const rafRef                  = useRef<number | null>(null);
  const startRef                = useRef<number | null>(null);

  useEffect(() => {
    // Animate count from 0 → 100 over `duration` ms using requestAnimationFrame
    // Uses an easeInOutQuart curve so it starts slow, rushes, then eases in at 100
    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed  = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeInOutQuart(progress);
      const current  = Math.floor(eased * 100);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        // Brief pause at 100 then trigger exit
        setTimeout(() => {
          setLeaving(true);
          // Hide entirely after CSS transition finishes (600ms)
          setTimeout(() => {
            setHidden(true);
            onComplete?.();
          }, 650);
        }, 320);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] bg-[#fffff0] flex flex-col
        transition-opacity duration-[600ms] ease-in-out
        ${leaving ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* Top-left label */}
      <div className="absolute top-8 left-8 md:top-10 md:left-12">
        <span
          className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#444] font-light"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Loading
        </span>
      </div>

      {/* Centre — giant counter */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative select-none">

          {/* Main counter number */}
          <span
            className="relative text-[#0A0A0A]"
            style={{
              fontFamily:  "Apple Mono, SF Mono, 'SF Mono Regular', Consolas",
              fontSize:    "20px",
              fontWeight:  700,
              lineHeight:  1,
              letterSpacing: "-0.04em",
              userSelect:  "none",
            }}
          >
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}