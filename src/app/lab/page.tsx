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
    // Check if this is a page refresh (not a navigation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isRefresh = navigation?.type === 'reload';
    
    if (isRefresh) {
      setShowLoading(true);
    } else {
      setLoaded(true);
    }
  }, []);

  const items = [
    { link: "/images/gallery/img1.jpg" },
    { link: "/images/gallery/img6.jpg" },
    { link: "/images/gallery/img3.jpg" },
    { link: "/images/gallery/img11.jpeg" },
    { link: "/images/gallery/img7.jpg"},
    { link: "/images/gallery/img5.jpg" },
    { link: "/images/gallery/img2.jpg" },
    { link: "/images/gallery/img7.jpg" },
    { link: "/images/gallery/img4.jpg" },
    { link: "/images/gallery/img12.jpeg" },
    { link: "/images/gallery/img8.jpg" },
    { link: "/images/gallery/img10.jpeg" },
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
          <div style={{ height: '100vh', position: 'relative' }}>
            <InfiniteMenu 
              items={items}
              title="The Lab"
              cellSize={250}
              gap={250}
              bgColor="#f5f5f0"
              textColor="#111111"
            />
          </div>
        </>
      )}
    </>
  );
}