"use client";

import { useState, useEffect } from "react";
import WorkCard from "../../components/ui/work-card";
import Footer from "../../components/layout/Footer";
import TopStatusBar from "@/src/components/layout/TopStatusBar";
import ReactLenis from "lenis/react";
import LoadingPage from "@/src/components/ui/LoadingPage";
import TextAnimation from "@/src/components/ui/text-animation";
import TextBottomReveal from "@/src/components/ui/text-bottom-reveal";

export default function WorkPage() {
  const [loaded, setLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // If we navigated internally (via Menu or any Link), skip the loading page
    // and let the view transition handle the UX.
    if (typeof window !== "undefined" && (window as any).isInternalNav) {
      setLoaded(true)
      return
    }

    // Otherwise, show the loading page (initial open / refresh / direct URL)
    setShowLoading(true)
  }, [])

  const works = [
    {
      title: "Personal Portfolio",
      category: "Portfolio",
      year: "2025",
      href: "https://github.com/gruks/portfolio",
      cover: "/images/work/portfolio/cover.png",
      icon: "/images/work/portfolio/portfolio-icon.png",
      video: "/videos/portfolio-preview-compressed.mp4",
      tags: [
        "Next.js",
        "GSAP",
        "Tailwind CSS",
        "Lenis",
        "Motion Design",
        "Scroll Animations",
        "Cinematic UI",
        "Interactive UX",
        "Creative Development",
        "WebGL (optional)",
        "Performance Optimization",
        "Portfolio Architecture",
      ],
    },
    {
      title: "Necter",
      category: "E-Commerce Platform",
      year: "2025",
      href: "https://github.com/gruks/E-Commerce",
      cover: "/images/work/necter/cover.png",
      icon: "/images/work/necter/necter-icon.png",
      video: "/videos/necter-preview-compressed.mp4",
      tags: [
        "Next.js",
        "GSAP",
        "E-Commerce",
        "Full Stack",
        "UI",
        "UX",
        "Motion Design",
        "Payment Gateway",
        "Database Systems",
        "Performance Optimization",
      ],
    },
    {
      title: "Career Guru",
      category: "AI Platform",
      year: "2025",
      href: "https://github.com/gruks/career_guruv2",
      cover: "/images/work/career-guru/cover.png",
      icon: "/images/work/career-guru/career-guru-icon.png",
      video: "/videos/career-guru-preview-compressed.mp4",
      tags: [
        "Next.js",
        "GSAP",
        "Artificial Intelligence",
        "Machine Learning",
        "AI Systems",
        "UX",
        "UI",
        "Motion UI",
        "NLP",
        "Career Intelligence",
        "Automation",
      ],
    },
    {
      title: "POS",
      category: "Enterprise System",
      year: "2024",
      href: "https://github.com/gruks/POS",
      cover: "/images/work/pos/cover.png",
      icon: "/images/work/pos/pos-icon.png",
      video: "/videos/pos-preview-compressed.mp4",
      tags: [
        "JavaFX",
        "Enterprise Software",
        "POS System",
        "Inventory Engine",
        "Billing Automation",
        "System Architecture",
        "UX Engineering",
      ],
    },
    {
      title: "Eventyay",
      category: "Open Source Platform",
      year: "2024",
      href: "https://github.com/gruks/eventyay",
      cover: "/images/work/eventyay/cover.png",
      icon: "/images/work/eventyay/eventyay-icon.png",
      video: "/videos/eventyay-preview-compressed.mp4",
      tags: [
        "Open Source",
        "FOSSASIA",
        "Next.js",
        "API Systems",
        "Community Platform",
        "Scalable Architecture",
        "UX Systems",
        "Collaboration",
      ],
    },
    {
      title: "Dementia Guard",
      category: "Healthcare AI",
      year: "2025",
      href: "https://github.com/jatingarg850/dementiaguard",
      cover: "/images/work/dementiaguard/cover.png",
      icon: "/images/work/dementiaguard/dementiaguard-icon.png",
      video: "/videos/dementiaguard-preview-compressed.mp4",
      tags: [
        "Flutter",
        "Flask",
        "PyTorch",
        "AI Detection",
        "Healthcare Technology",
        "Deep Learning",
        "Medical AI",
        "Mobile App",
        "ML Pipelines",
        "Data Intelligence",
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
          <TopStatusBar />
          <main className="color-bg">
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
                <TextBottomReveal delay={0} animateonScroll={true}>
                  <h1 className="text-[clamp(48px,7.5vw,200px)] font-bold uppercase leading-[0.8] tracking-tight text-black">
                    Selected Work
                  </h1>
                </TextBottomReveal>
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
