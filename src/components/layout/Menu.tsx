"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "/images/home.png" },
  { label: "Work", href: "/work", icon: "/images/work.jpg" },
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
  const router = useRouter()

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY < lastScrollY.current) {
        // Scrolling up — show immediately, cancel any pending hide
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
          scrollTimeoutRef.current = null
        }
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        // Scrolling down — close menu immediately, hide nav after debounce
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

    // Mark that this navigation came from the floating menu,
    // so the Home page can skip its LoadingPage on internal transitions.
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("navFromFloatingMenu", "1")
    }

    // Run a smooth slide-up transition; start navigation as the blank page reaches the top
    pageAnimation(() => {
      router.push(href)
    })
  }

  return (
    <div
      className={`
        fixed left-4 right-4 md:left-1/2 md:-translate-x-1/2
        bottom-4 md:bottom-6 md:w-[700px] z-[100]
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"}
      `}
    >
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl md:rounded-[20px] overflow-hidden shadow-2xl shadow-black/40">

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
          <nav className="flex flex-col gap-4 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-5 group"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl bg-neutral-800 flex-shrink-0">
                  <Image src={item.icon} alt={item.label} width={80} height={80} className="rounded-xl" />
                </div>
                <div className="overflow-hidden h-8">
                  {/* Hover flip effect: two identical labels stacked, slide up on hover */}
                  <div
                    className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1/2"
                    aria-hidden="true"
                  >
                    <span className="text-lg font-semibold text-neutral-100 leading-8">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-neutral-100 leading-8">
                      {item.label}
                    </span>
                  </div>
                  {/* Accessible label hidden visually but available to screen readers */}
                  <span className="sr-only">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-4">
            <div className="h-px bg-neutral-800 w-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-4 py-2 pl-2 pr-4 md:pr-8">

          {/* Left: Avatar + Name + Marquee */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Avatar placeholder */}
            <div className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-xl bg-neutral-100 flex-shrink-0">
              <Image src="/images/avatar.png" alt="Avatar" width={80} height={80} className="rounded-xl" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className="md:text-lg font-semibold text-neutral-100 uppercase tracking-wide leading-none"
              >
                Ayush Kumar
              </Link>

              {/* Marquee strip */}
              <div className="relative h-4 overflow-hidden w-[200px] sm:w-[420px]">
                {/* Left fade mask */}
                <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
                {/* Right fade mask */}
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee whitespace-nowrap">
                  {/* Two copies for seamless looping — keep in sync */}
                  {[0, 1].map((i) => (
                    <p
                      key={i}
                      className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase pr-2"
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
            className="text-neutral-100 hover:text-neutral-400 transition-colors duration-200 flex-shrink-0"
          >
            {open ? (
              /* X icon when open */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
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
              /* Hamburger icon when closed */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
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

// ─── Page Transition Animation ───────────────────────────────────────────────
// Full-viewport blank "page" slides up from the bottom with premium custom ease.
// As it reaches the top, we navigate, then gently fade the overlay away so
// the new page feels like it *is* that blank page.
let pageEaseRegistered = false

const pageAnimation = (onNavigate?: () => void) => {
  if (typeof document === "undefined") return onNavigate?.()

  if (!pageEaseRegistered) {
    gsap.registerPlugin(CustomEase)
    CustomEase.create(
      "pageTransitionEase",
      "M0,0 C0.15,0 0,1 1,1" // slow start, fast middle, soft ease-out
    )
    pageEaseRegistered = true
  }

  const overlay = document.createElement("div")
  overlay.style.position = "fixed"
  overlay.style.inset = "0"
  overlay.style.background = "rgb(10,10,11)" // nearly black, matches portfolio vibe
  overlay.style.zIndex = "9999"
  overlay.style.transform = "translateY(100%)"
  overlay.style.pointerEvents = "none"

  document.body.appendChild(overlay)

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove()
    },
  })

  // Slide the blank page up
  tl.fromTo(
    overlay,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 0.8,
      ease: "pageTransitionEase",
      onComplete: () => {
        // Start navigation right when the blank page settles at the top
        onNavigate?.()
      },
    }
  )

  // Then softly fade it away to reveal the new page underneath
  tl.to(
    overlay,
    {
      opacity: 0,
      duration: 0.4,
      ease: "power1.out",
    },
    "-=0.15" // slight overlap for smoothness
  )
}