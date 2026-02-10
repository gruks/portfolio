'use client';

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from 'gsap';

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Close menu when route changes
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastScrollY.current) {
        // scrolling up
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        setVisible(true);
      } else {
        // scrolling down - add delay before hiding
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setVisible(false);
          setOpen(false);
        }, 50);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false); // Close menu immediately
    
    // GSAP-powered page transition matching your original pseudo-element style
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
      }
    });

    // Old page exit: scale down + translateY(-100px) + opacity fade (like ::view-transition-old(root))
    tl.to('html', {
      scale: 0.9,
      yPercent: -10, // -100px relative
      opacity: 0.05,
      ease: "cubic-bezier(0.76,0,0.24,1)",
      duration: 1
    });

    // New page entry: translateY(100%) to 0 (like ::view-transition-new(root))
    tl.fromTo('html', 
      {
        yPercent: 100,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        ease: "cubic-bezier(0.76,0,0.24,1)",
        duration: 1
      }, "-=0.8" // Overlap for smoothness
    );
  };

  return (
    <div
      className={`
        fixed left-4 right-4 md:left-1/2 md:-translate-x-1/2 
        bottom-4 md:bottom-6 md:w-[700px] z-[100]
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"}
      `}
    >
      <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl md:rounded-[20px] shadow-2xl shadow-black/30 overflow-hidden">
        {/* Expandable Menu */}
        <div
          className={`
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            overflow-hidden
          `}
        >
          <nav className="flex flex-col gap-4 p-6">
            {["Home", "Work", "Lab"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="flex items-center gap-5 group relative hover:bg-neutral-800/50 p-3 rounded-xl transition-all duration-300"
                onClick={(e) => handleNavClick(e, `/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`)}
              >
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700 group-hover:scale-105 transition-transform duration-300 shadow-lg" />
                <div className="overflow-hidden h-10 md:h-12">
                  <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2">
                    <span className="text-lg md:text-xl font-bold text-neutral-100 leading-tight">{item}</span>
                    <span className="text-lg md:text-xl font-bold text-neutral-400 leading-tight">{item}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-4">
            <div className="h-px bg-gradient-to-r from-neutral-800/50 via-white/20 to-neutral-800/50 w-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between py-3 pl-4 pr-6 md:pr-8">
          {/* Left Profile */}
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <div className="h-[52px] w-[52px] md:h-[68px] md:w-[68px] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 shadow-lg ring-2 ring-neutral-800/50" />

            <div className="flex flex-col gap-1">
              <Link 
                href="/" 
                className="text-lg md:text-xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-200 bg-clip-text text-transparent hover:scale-[1.02] transition-transform duration-200"
                onClick={(e) => handleNavClick(e, '/')}
              >
                Ayush Kumar
              </Link>

              <div className="relative h-5 md:h-6 overflow-hidden w-[200px] sm:w-[380px] md:w-[450px]">
                <div className="absolute left-0 h-full w-12 bg-gradient-to-r from-neutral-900 to-transparent z-10" />
                <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

                <div className="flex animate-marquee whitespace-nowrap">
                  <p className="text-[10px] md:text-xs tracking-widest text-neutral-400 uppercase pr-4">
                    Creative Design Engineer · Awwwards Stalker · Product Builder · Next.js Enthusiast · 
                  </p>
                  <p className="text-[10px] md:text-xs tracking-widest text-neutral-400 uppercase pr-4">
                    Creative Design Engineer · Awwwards Stalker · Product Builder · Next.js Enthusiast · 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-3 rounded-2xl bg-neutral-800/50 hover:bg-neutral-700/70 transition-all duration-300 hover:scale-105 text-neutral-200 hover:text-white shadow-lg"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 8h16" />
              <path d="M4 14h16" />
              <path d="M4 20h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
