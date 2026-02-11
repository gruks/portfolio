"use client";

import { useState, useEffect } from "react";
import InfiniteMenu from "@/src/components/effects/infinite-menu";
import ReactLenis from "lenis/react";
import LoadingPage from "@/src/components/ui/LoadingPage";
import TopStatusBar from "@/src/components/layout/TopStatusBar";

export default function LabPage() {
  const [loaded, setLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // If we navigated internally (via Menu or any Link), skip the loading page
    // and let the view transition handle the UX.
    if (typeof window !== "undefined" && (window as any).isInternalNav) {
      setLoaded(true);
      return;
    }

    // Otherwise, show the loading page (initial open / refresh / direct URL)
    setShowLoading(true);
  }, []);

  const items = [
    { link: "/images/gallery/img14.jpeg" },
    { link: "/images/gallery/img6.jpg" },
    { link: "/images/gallery/img17.png" },
    { link: "/images/gallery/img11.jpeg" },
    { link: "/images/gallery/img7.jpg" },
    { link: "/images/gallery/img5.jpg" },
    { link: "/images/gallery/img13.png" },
    { link: "/images/gallery/img7.jpg" },
    { link: "/images/gallery/img4.jpg" },
    { link: "/images/gallery/img12.jpeg" },
    { link: "/images/gallery/img8.jpg" },
    { link: "/images/gallery/img10.jpeg" },
    { link: "/images/gallery/img1.jpg" },
    { link: "/images/gallery/img15.png" },
  ];

  return (
    <>
      {/* Appear animation for all images on this page */}
      <style>{`
        @keyframes appear {
          from {
            opacity: 0;
            scale: 0.5;
          }
          to {
            opacity: 1;
            scale: 1;
          }
        }

        .lab-page-root img {
          animation: appear 0.6s ease-out both;
        }
      `}</style>

      {showLoading && !loaded && (
        <LoadingPage duration={2200} onComplete={() => setLoaded(true)} />
      )}

      {loaded && (
        <div className="lab-page-root">
          <ReactLenis root />
          <TopStatusBar />
          <div style={{ height: "100vh", position: "relative" }}>
            <InfiniteMenu
              items={items}
              title="The Lab"
              cellSize={250}
              gap={250}
              bgColor="#f5f5f0"
              textColor="#111111"
            />
          </div>
        </div>
      )}
    </>
  );
}