import * as React from "react";
import { getProfileData } from "@/data/profile";

export async function HeroSection({ 
  hideButtons = false, 
  variant = "studio" 
}: { 
  hideButtons?: boolean;
  variant?: "studio" | "personal";
} = {}) {
  const profileData = await getProfileData();
  
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-end justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-[200vw] left-1/2 -translate-x-1/2 flex items-center overflow-hidden pointer-events-none z-0">
        <div className="flex flex-nowrap whitespace-nowrap animate-marquee w-max" style={{ animationDuration: '40s' }}>
          {/* We repeat the name horizontally to ensure it loops smoothly without wrapping */}
          {Array(4).fill(profileData.name).map((name, i) => (
            <h1 key={i} className="text-[12rem] md:text-[20rem] lg:text-[25rem] font-black uppercase tracking-tighter mx-8 text-foreground leading-none whitespace-nowrap">
              {name}
            </h1>
          ))}
        </div>
      </div>
      
      {/* Center Image */}
      <div className="relative z-10 w-full max-w-3xl flex justify-center items-end h-full">
        <img 
          src="/images/hero-profile.png" 
          alt={profileData.name}
          className="object-contain h-[90%] md:h-[100%] max-h-[85vh] object-bottom drop-shadow-2xl pointer-events-none"
        />
      </div>
    </section>
  );
}

