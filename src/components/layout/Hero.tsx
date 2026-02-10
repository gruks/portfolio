"use client";

import React from "react";
import TextAnimation from "../ui/text-animation";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/image/hero.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex justify-between gap-8 h-screen px-4 pt-[25vh]">
        {/* Left Column */}
        <div className="flex flex-col justify-between flex-1 max-w-[50vw]">
          {/* Top Meta Row */}
          <TextAnimation>
            <div className="flex flex-col text-lg tracking-widest text-white/80 leading-tight mix-blend-difference">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pl-12 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pl-24 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </TextAnimation>

          {/* Main Title */}
          <div className="pb-8">
            <TextAnimation>
              <h1 className="text-[clamp(48px,12vw,200px)] font-bold tracking-[0.08em] leading-[0.8] uppercase text-white text-right mix-blend-difference select-none">
                Ayush <br /> Kumar
              </h1>
            </TextAnimation>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between flex-1 max-w-[25vw] pb-8">
          <div className="space-y-4">
            <TextAnimation blockColor="#fffff0">
              <p className="text-white/80 text-sm md:text-base indent-8">
                Lorem ipsum dolor sit tempore? Nihil consequatur sint quam necessitatibus tempora ut? Nemo, ipsa accusamus. Maiores eligendi ex aliquid.
                Ctatis facere optio ea recusandae, dolores expedita amet natus impedit beatae quia? Perferendis, omnis?
              </p>
            </TextAnimation>

            {/* Text Inbox */}
            <div className="bg-black text-white flex justify-between gap-4 p-4 min-h-[30vh]">
              <div className="flex flex-col justify-between">
                <TextAnimation blockColor="#fffff0">
                  <span className="text-sm">Lorem, ipsum dolor sit</span>
                </TextAnimation>
                <TextAnimation blockColor="#fffff0">
                  <span className="text-sm">Lorem, ipsum dolor sit</span>
                </TextAnimation>
              </div>
              <div className="flex-1 text-right">
                <TextAnimation blockColor="#fffff0">
                  <span className="text-sm">
                    Lorem, ipsum dolor sitkdbaoidnwdawdbi id aw dwadu uwd w
                  </span>
                </TextAnimation>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <div className="text-right">
              <p className="text-white/80 text-xl indent-2 pr-78">A Design by</p>
              <p className="text-white text-2xl italic pr-64">gruks</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-white/60 text-lg">© 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
