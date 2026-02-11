// components/WorkCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type WorkCardProps = {
  title: string;
  category: string;
  year: string;
  href: string;
  cover: string;
  icon: string;
  video: string;
  tags: string[];
  index?: number; // for stagger delay
};

export default function WorkCard({
  title,
  category,
  year,
  href,
  cover,
  icon,
  video,
  tags,
  index = 0,
}: WorkCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use IntersectionObserver so items already in view fire immediately,
    // and items below the fold animate in as they enter — no scroll required
    // for above-the-fold cards (rootMargin pushes the trigger zone up).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.06,         // fire as soon as 6% is visible
        rootMargin: "0px 0px 0px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // stagger: first two cards (already visible) use 1s delay,
  // later cards get a slight stagger for a cascading feel
  const staggerDelay = index < 2
    ? '0.3s'
    : `${1000 + (index - 2) * 200}ms`;

  return (
    <>
      <style>{`
        @keyframes cardAppear {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes imageZoom {
          0%   { transform: scale(1.12); }
          100% { transform: scale(1.05); }
        }

        .card-visible {
          animation: cardAppear 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .card-hidden {
          opacity: 0;
          transform: translateY(28px) scale(0.96);
        }

        .card-image-zoom {
          transform: scale(1.12);
        }

        .card-visible .card-image-zoom {
          animation: imageZoom 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <li
        ref={ref}
        className={`w-full lg:w-1/2 ${visible ? "card-visible" : "card-hidden"}`}
        style={visible ? { animationDelay: staggerDelay } : undefined}
      >
        <Link
          href={href}
          className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative"
        >
          {/* MEDIA */}
          <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">

            {/* Blur overlay */}
            <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Video */}
            <video
              src={video}
              muted
              loop
              playsInline
              className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/12
                w-[clamp(300px,65%,600px)]
                rounded-lg object-cover z-20
                [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)]
                group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)]
                group-hover:-translate-y-6/12
                transition-all duration-700
                ease-[cubic-bezier(0.87,0,0.13,1)]
              "
            />

            {/* Cover Image — zooms in on card entrance */}
            <Image
              src={cover}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover card-image-zoom group-hover:scale-100 transition-transform duration-500"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">

            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2 lg:gap-3">
                <Image
                  src={icon}
                  alt={title}
                  width={32}
                  height={32}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                />
                <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide">
                  {title}
                </p>
              </div>

              <div className="flex gap-3 lg:gap-5">
                <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                  {category}
                </p>
                <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                  {year}
                </p>
              </div>
            </div>

            {/* TAG MARQUEE */}
            <div className="flex justify-center items-center h-4 overflow-hidden relative w-full">

              <div className="absolute left-0 h-full w-8 lg:w-10 bg-gradient-to-r from-neutral-900/95 to-transparent z-10" />
              <div className="absolute right-0 h-full w-8 lg:w-10 bg-gradient-to-l from-neutral-900/95 to-transparent z-10" />

              <div className="flex overflow-hidden">
                {[0, 1].map(i => (
                  <p
                    key={i}
                    className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5 animate-marquee"
                  >
                    {tags.map((t, idx) => (
                      <span key={idx}>{t}, </span>
                    ))}
                  </p>
                ))}
              </div>

            </div>
          </div>
        </Link>
      </li>
    </>
  );
}