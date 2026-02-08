import React, { useState } from 'react';

interface GridItem {
  label: string;
  gridClass: string;
  icon: string;
}

const TechGrid: React.FC = () => {
  const [highlightStyle, setHighlightStyle] = useState({
    transform: 'translate(0px, 0px)',
    width: '0px',
    height: '0px',
    opacity: 0,
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.parentElement?.getBoundingClientRect();

    if (parent) {
      setHighlightStyle({
        transform: `translate(${rect.left - parent.left}px, ${rect.top - parent.top}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHighlightStyle(prev => ({ ...prev, opacity: 0 }));
  };

  /* 15 ITEMS — EXACT GRID STRUCTURE */
  const items: GridItem[] = [
    // Row 1
    { label: 'Java', gridClass: 'col-span-2 row-span-3 col-start-1 row-start-1', icon: 'icons/java.svg' },
    { label: 'Python', gridClass: 'col-span-2 row-span-3 col-start-3 row-start-1', icon: 'icons/python.svg' },
    { label: 'JavaScript', gridClass: 'col-span-2 row-span-3 col-start-5 row-start-1', icon: 'icons/javascript.svg' },

    // Row 4
    { label: 'TypeScript', gridClass: 'row-span-2 col-start-1 row-start-4', icon: 'icons/typescript.svg' },
    { label: 'React', gridClass: 'row-span-2 col-start-2 row-start-4', icon: 'icons/react.svg' },
    { label: 'Next.js', gridClass: 'row-span-2 col-start-3 row-start-4', icon: 'icons/next.svg' },
    { label: 'Node.js', gridClass: 'row-span-2 col-start-4 row-start-4', icon: 'icons/nodejs.svg' },
    { label: 'Spring Boot', gridClass: 'row-span-2 col-start-5 row-start-4', icon: 'icons/springboot.svg' },
    { label: 'Flutter', gridClass: 'row-span-2 col-start-6 row-start-4', icon: 'icons/flutter.svg' },

    // Row 6
    { label: 'PostgreSQL', gridClass: 'row-span-2 col-start-1 row-start-6', icon: 'icons/postgresql.svg' },
    { label: 'MongoDB', gridClass: 'row-span-2 col-start-2 row-start-6', icon: 'icons/mongodb.svg' },
    { label: 'GSAP', gridClass: 'row-span-2 col-start-3 row-start-6', icon: 'icons/gsap.svg' },
    { label: 'TailwindCSS', gridClass: 'row-span-2 col-start-4 row-start-6', icon: 'icons/tailwindcss.svg' },
    { label: 'Vercel', gridClass: 'row-span-2 col-start-5 row-start-6', icon: 'icons/vercel.svg' },
    { label: 'Flask', gridClass: 'row-span-2 col-start-6 row-start-6', icon: 'icons/flask.svg' },

    // col-start-6 row-start-6 intentionally empty for spacing symmetry
  ];

  return (
    <div className="tech">
      <h3 className="font-semibold bg-primary text-black uppercase mb-4 ml-4">Professional at</h3>
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        
        <div className="relative parent grid grid-cols-6 grid-rows-7 gap-0 mx-2 w-full h-[750px] bg-white">

          {items.map((item, i) => (
            <div
              key={i}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`
                ${item.gridClass}
                relative
                flex items-center justify-center
                cursor-pointer
                bg-white
                group
                transition-all duration-300
                group-hover:bg-black
              `}
            >
              {/* Bottom-left black text */}
              <img
              alt={item.label}
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent'}}
              src={item.icon}
              />
            </div>
          ))}

          {/* Hover highlight */}
          <div
            className="absolute top-0 left-0 bg-black pointer-events-none transition-all duration-300"
            style={{
              transform: highlightStyle.transform,
              width: highlightStyle.width,
              height: highlightStyle.height,
              opacity: highlightStyle.opacity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechGrid;
