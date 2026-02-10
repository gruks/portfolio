"use client";

import { useState, useEffect } from "react";
import WorkCard from "../../components/ui/work-card";
import Footer from "../../components/layout/Footer";
import TopStatusBar from "@/src/components/layout/TopStatusBar";
import ReactLenis from "lenis/react";
import LoadingPage from "@/src/components/ui/LoadingPage";
import TextAnimation from "@/src/components/ui/text-animation";

export default function WorkPage() {
  const [loaded, setLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check if this is a page refresh (not a navigation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isRefresh = navigation?.type === 'reload';
    
    if (isRefresh) {
      setShowLoading(true);
    } else {
      setLoaded(true);
    }
  }, []);

  const works = [
    {
      title: "Jazmin Wong",
      category: "Portfolio",
      year: "2025",
      href: "/work/jazmin-wong",
      cover: "/images/cover/jazmin-wong/jazmin-wong-icon.png",
      icon: "/images/work/jazmin-wong/jazmin-wong-icon.png",
      video: "/videos/jazmin-wong-preview-compressed.mp4",
      tags: [
        "Art Direction",
        "Voice & Tone",
        "UI",
        "UX",
        "Next.js",
        "Tailwind CSS",
        "GSAP",
        "Motion",
        "Matter.js",
        "Lenis",
        "Vercel",
      ],
    },
    {
      title: "Trackstack",
      category: "Product",
      year: "2025",
      href: "/work/trackstack",
      cover: "/images/work/trackstack/cover.jpg",
      icon: "/images/work/trackstack/trackstack-icon.png",
      video: "/videos/trackstack-preview-compressed.mp4",
      tags: [
        "Art Direction",
        "Naming & Copywriting",
        "Voice & Tone",
        "Brand Design",
        "Strategy",
        "UX",
        "UI",
        "Web Design",
        "Product Design",
        "Media Production",
      ],
    },
    {
      title: "Kick & Bass",
      category: "Services",
      year: "2024",
      href: "/work/kick-bass",
      cover: "/images/work/kick-bass/cover.png",
      icon: "/images/work/kick-bass/kick-bass-icon.png",
      video: "/videos/kickbass-preview-compressed.mp4",
      tags: [
        "Art Direction",
        "Web Design",
        "Responsive Design",
        "Next.js",
        "Tailwind CSS",
        "GSAP",
        "Motion",
        "Lenis",
        "Contentful",
        "Vercel",
        "Shopify API",
      ],
    },
    {
      title: "Socialstats",
      category: "Product",
      year: "2024",
      href: "/work/socialstats",
      cover: "/images/work/socialstats/cover.png",
      icon: "/images/work/socialstats/socialstats-icon.png",
      video: "/videos/socialstats-preview-compressed.mp4",
      tags: [
        "Research & Insights",
        "Naming & Copywriting",
        "Competitive Study",
        "Voice & Tone",
        "Workshops",
        "Strategy",
        "UX",
        "UI",
        "Web Design",
        "Responsive Design",
      ],
    },
    {
      title: "Westend",
      category: "Portfolio",
      year: "2024",
      href: "/work/westend",
      cover: "/images/other/westend.jpg",
      icon: "/images/work/westend/westend-icon.png",
      video: "/videos/westend-preview-compressed.mp4",
      tags: [
        "Art Direction",
        "Web Design",
        "Responsive Design",
        "Next.js",
        "Tailwind CSS",
        "GSAP",
        "Lenis",
        "Contentful",
        "Vercel",
      ],
    },
    {
      title: "DELIVRD",
      category: "Showcase",
      year: "2023",
      href: "/work/delivrd",
      cover: "/images/work/jazmin-wong/jazmin-wong-icon.png",
      icon: "/images/work/delivrd/delivrd-icon.png",
      video: "/videos/delivrd-preview-compressed.mp4",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "GSAP",
        "Lenis",
        "Supabase",
        "Vercel",
        "Web Design",
        "Responsive Design",
      ],
    },
  ];

  return (
    <>
      {showLoading && !loaded && (
        <LoadingPage
          duration={2200}
          onComplete={() => setLoaded(true)}
        />
      )}

      {loaded && (
        <>
          <ReactLenis root />
          <TopStatusBar/>
          <main className="bg-neutral-100">
            {/* Header Section */}
            <div className="px-4 lg:px-8 pt-[200px] md:pt-[clamp(128px,12vw,500px)]">
              <div className="overflow-hidden mb-3 lg:mb-5">
                <TextAnimation>
                <p className="text-[clamp(14px,1.2vw,24px)] font-medium text-neutral-700">
                  [2022-2025]
                </p>
                </TextAnimation>
              </div>
              <div className="overflow-hidden">
                <TextAnimation>
                <h1 className="text-[clamp(48px,7.5vw,200px)] font-bold uppercase leading-[0.8] tracking-tight text-black">
                  Selected Work
                </h1>
                </TextAnimation>
              </div>
            </div>

            {/* Work Grid */}
            <div className="px-2 lg:px-4 py-4 lg:py-6">
              <div className="work-grid-container w-full bg-neutral-200 rounded-2xl lg:rounded-[20px] p-3 lg:p-4">
                <ul className="work-grid grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 list-none">
                  {works.map((work, index) => (
                    <WorkCard key={index} {...work} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
