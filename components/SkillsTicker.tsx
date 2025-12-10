import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_ROW_1 = [
  "USER EXPERIENCE",
  "INTERACTION DESIGN",
  "USER INTERFACE",
  "INFORMATION ARCHITECTURE",
  "USER FLOW",
  "RESPONSIVE DESIGN",
  "DESIGN SYSTEMS",
  "STYLE GUIDES",
  "VISUAL DESIGN",
  "PHYSICAL AND DIGITAL WIREFRAMING",
  "PROTOTYPING",
  "LOW FIDELITY AND HIGH FIDELITY MOCKUPS",
  "PRIMARY AND SECONDARY RESEARCH",
  "QUALITATIVE AND QUANTITATIVE RESEARCH",
  "USER INTERVIEW",
  "USABILITY TESTING",
  "A/B TESTING",
  "JOURNEY MAPPING",
  "COMPETITIVE ANALYSIS",
  "DATA ANALYSIS IN UX RESEARCH",
];

const SKILLS_ROW_2 = [
  "FIGMA",
  "ADOBE XD",
  "VISILY",
  "CANVA",
  "ADOBE PHOTOSHOP",
  "ADOBE ILLUSTRATOR",
  "MIRO",
  "MICROSOFT OFFICE",
  "GOOGLE WORKSPACE",
  "SKETCHBOOK",
  "POSTER DESIGN",
  "BRANDING",
  "LOGO DESIGN",
  "TYPOGRAPHY",
  "BANNER DESIGN",
  "BROCHURE DESIGN",
  "GRAPHIC DESIGN",
  "BOOK COVER DESIGN",
  "PRODUCT DESIGN",
];

const TickerBand: React.FC<{
  skills: string[];
  direction: "left" | "right";
  outline?: boolean;
}> = ({ skills, direction, outline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  const [resizeTick, setResizeTick] = useState(0);

  // Force re-calculation on resize to fix mobile layout shifts
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setResizeTick((prev) => prev + 1), 200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || !singleSetRef.current) return;

    // Ensure fonts are loaded so width measurement is accurate
    document.fonts.ready.then(() => {
      if (!containerRef.current || !singleSetRef.current) return;

      // Measure the exact width of ONE set of skills
      const distance = singleSetRef.current.getBoundingClientRect().width;

      // Speed: 100 pixels per second
      const speedPixelsPerSecond = 100;
      const duration = distance / speedPixelsPerSecond;

      // Initial setup
      if (direction === "right") {
        gsap.set(el, { x: -distance });
      } else {
        gsap.set(el, { x: 0 });
      }

      // Infinite Scroll Animation
      // We animate by exactly one set's width, then reset instantly.
      // Since Set 2 is identical to Set 1, the reset is invisible.
      gsap.to(el, {
        x: direction === "left" ? -distance : 0,
        duration: duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(el, { x: direction === "left" ? 0 : -distance });
        },
      });

      // Velocity Skew Effect
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skewAmount = Math.max(-5, Math.min(5, velocity / 300));

          gsap.to(wrapperRef.current, {
            skewX: direction === "left" ? skewAmount : -skewAmount,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    });
  }, [direction, resizeTick, skills]);

  const renderSkillSet = () => (
    <>
      {skills.map((skill, i) => (
        <span
          key={i}
          className={`flex-shrink-0 mx-3 md:mx-6 text-2xl md:text-6xl font-serif italic ${
            outline
              ? "text-transparent stroke-black stroke-1 opacity-40"
              : "text-black"
          }`}
          style={outline ? { WebkitTextStroke: "1px #151515" } : {}}
        >
          {skill}{" "}
          <span className="text-violet mx-2 md:mx-4 text-sm md:text-xl">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden py-1 md:py-2" ref={wrapperRef}>
      <div
        ref={containerRef}
        className="inline-flex flex-nowrap will-change-transform w-max"
      >
        {/* Set 1: Measured for distance */}
        <div ref={singleSetRef} className="flex shrink-0 items-center">
          {renderSkillSet()}
        </div>
        {/* Set 2: The Loop buffer */}
        <div className="flex shrink-0 items-center">{renderSkillSet()}</div>
        {/* Set 3: Extra safety buffer for wide screens */}
        <div className="flex shrink-0 items-center">{renderSkillSet()}</div>
      </div>
    </div>
  );
};

const SkillsTicker: React.FC = () => {
  return (
    <div className="w-full py-6 md:py-12 flex flex-col gap-2 md:gap-4">
      <TickerBand skills={SKILLS_ROW_1} direction="left" />
      <TickerBand skills={SKILLS_ROW_2} direction="right" outline={true} />
    </div>
  );
};

export default SkillsTicker;
