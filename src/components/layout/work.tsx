// components/WorkHeading.tsx
import React from "react";
import Link from "next/link";
import WorkCard from "../ui/work-card";
import { ArrowRight } from "lucide-react";
import TextBot from "../ui/text-bottom-reveal";

const WorkHeading: React.FC = () => {
  return (
    <section className="mx-8">      
       <TextBot delay={0.5} animateonScroll={true}>
        <div> {/* Extra wrapper */}
            <h2 className="flex justify-between w-full mb-6 lg:mb-8">
            <span className="text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
                <div className="line-mask line1-mask block overflow-hidden text-start relative">
                <div className="line line1 block relative text-start">
                    Work
                </div>
                </div>
            </span>
            <span className="text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
                <div className="line-mask line1-mask block overflow-hidden text-start relative">
                <div className="line line1 block relative text-start">
                    {"'S"}
                </div>
                </div>
            </span>
            </h2>
        </div>
        </TextBot>
        <ul className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full mb-8 lg:mb-16">

            <WorkCard
                title="Necter"
                category="Product"
                year="2025"
                href="/work/necter"
                cover="/images/work/necter/cover.jpg"
                icon="/images/work/necter/necter-icon.png"
                video="/videos/necter-preview-compressed.mp4"
                tags={[
                    "Product Strategy",
                    "Brand System",
                    "UI/UX",
                    "Design System",
                    "Next.js",
                    "Tailwind",
                    "Motion",
                    "GSAP",
                    "Vercel",
                    "SaaS"
                ]}
            />

            <WorkCard
                title="CareerGuru"
                category="Platform"
                year="2025"
                href="/work/careerguru"
                cover="/images/work/careerguru/cover.jpg"
                icon="/images/work/careerguru/careerguru-icon.png"
                video="/videos/careerguru-preview-compressed.mp4"
                tags={[
                    "EdTech",
                    "Platform Design",
                    "UX Research",
                    "UI Systems",
                    "Branding",
                    "Product Design",
                    "Next.js",
                    "Tailwind",
                    "API Integration",
                    "Scalable Architecture"
                ]}
            />


            </ul>
            <Link
            href="/work"
            className="flex items-center justify-center gap-1 group"
            >
            <span className="text-black font-medium">
                See all
            </span>
            <ArrowRight
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
            />
            </Link>
    </section>
  );
};

export default WorkHeading;
