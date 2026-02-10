"use client";

import React from "react";
import localFont from "next/font/local";


export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/image/hero.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
     <div className="hero-text mt-[30vh]">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex justify-between gap-30 h-[70vh] px-2">
        <div className="left flex flex-col justify-between">
            {/* Top Meta Row */}
            <div className="flex justify-between text-xs tracking-widest text-white/80 uppercase">
            <div className="space-x-4">
                <span>LinkdIn</span>
                <span>Instagram</span>
                <span>GitHub</span>
            </div>
            </div>

            {/* Main Title */}
            <div className="pb-6 items-end">
            <h1
                className={`mt-auto
                text-[12vw] leading-[0.8]
                uppercase
                text-white text-right
                mix-blend-difference
                select-none
                text-[clamp(48px,12vw,200px)] font-bold tracking-[0.08em] leading-[0.8] uppercase
                `}
            >
                 Ayush <br /> Kumar
            </h1>
            </div>
        </div>
        
        <div className="right h-[70vh] max-w-[35vw] pb-6">
            <div className="flex flex-col justify-between h-full items-end text-white/80 text-xs md:text-sm">
                
                <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dicta porro quisquam excepturi ullam fugit tempore? Nihil consequatur sint quam necessitatibus tempora ut? Nemo, ipsa accusamus. Maiores eligendi ex aliquid.
                Commodi enim porro nostrum, aliquam quo voe et, vitae reprehenderit sed dolor ipsam molestias delectus veritatis facere optio ea recusandae, dolores expedita amet natus impedit beatae quia? Perferendis, omnis?</p>
                    <div className="text-inbox bg-black text-white flex justify-between h-[30vh] gap-50">
                        <div className="flex flex-col justify-between ml-4 my-3">
                            <div>
                                <span>
                                    Lorem, ipsum dolor sit
                                </span>
                            </div>
                            <div>
                                <span>
                                    Lorem, ipsum d
                                </span>
                            </div>
                        </div>
                        <div className="mr-4 my-3">
                            <span>
                                Lorem ipsum dollat vel praesentium ratione omnis eos voluptatibus rerum maiores, ipsa sunt esse eveniet incidunt unde. Quo ipsum tenetur nulla facilis.
                                orum alias cumque,tates atque fugit repudiandae tempore quaerat!
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        A Design by
                    </span>
                    <div>
                        <span>
                            gruks
                        </span>
                    </div>
                </div>
                <div className="max-w-sm text-right hidden md:block">

                {/* 2026 pinned to bottom */}
                <p className="opacity-60 mt-auto">© 2026</p>
                </div>

            </div>
            </div>
        </div>
    </div>
    </section>
  );
}
