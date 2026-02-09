"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CharacterShuffleProps {
  children: React.ReactNode;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  className?: string;
}

export default function CharacterShuffle({
  children,
  scrub = 3, // ✅ Even slower for ultra-smooth
  start = "top 80%",
  end = "top 20%",
  className = "",
}: CharacterShuffleProps) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const splitTextRef = useRef<SplitText[]>([]);
  const charsRef = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitTextRef.current = [];
      charsRef.current = [];

      const items = Array.from(containerRef.current.children);

      items.forEach((item) => {
        const split = new SplitText(item as HTMLElement, {
          type: "chars",
          charsClass: "letter relative inline-block",
        });

        splitTextRef.current.push(split);

        (split.chars as HTMLElement[]).forEach((char) => {
          const duplicate = document.createElement("span");
          duplicate.className = "absolute bottom-full left-0 pointer-events-none";
          duplicate.textContent = char.textContent;

          const originalText = char.textContent;
          char.textContent = "";

          const originalSpan = document.createElement("span");
          originalSpan.textContent = originalText;

          char.appendChild(originalSpan);
          char.appendChild(duplicate);

          charsRef.current.push(char);
        });
      });

      // ✅ Create array of random positions but sort them for smoother flow
      const randomPositions = charsRef.current.map(() => 
        gsap.utils.random(30, 70, 1)
      );

      charsRef.current.forEach((char, index) => {
        gsap.set(char, {
          yPercent: randomPositions[index],
          willChange: "transform",
          force3D: true, // ✅ Force GPU acceleration
        });
      });

      // ✅ Create master timeline for better control
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          end: end,
          scrub: scrub,
          invalidateOnRefresh: true,
          anticipatePin: 1, // ✅ Smoother pinning if used
        },
      });

      // ✅ Animate with wave-like stagger
      masterTimeline.to(charsRef.current, {
        yPercent: 100,
        ease: "none",
        stagger: {
          amount: 1.2,
          from: "start",
          ease: "sine.inOut", // ✅ Wave-like smooth stagger
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === containerRef.current) {
            trigger.kill();
          }
        });

        splitTextRef.current.forEach((split) => split.revert());

        charsRef.current.forEach((char) => {
          const originalText = char.querySelector("span:first-child")?.textContent;
          if (originalText) {
            char.textContent = originalText;
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [scrub, start, end],
    }
  );

  return (
    <ul ref={containerRef} className={className}>
      {children}
    </ul>
  );
}