"use client";

import InfiniteMenu from "@/src/components/effects/infinite-menu";
import ReactLenis from "lenis/react";
import localFont from "next/font/local";

const aktura = localFont({
  src: "../../../public/fonts/Aktura-Regular.ttf",
  variable: "--font-aktura",
});

export default function LabPage() {

  const items = [
  { link: "/images/gallery/img1.jpg" },
  { link: "/images/gallery/img6.jpg" },
  { link: "/images/gallery/img3.jpg" },
  { link: "/images/gallery/img7.jpg"},
  { link: "/images/gallery/img5.jpg" },
  { link: "/images/gallery/img2.jpg" },
  { link: "/images/gallery/img7.jpg" },
  { link: "/images/gallery/img4.jpg" },
  { link: "/images/gallery/img8.jpg" },
];

  return (
      <>
      <ReactLenis root />
      <div style={{ height: '100vh', position: 'relative' }} className={aktura.variable}>
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
  )
}