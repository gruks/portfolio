// components/WorkCard.tsx
import Link from "next/link";
import Image from "next/image";

type WorkCardProps = {
  title: string;
  category: string;
  year: string;
  href: string;
  cover: string;
  icon: string;
  video: string;
  tags: string[];
};

export default function WorkCard({
  title,
  category,
  year,
  href,
  cover,
  icon,
  video,
  tags,
}: WorkCardProps) {
  return (
    <li className="w-full lg:w-1/2">
      <Link
        href={href}
        className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative"
      >
        {/* MEDIA */}
        <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
          
          {/* Blur overlay */}
          <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover Video */}
          <video
            src={video}
            muted
            loop
            playsInline
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/12
              w-[clamp(300px,65%,600px)]
              rounded-lg object-cover z-20
              [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)]
              group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)]
              group-hover:-translate-y-6/12
              transition-all duration-700
              ease-[cubic-bezier(0.87,0,0.13,1)]
            "
          />

          {/* Cover Image */}
          <Image
            src={cover}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">

          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 lg:gap-3">
              <Image
                src={icon}
                alt={title}
                width={32}
                height={32}
                className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
              />
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide">
                {title}
              </p>
            </div>

            <div className="flex gap-3 lg:gap-5">
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                {category}
              </p>
              <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
                {year}
              </p>
            </div>
          </div>

          {/* TAG MARQUEE */}
          <div className="flex justify-center items-center h-4 overflow-hidden relative w-full">

            <div className="absolute left-0 h-full w-8 lg:w-10 bg-gradient-to-r from-neutral-900/95 to-transparent z-10"/>
            <div className="absolute right-0 h-full w-8 lg:w-10 bg-gradient-to-l from-neutral-900/95 to-transparent z-10"/>

            <div className="flex overflow-hidden">
              {[0,1].map(i => (
                <p
                  key={i}
                  className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5 animate-marquee"
                >
                  {tags.map((t, idx) => (
                    <span key={idx}>{t}, </span>
                  ))}
                </p>
              ))}
            </div>

          </div>
        </div>
      </Link>
    </li>
  );
}