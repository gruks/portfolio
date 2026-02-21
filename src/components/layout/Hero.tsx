"use client";

import React from "react";
import TextAnimation from "../ui/text-animation";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      <style>{`
        @keyframes heroImageReveal {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        .hero-bg-image {
          animation: heroImageReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#fffff0]" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 h-full px-4 pt-24 md:pt-32 lg:pt-[25vh]">
        {/* Left Column */}
        <div className="flex flex-col justify-between flex-1 w-full max-w-full lg:max-w-[50vw]">
          {/* Top Meta Row */}
          <TextAnimation>
            <div className="flex flex-col text-lg tracking-widest color-text leading-tight mix-blend-difference">
              <a
                href="https://www.linkedin.com/in/ayush-kumar-52a9712b6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/_._ayushkumar_._._"
                target="_blank"
                rel="noopener noreferrer"
                className="md:pl-12 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://github.com/gruks"
                target="_blank"
                rel="noopener noreferrer"
                className="md:pl-24 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </TextAnimation>

          {/* Main Title */}
          <div className="pb-6">
            <TextAnimation blockColor="#1A5CFF">
              <h1 className="text-[clamp(48px,12vw,200px)] font-mathos font-bold tracking-[0.08em] leading-[0.8] uppercase text-[#0A0A0A] text-right mix-blend-difference select-none">
                Ayush <br /> Kumar
              </h1>
            </TextAnimation>
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-10 lg:mt-0 flex flex-col justify-between flex-1 w-full max-w-full lg:max-w-[25vw] pb-4">
          <div className="space-y-4">
            <TextAnimation >
              <p className="text-[#1A5CFF] blue-text text-sm md:text-base md:pl-20 lg:pl-40 font-aktura">
                I just see cool sh*t and hop on to build it. Never thought that life could be any different. Always wanted peace, but I guess chaos is fun too. I like to build things that look cool. Although I envy myself to be this good!
              </p>
            </TextAnimation>

            {/* Text Inbox */}
            <div className="bg-black text-[#fffff0] box-text flex flex-col sm:flex-row justify-between gap-4 p-4 lg:ml-40 sm:ml-10 md:ml-40 w-[30rem]! mx-auto max-w-full indent-0">
              <div className="flex flex-col justify-between w-[15rem]! ">
                <TextAnimation blockColor="#1A5CFF">
                  <span className="text-sm">No cap, just code.</span>
                </TextAnimation>
                <TextAnimation blockColor="#1A5CFF">
                  <span className="text-sm">Don't care about Myself</span>
                </TextAnimation>
              </div>
              <div className="flex-1 ">
                  <TextAnimation blockColor="#1A5CFF">
                  <span className=" text-sm">
                    Built everything from AI systems to apps, websites, and games. Always exploring new tech, always pushing boundaries. If it’s cool, I’m in. Dreaming big, experimenting freely, and learning through the process. That’s the vibe.
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
              <p className="text-[#1A5CFF] text-lg">© 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}