"use client";

import React from "react";
import TextAnimation from "../ui/text-animation";
import TextBottomReveal from "../ui/text-bottom-reveal";

export default function Description() {
  return (
    <section
      id="about"
      className="grid grid-cols-12 gap-4 lg:gap-8 pt-56 pb-28 p-4 lg:px-8"
    >
      {/* ───────── Left Column ───────── */}
      <div className="flex flex-col col-span-12 lg:col-span-7">

        {/* Title */}
        <TextBottomReveal>
        <h4
          className="font-semibold uppercase mb-4"
          aria-label="Myself"
        >
          Myself
        </h4>
        </TextBottomReveal>

        {/* Mobile Video */}
        <div className="lg:hidden col-span-12 aspect-video rounded-lg overflow-hidden mb-4">
          <video
            src="/videos/about-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/about-poster.jpg"
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>
        <TextAnimation blockColor="#b21d1dff">
        {/* Desktop Text */}
        <p className="hidden lg:block text-[clamp(28px,3.5vw,96px)] font-semibold tracking-tight leading-none">
          Passionate about merging design and engineering, I craft smooth,
          interactive experiences with purpose. With a focus on motion,
          performance, and detail, I help bring digital products to life for
          forward-thinking brands around the world.
        </p>
        </TextAnimation>
        {/* Mobile Text */}
        <TextAnimation blockColor="#b21d1dff">
        <p
          className="lg:hidden text-[clamp(28px,3.5vw,96px)] font-semibold tracking-tight leading-none"
          aria-label="Passionate about merging design and engineering, I craft smooth, interactive experiences with purpose. With a focus on motion, performance, and detail, I help bring digital products to life for forward-thinking brands around the world."
        >
          Passionate about merging design and engineering, I craft smooth,
          interactive experiences with purpose. With a focus on motion,
          performance, and detail, I help bring digital products to life for
          forward-thinking brands around the world.
        </p>
        </TextAnimation>
      </div>

      {/* ───────── Right Column (Desktop Only) ───────── */}
      <div className="hidden lg:block h-full col-span-5">
        <div className="sticky top-[calc(100vh-20vw-172px)] w-full aspect-video rounded-lg lg:rounded-xl overflow-hidden">
          <video
            src="/videos/about-video-compressed.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
