import * as React from "react";
import { getProfileData } from "@/data/profile";

export const metadata = {
  title: "Manifesto - Kharis",
  description: "The Studio Kharis Manifesto. Core principles and philosophy.",
};

const MANIFESTO_RULES = [
  {
    num: "01",
    title: "Function Over Flash",
    desc: "A beautiful website is useless if it's slow. Performance is a feature, not an afterthought. Build things that actually work, then make them look good.",
    theme: "light", // bg-background text-foreground
  },
  {
    num: "02",
    title: "Design With Attitude",
    desc: "Stop making boring, rounded, glassmorphism websites. The web should have character. Stand out, be bold, and leave a permanent mark on the visitor's memory.",
    theme: "dark", // bg-foreground text-background
  },
  {
    num: "03",
    title: "Clear > Clever",
    desc: "Good code isn't the most complex code; it's the most readable code. Don't hide behind abstractions. Write code your future self will understand.",
    theme: "accent", // bg-accent text-foreground
  },
  {
    num: "04",
    title: "Ship Fast, Iterate Faster",
    desc: "Perfection is an illusion. Build the MVP, throw it into the real world, gather feedback, and ruthlessly improve. Execution beats theory.",
    theme: "light",
  },
  {
    num: "05",
    title: "Small Studio, Big Ideas",
    desc: "You don't need a massive team to build world-class products. Sharp execution is more lethal than headcount. Own your stack and take responsibility.",
    theme: "dark",
  },
];

export default async function ManifestoPage() {
  const profileData = await getProfileData();

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center border-b-[3px] border-foreground p-8 bg-background relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col justify-between">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="w-full border-b-[3px] border-foreground" />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl">
          <p className="text-sm font-black tracking-widest text-foreground uppercase border-[3px] border-foreground px-4 py-2 bg-surface">
            {profileData.name.toUpperCase()} / {new Date().getFullYear()}
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter text-foreground uppercase leading-[0.85]">
            The<br/>Manifesto
          </h1>
          <p className="text-xl md:text-2xl font-bold tracking-widest uppercase mt-4 opacity-80">
            RULES OF ENGAGEMENT FOR MODERN ENGINEERING & DESIGN.
          </p>
        </div>
      </div>

      {/* Rules Section */}
      <div className="w-full flex flex-col">
        {MANIFESTO_RULES.map((rule, index) => {
          let bgClass = "bg-background text-foreground";
          if (rule.theme === "dark") bgClass = "bg-foreground text-background";
          if (rule.theme === "accent") bgClass = "bg-accent text-accent-foreground";

          return (
            <div 
              key={rule.num} 
              className={`w-full border-b-[3px] border-foreground group flex flex-col md:flex-row relative ${bgClass} overflow-hidden`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Number Block */}
              <div className="md:w-1/3 xl:w-1/4 shrink-0 flex items-center justify-center p-8 md:p-16 border-b-[3px] md:border-b-0 md:border-r-[3px] border-current">
                <span className="text-8xl md:text-[10rem] font-black tracking-tighter opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
                  {rule.num}
                </span>
              </div>
              
              {/* Content Block */}
              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                  {rule.title}
                </h2>
                <div className="w-24 h-[6px] bg-current opacity-30" />
                <p className="text-xl md:text-3xl font-bold leading-snug opacity-90 max-w-4xl">
                  {rule.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Closing */}
      <div className="w-full p-16 md:p-32 flex flex-col items-center justify-center text-center bg-background">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
          END OF TRANSMISSION
        </h2>
        <p className="mt-4 text-sm font-black tracking-widest uppercase opacity-50">
          STUDIO KHARIS // 2024
        </p>
      </div>
    </div>
  );
}
