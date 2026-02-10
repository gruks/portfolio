"use client";
import { ReactLenis } from "lenis/react"
import GridDistortion from "../components/GridDistortion";
import BentoGrid from "../components/effects/bento-grid";
import TextAnimation from "../components/ui/text-animation";
import Footer from "../components/layout/Footer";
import ModernTech from "../components/layout/ModernTech";
import Work from "../components/layout/work";
import TopStatusBar from "../components/layout/TopStatusBar";
import Shuffle from "../components/ui/shuffle-text";
import Hero from "../components/layout/Hero";

import { useState } from "react";
import LoadingPage from "../components/ui/LoadingPage";

export default function Home() {

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
          <LoadingPage
            duration={2200}          // how long 0→100 takes in ms
            onComplete={() => setLoaded(true)}
          />
        )}

      <ReactLenis root />
        <TopStatusBar />
        {/* Hero Section */}
        <Hero />
        
        {/* Work Section */}
        <Work />

        {/* Modern Tech Stack Section */}
        <ModernTech />

        {/* Bento Grid */}
        <BentoGrid />

        {/* Footer */}
        <Footer />
    </>
  );
}
