"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  className?: string;
  respectMotionPreference?: boolean;
}

export default function TextCycle({
  children,
  scrub = 1,
  start = "top 60%",
  end = "top 20%",
  className = "",
  respectMotionPreference = true,
}: Props) {
  const containerRef = useRef<HTMLUListElement>(null);
  const originalTextsRef = useRef<Map<HTMLElement, string>>(new Map());

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      if (
        respectMotionPreference &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) return;

      // Get all li elements
      const items = Array.from(container.querySelectorAll("li"));
      if (!items.length) {
        console.warn("TextCycle: No <li> elements found");
        return;
      }

      // Store original texts before modifying
      originalTextsRef.current.clear();
      items.forEach((item) => {
        originalTextsRef.current.set(item, item.textContent || "");
      });

      const tl = gsap.timeline({ paused: true });

      items.forEach((item) => {
        // Get original text
        const text = originalTextsRef.current.get(item) || "";
        const chars = text.split("");
        
        // Clear and rebuild with char wrappers
        item.innerHTML = "";
        
        chars.forEach((char) => {
          const wrapper = document.createElement("span");
          wrapper.className = "char-wrapper";
          
          const original = document.createElement("div");
          original.className = "originalText";
          original.textContent = char === " " ? "\u00A0" : char;
          
          const clone = document.createElement("div");
          clone.className = "cloneText";
          clone.textContent = char === " " ? "\u00A0" : char;
          
          wrapper.appendChild(original);
          wrapper.appendChild(clone);
          item.appendChild(wrapper);
        });

        // Get all char wrappers and shuffle them for random animation
        const wrappers = Array.from(item.querySelectorAll(".char-wrapper"));
        const shuffled = gsap.utils.shuffle([...wrappers]);
        
        shuffled.forEach((wrapper) => {
          const original = wrapper.querySelector(".originalText");
          const clone = wrapper.querySelector(".cloneText");
          
          if (original && clone) {
            gsap.set(clone, { yPercent: -100 });
            
            // Add to timeline with random stagger
            tl.to([original, clone], {
              yPercent: "+=100",
              ease: "none",
              duration: 1,
            }, Math.random() * 0.5);
          }
        });
      });

      // Create ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: container,
        start,
        end,
        scrub,
        animation: tl,
        invalidateOnRefresh: true,
        markers: false,
      });

      // Force refresh
      ScrollTrigger.refresh();

      return () => {
        st.kill();
        tl.kill();
        
        // Restore original text on cleanup
        items.forEach((item) => {
          const originalText = originalTextsRef.current.get(item);
          if (originalText !== undefined) {
            item.innerHTML = originalText;
          }
        });
        originalTextsRef.current.clear();
      };
    },
    { 
      scope: containerRef,
      dependencies: [children, scrub, start, end],
      revertOnUpdate: true
    }
  );

  return (
    <ul 
      ref={containerRef} 
      className={`text-cycle-container ${className}`}
      style={{ textAlign: 'center' }}
    >
      {children}
    </ul>
  );
}
