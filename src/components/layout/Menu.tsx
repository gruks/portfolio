"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "/images/home.png" },
  { label: "Work", href: "/work", icon: "/images/work.png" },
  { label: "Lab", href: "/lab", icon: "/images/lab.png" },
]

const MARQUEE_TEXT =
  "Creative Design Engineer · Awwwards Stalker · Product Builder · Next.js Enthusiast ·"

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const router = useTransitionRouter()

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    ;(window as any).isInternalNav = true
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < lastScrollY.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
          scrollTimeoutRef.current = null
        }
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setOpen(false)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setVisible(false)
        }, 150)
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

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    router.push(href)
  }

  return (
    <div
      className={`
        fixed left-3 right-3 md:left-1/2 md:-translate-x-1/2
        bottom-3 md:bottom-6 md:w-[700px] z-[100]
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"}
      `}
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl md:rounded-[20px] overflow-hidden shadow-2xl shadow-black/40">

        {/* Expandable Menu */}
        <div
          id="floating-nav-menu"
          role="region"
          aria-label="Navigation menu"
          className={`
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            overflow-hidden
          `}
        >
          <nav className="flex flex-col gap-3 md:gap-4 p-3 md:p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 md:gap-5 group"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <div className="w-12 h-12 md:w-[80px] md:h-[80px] rounded-lg md:rounded-xl bg-neutral-800 flex-shrink-0">
                  <Image src={item.icon} alt={item.label} width={80} height={80} className="rounded-lg md:rounded-xl w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden h-7 md:h-8">
                  <div
                    className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1/2"
                    aria-hidden="true"
                  >
                    <span className="text-base md:text-lg font-semibold text-neutral-100 leading-7 md:leading-8">
                      {item.label}
                    </span>
                    <span className="text-base md:text-lg font-semibold text-neutral-100 leading-7 md:leading-8">
                      {item.label}
                    </span>
                  </div>
                  <span className="sr-only">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="px-3 md:px-4 pb-3 md:pb-4">
            <div className="h-px bg-neutral-800 w-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between gap-2 md:gap-4 py-1.5 md:py-2 pl-1.5 md:pl-2 pr-3 md:pr-8">

          {/* Left: Avatar + Name + Marquee */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Avatar */}
            <div className="h-12 w-12 md:h-[80px] md:w-[80px] rounded-lg md:rounded-xl bg-neutral-100 flex-shrink-0">
              <Image src="/images/avatar.png" alt="Avatar" width={80} height={80} className="rounded-lg md:rounded-xl w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className="text-sm md:text-lg font-semibold text-neutral-100 uppercase tracking-wide leading-none"
              >
                Ayush Kumar
              </Link>

              {/* Marquee strip */}
              <div className="relative h-4 overflow-hidden w-[160px] sm:w-[420px]">
                <div className="absolute left-0 top-0 h-full w-6 md:w-10 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-6 md:w-10 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee whitespace-nowrap">
                  {[0, 1].map((i) => (
                    <p
                      key={i}
                      className="text-[9px] md:text-xs tracking-widest text-neutral-300 uppercase pr-2"
                      aria-hidden={i === 1 ? "true" : undefined}
                    >
                      {MARQUEE_TEXT}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hamburger / Close toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="floating-nav-menu"
            className="text-neutral-100 hover:text-neutral-400 transition-colors duration-200 flex-shrink-0 p-1"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l14 14" />
                <path d="M20 6L6 20" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 6h18" />
                <path d="M4 12h18" />
                <path d="M4 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}