"use client";
import { ReactLenis } from "lenis/react"
import Footer from "../components/layout/Footer";
import ModernTech from "../components/layout/ModernTech";
import Work from "../components/layout/work";
import TopStatusBar from "../components/layout/TopStatusBar";
import Hero from "../components/layout/Hero";


import { useState, useEffect } from "react";
import LoadingPage from "../components/ui/LoadingPage";
import Services from "../components/layout/Services";
import BentoGrid from "../components/effects/bento-grid";
import Description from "../components/layout/Description";

export default function Home() {
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
          <Hero />
          <Description />
          <Work />
          <Services />
          <ModernTech />
          <BentoGrid />
          <Footer />
        </>
      )}
    </>
  );
}
