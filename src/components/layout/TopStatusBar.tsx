import Link from "next/link";

export default function TopStatusBar() {
  return (
    <div className="overflow-hidden fixed left-4 lg:left-8 right-4 lg:right-8 top-[18px] lg:top-6 grid grid-cols-12 gap-4 lg:gap-8 z-50 pointer-events-none">

      {/* Left Info */}
      <div className="hidden lg:block col-span-3">
        <div className="blend-diff auto-contrast">
          <Line text="India Based" />
          <Line text="Working globally" muted />
        </div>
      </div>

      {/* Center Info */}
      <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <div className="blend-diff auto-contrast">
          <Line text="Building at" />
          <span className="block overflow-hidden">
            <div className="block font-medium text-[clamp(16px,1.2vw,20px)]">
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block pointer-events-auto"
              >
                <HoverText text="No where" muted />
              </Link>
            </div>
          </span>
        </div>
      </div>

      {/* Right Info */}
      <div className="hidden lg:block col-span-3">
        <div className="blend-diff auto-contrast">
          <Line text="Freelance availability" />
          <Line text="September 2025" muted />
        </div>
      </div>

      {/* CTA Button */}
      <a
        href="mailto:ayush.gruks.dev@gmail.com"
        aria-label="Send me an email"
        role="button"
        className="fixed right-4 lg:right-8 top-4 lg:top-6 group cursor-pointer pointer-events-auto"
      >
        <div className="relative">

          {/* Emoji bubble */}
          <div className="
            absolute left-0 top-0 
            w-12 h-12 lg:w-14 lg:h-14 
            bg-neutral-900 border border-neutral-800 
            rounded-full flex items-center justify-center 
            rotate-180 scale-95 
            group-hover:scale-100 
            group-hover:rotate-0 
            group-hover:-translate-x-full 
            transition-transform duration-700 
            ease-[cubic-bezier(0.34,1.56,0.64,1)] 
            -z-10
          ">
            <span className="text-lg lg:text-xl">🤙🏼</span>
          </div>

          {/* Main button */}
          <div className="
            flex items-center relative 
            px-5 lg:px-6 
            h-12 lg:h-14 
            rounded-full 
            bg-neutral-900 
            text-neutral-100 
            font-semibold 
            text-[clamp(16px,1.2vw,20px)] 
            border border-neutral-800 
            z-10
          ">
            <HoverText text="Get in touch" />
          </div>

        </div>
      </a>
    </div>
  );
}

/* ---------- Components ---------- */

function Line({ text, muted = false }: { text: string; muted?: boolean }) {
  return (
    <span className="block overflow-hidden">
      <div
        className={`block font-medium text-[clamp(16px,1.2vw,20px)] ${
          muted ? "opacity-60" : ""
        }`}
      >
        {text}
      </div>
    </span>
  );
}

function HoverText({ text, muted = false }: { text: string; muted?: boolean }) {
  return (
    <div className="overflow-hidden h-6 lg:h-7">
      <div className="
        flex flex-col 
        transition-transform duration-500 
        ease-[cubic-bezier(0.25,1,0.5,1)] 
        group-hover:-translate-y-1/2
      ">
        <span
          className={`text-[clamp(16px,1.2vw,20px)] font-medium mb-1.5 ${
            muted ? "opacity-60" : ""
          }`}
        >
          {text}
        </span>
        <span
          className={`text-[clamp(16px,1.2vw,20px)] font-medium mb-1.5 ${
            muted ? "opacity-60" : ""
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
