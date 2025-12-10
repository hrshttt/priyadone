import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const PROJECTS = [
  {
    id: "01",
    title: "Hearzap",
    subtitle: "Unified Hearing-Care Operational Platform",
    tags: ["Healthcare SaaS", "Enterprise Workflows"],
    description:
      "Designed 4000+ screens across appointments, sales, service, inventory, procurement, and CMS to build a single connected ecosystem for clinics, stores, technicians, and central office teams.",
    duration: "6 months",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "02",
    title: "SPM — AI Product Partner",
    subtitle: "Chrome Extension for PMs",
    tags: ["Productivity", "AI", "PM Tools"],
    description:
      "An all-in-one Chrome extension for product managers that generates PRDs, analyses documents, surfaces product strategies, and automates PM workflows with AI-powered insights and contextual actions.",
    duration: "1 month",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "03",
    title: "AMS & LMS",
    subtitle: "Assessment and Learning Management Systems",
    tags: ["EdTech SaaS", "Learning Systems"],
    description:
      "Designed an end-to-end edtech ecosystem used by all from students to counsellors, to universities — covering various modules like program creation, admissions, exams, fee payments, loan workflows, university setup, complete academic management.. etc",
    duration: "6 months",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    id: "04",
    title: "TalentXchange",
    subtitle: "AI Powered Corp to Corp Hiring Platform",
    tags: ["HR Tech", "AI", "SaaS Platform"],
    description:
      "Designed the end-to-end hiring ecosystem for employers and vendors, including dashboards, AI/ML smart matching, requisition flows, analytics, and a complete multi-role SaaS workflow.",
    duration: "4 months",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "05",
    title: "Nano Apps",
    subtitle: "15+ AI-Powered Hiring tools",
    tags: ["AI/ML Tools", "HR Tech"],
    description:
      "Created UX/UI for 15+ hiring tools including resume parsing/redaction, market intelligence, evaluations, and role mapping—built for speed, clarity, and recruiter productivity.",
    duration: "2 months",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
  },
  {
    id: "06",
    title: "Sharely",
    subtitle: "Ad Sharing & Earn Platform",
    tags: ["AdTech", "Social Commerce"],
    description:
      "A social ad-sharing platform where everyday users can earn by sharing ads or products; designed for effortless onboarding, simple referral tracking, and seamless micro-payments.",
    duration: "1 month",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
    aspect: "aspect-square",
  },
];

const ProjectCard: React.FC<{ project: (typeof PROJECTS)[0] }> = ({
  project,
}) => (
  <div className="work-card group relative">
    <div
      className="w-full aspect-[4/3] bg-stone-200 overflow-hidden relative cursor-none"
      data-cursor-text="VIEW CASE STUDY"
    >
      {/* Overlay with Blend Mode */}
      <div className="absolute inset-0 bg-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply pointer-events-none"></div>

      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105 will-change-transform"
      />

      {/* ID Badge */}
      <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 border-r border-b border-black/10 z-20">
        <span className="font-mono text-xs font-bold text-black">
          {project.id}
        </span>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-0 right-0 bg-black text-stone-50 px-4 py-2 z-20">
        <span className="font-mono text-xs uppercase">{project.duration}</span>
      </div>
    </div>

    {/* Content Section */}
    <div className="flex flex-col mt-8 border-b border-black/10 pb-8 group-hover:border-black/40 transition-colors duration-500">
      {/* Tags & Arrow Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-black/10 px-3 py-1 rounded-full font-mono text-[10px] text-black/60 uppercase whitespace-nowrap bg-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="text-black/30 group-hover:text-violet group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-6 h-6 md:w-8 md:h-8" />
      </div>

      {/* Title & Description */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-5xl text-black mb-2 group-hover:text-violet transition-colors duration-300 leading-tight">
          {project.title}
        </h2>
        <h3 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-6">
          {project.subtitle}
        </h3>
        <p className="font-sans text-lg text-black/70 leading-relaxed max-w-xl">
          {project.description}
        </p>
      </div>
    </div>
  </div>
);

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Reveal
      gsap.from(".work-header-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Card Reveal Animation
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%", // Trigger earlier (was 90%)
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-stone-50 min-h-screen blueprint-grid pt-32 pb-20 overflow-hidden relative"
    >
      {/* 1. HEADER */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-24">
        <div className="flex flex-col items-start border-b border-black pb-8">
          <div className="overflow-hidden">
            <h1 className="work-header-line font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] whitespace-nowrap">
              Selected Works
            </h1>
          </div>
          <p className="work-header-line font-mono text-xs uppercase tracking-widest text-black/40 mt-4">
            2022 — Present
          </p>
        </div>
      </section>

      {/* 2. GRID LAYOUT */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 3. FOOTER NOTE */}
      <div className="text-center py-20 mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex flex-col items-center gap-2 mx-auto opacity-30 hover:opacity-100 transition-opacity duration-300 clickable"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]">
            End of Selection
          </span>
          <span className="font-serif italic text-sm text-violet opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Back to Top
          </span>
        </button>
      </div>

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

export default Work;
