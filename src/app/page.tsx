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
    // If we navigated here via the floating menu, skip the loading page
    // and let the page-transition animation handle the UX.
    if (typeof window !== "undefined" && window.sessionStorage.getItem("navFromFloatingMenu") === "1") {
      window.sessionStorage.removeItem("navFromFloatingMenu");
      setLoaded(true);
      return;
    }

    // Otherwise, show the loading page (initial open / refresh / direct URL)
    setShowLoading(true);
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
