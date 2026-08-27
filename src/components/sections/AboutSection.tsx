import * as React from "react";
import { getProfileData } from "@/data/profile";
import { getProjects } from "@/data/projects";
import { getTechStack } from "@/data/tech-stack";
import { BadgeCheck } from "lucide-react";

export async function AboutSection() {
  const profileData = await getProfileData();
  const projects = await getProjects();
  const techStack = await getTechStack();
  const techStackTotal = techStack.reduce((total, category) => total + category.items.length, 0);
  
  return (
    <section id="about" className="relative w-full overflow-hidden rounded-[2rem] bg-surface border border-border text-foreground min-h-[80vh] flex flex-col p-8 md:p-12 lg:p-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Decorative Wavy Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-100,50 Q200,10 500,50 T1100,50' fill='none' stroke='%23374151' stroke-width='1.5' stroke-dasharray='10, 10'/%3E%3Cpath d='M-100,150 Q200,110 500,150 T1100,150' fill='none' stroke='%23374151' stroke-width='1' stroke-opacity='0.5'/%3E%3Cpath d='M-100,250 Q200,210 500,250 T1100,250' fill='none' stroke='%23374151' stroke-width='0.5' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full justify-center">
        
        {/* Top small text */}
        <div className="w-full max-w-5xl mx-auto px-0">
          <p className="text-xs font-bold tracking-[0.3em] text-muted uppercase mb-6">
            ABOUT ME
          </p>
        </div>

        {/* Big Title Marquee */}
        <div className="w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)] -ml-8 md:-ml-12 lg:-ml-20 overflow-hidden mb-16 relative">
          <div className="flex flex-nowrap whitespace-nowrap animate-marquee w-max" style={{ animationDuration: '35s' }}>
            {Array(6).fill(profileData.tagline || "Problem Solver. Digital Generalist.").map((text, i) => (
              <h1 key={i} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mx-4 md:mx-8 leading-[1.1]">
                {text}
              </h1>
            ))}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          
          {/* Avatar */}
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-background bg-secondary/10 shadow-xl">
            <img 
              src={profileData.avatarUrl || "/avatar.jpg"} 
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col flex-1 pt-2 w-full">
            
            {/* Name */}
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                {profileData.name}
              </h2>
              <BadgeCheck className="w-6 h-6 text-accent fill-accent/20" />
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-6 mb-8 border-b border-border pb-8">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-muted uppercase">Location</span>
                <span className="text-sm md:text-base font-bold">Kabupaten Cirebon</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-muted uppercase">Projects</span>
                <span className="text-sm md:text-base font-bold">{projects.length}+ Completed</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-muted uppercase">Tech Stack</span>
                <span className="text-sm md:text-base font-bold">{techStackTotal} Technologies</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-muted uppercase">Email</span>
                <span className="text-sm md:text-base font-bold">{profileData.email}</span>
              </div>
            </div>

            {/* Bio Paragraph */}
            <div className="text-secondary-text text-sm md:text-base leading-relaxed space-y-4 max-w-3xl font-medium mb-8 whitespace-pre-wrap">
              <div dangerouslySetInnerHTML={{ __html: profileData.about }} />
            </div>

            {/* Resume Link */}
            <div className="flex items-center gap-2 text-foreground text-sm md:text-base font-medium flex-wrap">
              <span>Want to know more about my experience?</span>
              <a 
                href={profileData.resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="underline underline-offset-4 decoration-2 decoration-accent hover:text-accent transition-colors"
              >
                Download my resume.
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
