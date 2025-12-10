import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Ruler,
  Sparkles,
  Brain,
  Search,
  GitBranch,
  Layers,
} from "lucide-react";
import FocusParagraph from "../components/FocusParagraph";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Image Reveal
      gsap.from(".about-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5, // Reduced delay slightly since header is gone
      });

      // Content Reveal
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.from(block, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 95%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-stone-50 min-h-screen blueprint-grid selection:bg-black selection:text-stone-50 pt-32 pb-20 relative"
    >
      {/* 1. SPLIT LAYOUT: PHOTO LEFT / TEXT RIGHT */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left Column: Image */}
          <div className="relative group about-image md:sticky md:top-32">
            <div className="aspect-[3/4] bg-stone-200 overflow-hidden relative z-10">
              <img
                src="/Photo.png"
                alt="Priyatharshini"
                className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-violet/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative border */}
            <div className="absolute top-4 -right-4 w-full h-full border border-black/20 -z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
          </div>

          {/* Right Column: All Text Content */}
          <div className="pt-0 md:pt-12 space-y-10 reveal-block">
            {/* Introduction Label */}
            <p className="font-mono text-xs uppercase tracking-widest text-black/40">
              [ The Introduction ]
            </p>

            {/* Headline (Moved to Top) */}
            <FocusParagraph>
              A quiet thinker who loves figuring out how things actually work.
            </FocusParagraph>

            <div className="w-full h-px bg-black/10"></div>

            {/* Unified Body Text */}
            <div className="space-y-8 font-sans text-lg md:text-xl text-black/80 leading-relaxed">
              <p>
                Hi, I’m Priya. I don't just design to make things pretty. I
                design to make things make sense.
              </p>
              <p>
                I’m naturally curious, an observer of tiny details, and someone
                who gets excited about untangling messy systems.
              </p>
              <p>
                For me, design isn't about decoration. It's about clear logic.
                It's about peeling back layers of complexity to reveal the
                simple, functional core underneath.
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 mt-4 w-full">
              <div>
                <span className="block font-serif italic text-3xl mb-1">
                  INTP
                </span>
                <span className="font-mono text-xs text-black/40 uppercase">
                  Personality
                </span>
              </div>

              <div className="w-[3px] h-12 bg-black/20"></div>

              <div className="text-right">
                <span className="block font-serif italic text-3xl mb-1">
                  Details
                </span>
                <span className="font-mono text-xs text-black/40 uppercase">
                  Obsession
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUOTE SECTION */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-32 text-center reveal-block">
        <p
          className="font-serif italic text-3xl md:text-5xl text-black"
          style={{ lineHeight: 1.4 }}
        >
          "I may not be the loudest person in the room, but I’m definitely the
          one thinking the most."
        </p>
      </section>

      {/* 3. WHO AM I (THE MINDSET) */}
      <section
        className="bg-black text-stone-50 py-32 md:py-48 mb-32"
        data-theme="dark"
      >
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Column: Sticky Header */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32 reveal-block">
              <span className="font-mono text-xs text-violet uppercase tracking-widest mb-6 block">
                [ The Mindset ]
              </span>
              <h2 className="font-serif italic text-xl md:text-6xl leading-[1.1] text-white mb-10">
                Who am I <br /> as a designer?
              </h2>
              <div className="w-12 h-px bg-white/20"></div>
            </div>
          </div>

          {/* Right Column: Bento Grid of Points */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Solving large puzzle-like systems where others see only confusion.",
              "Noticing patterns and connections that no one else sees.",
              "Diving into the deepest details until things finally “click”.",
              "Simplifying the complex without losing its inherent value.",
              "Making workflows feel clean, calm, and intuitively obvious.",
            ].map((text, i) => (
              <div
                key={i}
                className={`reveal-block group p-6 border border-white/10 hover:bg-white/5 transition-all duration-500 flex flex-col h-full min-h-[160px] ${
                  i === 0 ? "md:col-span-2 bg-white/5" : ""
                }`}
              >
                <span className="font-mono text-xs text-violet mb-4 block">
                  0{i + 1}
                </span>
                <p
                  className={`font-serif text-white/50 group-hover:text-white transition-colors duration-500 leading-snug text-2xl`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT I'm GOOD AT (GRID) */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="mb-16 reveal-block">
          <h2 className="font-serif text-4xl mb-4">What I'm Really Good At</h2>
          <div className="h-px w-24 bg-violet"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {[
            {
              title: "Chaos to Clarity",
              icon: <Sparkles />,
              desc: "Turning messy requirements into clear, structured pathways.",
            },
            {
              title: "System Thinking",
              icon: <Brain />,
              desc: "Making big, overwhelming systems feel understandable and manageable.",
            },
            {
              title: 'The "Why"',
              icon: <Search />,
              desc: "Researching relentlessly until I find the true reason behind a user action.",
            },
            {
              title: "Humanizing SaaS",
              icon: <Layers />,
              desc: "Designing complex enterprise products without making them look scary.",
            },
            {
              title: "Edge Cases",
              icon: <GitBranch />,
              desc: "Thinking through every possible scenario (I’m very INTP about this).",
            },
            {
              title: "Effortless UI",
              icon: <Ruler />,
              desc: "Creating clean, functional interfaces that feel effortless, not flashy.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-stone-50 p-8 md:p-10 hover:bg-white transition-colors duration-300 group reveal-block"
            >
              <div className="text-black/30 mb-6 group-hover:text-violet transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif italic text-2xl mb-4">{item.title}</h3>
              <p className="font-sans text-sm text-black/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PERSONAL INTERESTS */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 reveal-block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start border-t border-black/10 pt-24">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-black/40 uppercase tracking-widest mb-6 block">
              [ Beyond Work ]
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight text-black">
              Things I love outside of design/work
            </h2>
          </div>

          <div className="md:col-span-8 md:mt-10">
            <ul className="grid grid-cols-1 gap-6">
              {[
                "Reading fantasy novels (Brandon Sanderson is my go to author)",
                "Sketching, illustration and 2D animation",
                "Organising (figma files included)",
                "Playing with my cats",
                "Binge watching webseries and animes on weekends",
                "Solving almost impossible Jigsaw puzzles",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-6 border-b border-black/5 pb-6 group hover:pl-4 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-violet pt-1.5">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-lg md:text-xl text-black/70 group-hover:text-black transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Magnetic>
          <a
            href="https://wa.me/919499929875"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-black text-stone-50 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 clickable"
          >
            <WhatsAppIcon className="w-8 h-8" />
          </a>
        </Magnetic>
      </div>
    </div>
  );
};

export default About;
