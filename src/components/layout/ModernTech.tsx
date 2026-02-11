"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Shuffle from "../ui/shuffle-text"
import TextCycle from "../ui/shuffle-text"

gsap.registerPlugin(ScrollTrigger)

export default function ModernTech() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const letters = containerRef.current.querySelectorAll(".letter")

    // Random starting positions
    gsap.set(letters, {
      yPercent: () => gsap.utils.random(12, 60)
    })

    // Scroll-based shuffle animation
    gsap.to(letters, {
      yPercent: 0,
      ease: "none",
      stagger: {
        each: 0.02,
        from: "random" // random shuffle order
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "top 25%",
        scrub: true,       // scroll controls animation
        invalidateOnRefresh: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="bg-[#fffff0] min-h-[100vh] flex items-center justify-center py-24">
      <div ref={containerRef} className="scroll-trigger-container">
        <TextCycle 
          scrub={1}
          start="top bottom"
          end="top 10%"
          className="your-wrapper-classes-here"
        >
          <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.9] overflow-hidden flex">
            MODERN
          </li>
          <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.9] overflow-hidden flex">
            TECH STACK
          </li>
        </TextCycle>
      </div>
    </section>
  )
}
