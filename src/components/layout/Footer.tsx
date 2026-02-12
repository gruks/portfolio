import React from 'react';

interface FooterLink {
  label: string;
  href: string;
  gridClass: string;
}

const GlassmorphicFooter: React.FC = () => {
  return (
    <footer className="w-full py-2 bg-[#fffff0] min-h-[500px] relative overflow-hidden px-2">
      <div className="relative px-2 lg:px-4 pt-8 lg:pt-16 pb-8 lg:pb-4 grid grid-cols-12 gap-2 lg:gap-4 max-w-full mx-auto">

        {/* Background Brand Text */}
        <h2 className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          font-bold text-[clamp(100px,14vw,250px)] tracking-tight text-black select-none">
          gruks
        </h2>

        {/* Work */}
        <a
          href="/work"
          className="col-span-12 lg:col-span-8 footer-card h-[200px] lg:h-[350px]"
        >
          Work
        </a>

        {/* Lab */}
        <a
          href="/lab"
          className="col-span-12 lg:col-span-4 footer-card h-[200px] lg:h-[350px]"
        >
          Lab
        </a>

        {/* Contact + Github Stack */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-rows-2 gap-2 lg:gap-4">
          <a
            href="/contact"
            className="lg:col-span-12 footer-card h-[120px] lg:h-full"
          >
            Contact
          </a>

          <a
            href="https://github.com/gruks"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-12 footer-card h-[120px] lg:h-full"
          >
            Github
          </a>
        </div>

        {/* Resume */}
        <a
          href="/gruks_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="col-span-6 lg:col-span-4 footer-card h-[120px] lg:h-[350px]"
        >
          Resume
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ayush-kumar-52a9712b6"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 lg:col-span-4 footer-card h-[120px] lg:h-[350px]"
        >
          LinkedIn
        </a>

</div>

    </footer>
  );
};

export default GlassmorphicFooter;