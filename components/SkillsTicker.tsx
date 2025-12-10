import React, { useRef, useMemo, useState, useEffect } from "react";
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

  // Create 4 sets of skills for seamless looping (increased from 3 to ensure mobile width sufficiency)
  const repeatedSkills = useMemo(
    () => [...skills, ...skills, ...skills, ...skills],
    [skills]
  );

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Ensure fonts are loaded so scrollWidth is accurate
    document.fonts.ready.then(() => {
      // Double check element still exists in case of unmount
      if (!containerRef.current) return;

      const totalWidth = containerRef.current.scrollWidth;
      const distance = totalWidth / 4; // Dividing by 4 copies

      // Speed: 100 pixels per second
      const speedPixelsPerSecond = 100;
      const duration = distance / speedPixelsPerSecond;

      // Initial setup for 'right' direction
      if (direction === "right") {
        gsap.set(el, { x: -distance });
      }

      // Infinite Scroll Animation
      gsap.to(el, {
        x: direction === "left" ? -distance : 0,
        duration: duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Reset position instantly to create seamless loop
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
  }, [direction, repeatedSkills, resizeTick]);

  return (
    <div className="overflow-hidden py-1 md:py-2" ref={wrapperRef}>
      <div
        ref={containerRef}
        className="inline-flex flex-nowrap will-change-transform w-max"
      >
        {repeatedSkills.map((skill, i) => (
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
            <span className="text-violet mx-2 md:mx-4 text-sm md:text-xl">
              •
            </span>
          </span>
        ))}
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
