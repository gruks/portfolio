"use client";

import Image from "next/image";
import TextAnimation from "../ui/text-animation";
import TextBottomReveal from "../ui/text-bottom-reveal";

// ─────────────────────────────────────────────
// Tag
// ─────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="text-[10px] uppercase tracking-wide bg-white/10 text-white px-2 py-1 rounded-md">
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Helping brands define purpose, positioning, and a clear strategy to connect with the right audience.",
    tags: [
      "Research",
      "Brand Strategy",
      "Voice & Tone",
      "Naming",
      "Copywriting",
    ],
    image: "/images/services/brand-strategy.webp",
  },
  {
    number: "02",
    title: "Digital Design",
    description:
      "Designing clean, engaging digital experiences focused on usability, clarity, and brand consistency.",
    tags: ["UI", "UX", "Web Design", "Wireframing", "Product Design"],
    image: "/images/services/digital-design.webp",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Building fast, scalable digital products with modern frontend and backend technologies.",
    tags: ["Frontend", "SEO", "Animation", "CMS", "Databases"],
    image: "/images/services/development.webp",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="bg-white text-white px-4 py-12">
      <div className="services px-4 md:px-8 bg-neutral-900 rounded-2xl pb-8">
      {/* Header */}
      <div className="max-w-6xl mb-10 md:mb-16 pl-4 md:pl-16 lg:pl-32">
        <TextBottomReveal>
        <p className="text-xs pt-8 uppercase tracking-widest text-neutral-400 mb-3 text-center md:text-left">
          Services
        </p>
        </TextBottomReveal>
        <TextAnimation blockColor="#fffff0">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-center md:text-left">
          From brand strategy to design and development — I build digital
          experiences that are clear, functional, and impactful.
        </h2>
        </TextAnimation>
      </div>

      {/* Services */}
      <div className="flex flex-col bg-neutral-800 rounded-xl px-4 md:px-6 ">
        <ul className="flex flex-col divide-y divide-neutral-700">
            {services.map((service) => (
            <li
                key={service.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12"
            >
                {/* ───────── Column 1 : Number + Title ───────── */}
                <div className="lg:col-span-4">
                <TextAnimation blockColor="#fffff0">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
                    {service.number}
                </p>
                </TextAnimation>
                <TextAnimation blockColor="#fffff0">
                <h3 className="text-3xl lg:text-4xl font-medium text-white leading-tight">
                    {service.title}
                </h3>
                </TextAnimation>
                </div>

                {/* ───────── Column 2 : Description + Tags ───────── */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                <TextAnimation blockColor="#fffff0">
                <p className="text-neutral-300 text-base leading-relaxed mb-6">
                    {service.description}
                </p>
                </TextAnimation>
                <TextAnimation blockColor="#fffff0">
                <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wide bg-white/10 text-white px-2 py-1 rounded-md"
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                </TextAnimation>
                </div>

                {/* ───────── Column 3 : Image ───────── */}
                <div className="lg:col-span-4">
                <div className="relative h-[220px] lg:h-[260px] rounded-xl overflow-hidden">
                    <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    />
                </div>
                </div>
            </li>
            ))}
        </ul>
        </div>
        </div>
    </section>
  );
}
