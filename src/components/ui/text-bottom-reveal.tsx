"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Props {
  children: React.ReactNode;
  delay?: number;
  animateonScroll?: boolean;
}

export default function TextBottomReveal({
  children,
  delay = 0,
  animateonScroll = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitText[]>([]);
  const lineRef = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      lineRef.current = [];

      let elements: Element[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        const split = new SplitText(element as HTMLElement, {
          type: "lines",
          linesClass: "line++",
        });

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element as HTMLElement);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          (element as HTMLElement).style.textIndent = "0px";
        }

        lineRef.current.push(...(split.lines as HTMLElement[]));
      });

      gsap.set(lineRef.current, { yPercent: 100 });

      const animateLines = {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        delay: delay,
      };

      if (animateonScroll) {
        gsap.to(lineRef.current, {
          ...animateLines,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        });
      } else {
        gsap.to(lineRef.current, animateLines);
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === containerRef.current) {
            trigger.kill();
          }
        });
        splitRef.current.forEach((split) => split.revert());
      };
    },
    {
      scope: containerRef,
      dependencies: [delay, animateonScroll],
    }
  );

  // ✅ SIMPLEST SOLUTION: Always use wrapper, no cloneElement needed
  return (
    <div ref={containerRef} data-copy-wrapper={React.Children.count(children) > 1 ? "true" : undefined}>
      {children}
    </div>
  );
}