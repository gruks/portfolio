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

export default function Home() {
  return (
    <>  
      <ReactLenis root />
      <div style={{ width: '100%', position: 'relative' }}>
        <TopStatusBar />
        
        {/* Hero Section with Grid Distortion */}
        <div style={{ width: '100%', height: '700px', position: 'relative' }}>
          <GridDistortion
            imageSrc="https://picsum.photos/1920/1080?grayscale"
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class"
          />
        </div>
        <div style={{ width: '100%', height: '800px', position: 'relative' }}>

        </div>
        {/* Work Section */}
        <Work />

        {/* Modern Tech Stack Section */}
        <ModernTech />

        {/* Bento Grid */}
        <BentoGrid />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
