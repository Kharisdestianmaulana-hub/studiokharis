import * as React from "react";
import { getProfileData } from "@/data/profile";
import { getProjects } from "@/data/projects";
import { getTechStack } from "@/data/tech-stack";
import { BadgeCheck, Download } from "lucide-react";
import { getDictionary } from "@/lib/i18n";

export async function AboutSection() {
  const profileData = await getProfileData();
  const projects = await getProjects();
  const techStack = await getTechStack();
  const techStackTotal = techStack.reduce((total, category) => total + category.items.length, 0);
  const dict = getDictionary();
  
  return (
    <section id="about" className="relative w-full overflow-hidden bg-background border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] text-foreground min-h-[80vh] flex flex-col p-8 md:p-12 lg:p-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{
             backgroundImage: `linear-gradient(var(--foreground) 2px, transparent 2px), linear-gradient(90deg, var(--foreground) 2px, transparent 2px)`,
             backgroundSize: '3rem 3rem'
           }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full justify-center">
        
        {/* Top small text */}
        <div className="w-full max-w-5xl mx-auto px-0 mb-8">
          <div className="inline-block border-[3px] border-foreground bg-accent text-accent-foreground px-4 py-2 shadow-[4px_4px_0_0_var(--foreground)]">
            <p className="text-xs font-black tracking-widest uppercase">
              {dict.about.subtitle}
            </p>
          </div>
        </div>

        {/* Big Title Marquee */}
        <div className="w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)] -ml-8 md:-ml-12 lg:-ml-20 overflow-hidden mb-16 relative border-y-[3px] border-foreground border-dashed py-4 bg-surface/50">
          <div className="flex flex-nowrap whitespace-nowrap animate-marquee w-max" style={{ animationDuration: '35s' }}>
            {Array(6).fill(profileData.tagline || "Problem Solver. Digital Generalist.").map((text, i) => (
              <h1 key={i} className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase mx-4 md:mx-8 leading-none">
                {text}
              </h1>
            ))}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          
          {/* Avatar */}
          <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 overflow-hidden border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
            <img 
              src={profileData.avatarUrl || "/avatar.jpg"} 
              alt={profileData.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col flex-1 w-full">
            
            {/* Name */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                {profileData.name}
              </h2>
              <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-accent stroke-[3]" />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-10 border-b-[3px] border-foreground border-dashed">
              <div className="flex flex-col gap-2 p-3 border-[3px] border-foreground bg-surface shadow-[4px_4px_0_0_var(--foreground)]">
                <span className="text-[10px] md:text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.about.location}</span>
                <span className="text-sm md:text-base font-bold uppercase tracking-wide">Kabupaten Cirebon</span>
              </div>
              <div className="flex flex-col gap-2 p-3 border-[3px] border-foreground bg-surface shadow-[4px_4px_0_0_var(--foreground)]">
                <span className="text-[10px] md:text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.about.projects}</span>
                <span className="text-sm md:text-base font-bold uppercase tracking-wide">{projects.length}+ {dict.about.completed}</span>
              </div>
              <div className="flex flex-col gap-2 p-3 border-[3px] border-foreground bg-surface shadow-[4px_4px_0_0_var(--foreground)]">
                <span className="text-[10px] md:text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.about.techStack}</span>
                <span className="text-sm md:text-base font-bold uppercase tracking-wide">{techStackTotal} {dict.about.techs}</span>
              </div>
              <div className="flex flex-col gap-2 p-3 border-[3px] border-foreground bg-surface shadow-[4px_4px_0_0_var(--foreground)]">
                <span className="text-[10px] md:text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.about.email}</span>
                <span className="text-sm md:text-base font-bold uppercase tracking-wide break-all">{profileData.email}</span>
              </div>
            </div>

            {/* Bio Paragraph */}
            <div className="prose prose-neutral dark:prose-invert text-foreground text-sm md:text-base leading-relaxed space-y-4 max-w-3xl font-bold mb-10 whitespace-pre-wrap prose-strong:font-black prose-strong:uppercase">
              <div dangerouslySetInnerHTML={{ __html: profileData.about }} />
            </div>

            {/* Resume Link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto">
              <span className="font-black uppercase tracking-widest text-sm">{dict.about.wantToKnow}</span>
              <a 
                href={profileData.resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-foreground bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-black uppercase tracking-widest text-xs transition-all shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
              >
                <Download className="w-4 h-4 stroke-[3]" />
                {dict.about.downloadResume}
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
