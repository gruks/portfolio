"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextAnimationProps {
  children: React.ReactNode;
  animateonScroll?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  blockColor?: string;
}

export default function TextAnimation({
  children,
  animateonScroll = true,
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  blockColor = "#000000",
}: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitTextRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const blocks = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitTextRef.current = [];
      lines.current = [];
      blocks.current = [];

      let elements: Element[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        // ✅ Fixed: Correct SplitText syntax
        const split = new SplitText(element as HTMLElement, {
          type: "lines",
          linesClass: "block-line++",
        });

        splitTextRef.current.push(split);

        (split.lines as Element[]).forEach((line) => {
          const htmlLine = line as HTMLElement;

          const wrapper = document.createElement("div");
          wrapper.className = "block-line-wrapper";
          htmlLine.parentNode?.insertBefore(wrapper, htmlLine);
          wrapper.appendChild(htmlLine);

          const block = document.createElement("div");
          block.className = "block-revealer";
          block.style.backgroundColor = blockColor;
          wrapper.appendChild(block);

          lines.current.push(htmlLine);
          blocks.current.push(block);
        });
      });

      gsap.set(lines.current, { opacity: 0 });
      gsap.set(blocks.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // ✅ Fixed: Animate individual elements with correct delay
      const animate = (
        block: HTMLDivElement,
        index: number,
        line: HTMLElement
      ) => {
        const timeline = gsap.timeline({
          delay: delay + index * stagger,  // ✅ Fixed calculation
        });

        // ✅ Animate specific block/line, not all
        timeline.to(block, {
          scaleX: 1,
          duration: duration,
          ease: "power4.inOut",
        });
        timeline.to(line, { opacity: 1 });  
        timeline.to(block, {
          transformOrigin: "right center",
          scaleX: 0,
          duration: duration,
          ease: "power4.inOut",
        });

        return timeline;
      };

      if (animateonScroll) {
        blocks.current.forEach((block, index) => {
          const tl = animate(block, index, lines.current[index]);
          tl.pause();

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              tl.play();
            },
          });
        });
      } else {
        blocks.current.forEach((block, index) => {
          animate(block, index, lines.current[index]);
        });
      }

      return () => {
        // ✅ Clean up ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === containerRef.current) {
            trigger.kill();
          }
        });

        splitTextRef.current.forEach((split) => split?.revert());

        const wrappers =
          containerRef.current?.querySelectorAll(".block-line-wrapper");

        wrappers?.forEach((wrapper) => {
          if (wrapper.parentNode && wrapper.firstChild) {
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateonScroll, delay, duration, stagger, blockColor],
    }
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}