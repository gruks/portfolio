"use client";

import GridDistortion from "../components/GridDistortion";
import BentoGrid from "../components/effects/bento-grid";
import Footer from "../components/layout/Footer";
import ModernTech from "../components/layout/ModernTech";
import ScrollShuffle from "../components/ui/shuffle-text";

export default function Home() {
  return (
  <div style={{ width: '100%', height: '700px', position: 'relative' }}>
    <GridDistortion
      imageSrc="https://picsum.photos/1920/1080?grayscale"
      grid={10}
      mouse={0.1}
      strength={0.15}
      relaxation={0.9}
      className="custom-class"
    />
    <div className="w-full min-h-[80vh] bg-white flex items-center justify-center overflow-hidden">
      <ModernTech />
    </div>
    <BentoGrid />
    <Footer />
  </div>
  );
}
