"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Close menu when route changes
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < lastScrollY.current) {
        // scrolling up
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        setVisible(true)
      } else {
        // scrolling down - add delay before hiding
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setVisible(false)
          setOpen(false)
        }, 50)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`
        fixed left-4 right-4 md:left-1/2 md:-translate-x-1/2 
        bottom-4 md:bottom-6 md:w-[700px] z-100
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"}
      `}
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl md:rounded-[20px] overflow-hidden">

        {/* Expandable Menu */}
        <div
          className={`
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            overflow-hidden
          `}
        >
          <nav className="flex flex-col gap-4 p-4">
            {["Home", "Work", "Lab"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="flex items-center gap-5 group"
              >
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl bg-neutral-800" />
                <div className="overflow-hidden h-8">
                  <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
                    <span className="text-lg font-semibold text-neutral-100">{item}</span>
                    <span className="text-lg font-semibold text-neutral-100">{item}</span>
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <div className="h-px bg-neutral-800 w-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between py-2 pl-2 pr-4 md:pr-8">

          {/* Left Profile */}
          <div className="flex items-center gap-4 md:gap-5">
            <div className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-xl bg-neutral-100" />

            <div className="flex flex-col gap-1.5">
              <Link href="/" className="md:text-lg font-semibold text-neutral-100 uppercase">
                Ayush Kumar
              </Link>

              <div className="relative h-4 overflow-hidden w-[220px] sm:w-[420px]">
                <div className="absolute left-0 h-full w-10 bg-gradient-to-r from-neutral-900 to-transparent z-10" />
                <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

                <div className="flex animate-marquee whitespace-nowrap">
                  <p className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase pr-2">
                    Creative Design Engineer · Awwwards Stalker · Product Builder · Next.js Enthusiast ·
                  </p>
                  <p className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase pr-2">
                    Creative Design Engineer · Awwwards Stalker · Product Builder · Next.js Enthusiast ·
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-neutral-100 hover:text-neutral-400 transition-all"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  )
}
