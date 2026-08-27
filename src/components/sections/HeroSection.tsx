import * as React from "react";
import { getProfileData } from "@/data/profile";
import { getSocialLinks } from "@/data/socials";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export async function HeroSection({ 
  hideButtons = false, 
  variant = "studio" 
}: { 
  hideButtons?: boolean;
  variant?: "studio" | "personal";
} = {}) {
  const profileData = await getProfileData();
  const socialsData = await getSocialLinks();
  
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
        
        {/* Glassmorphism Badge */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-3 md:p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both w-max min-w-[260px]">
          
          <div className="flex items-center gap-4 w-full">
            {/* Logo on the left */}
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 relative flex items-center justify-center rounded-full overflow-hidden shadow-inner bg-black">
              {/* Light Mode Logo */}
              <img 
                src="/logo-light.webp" 
                alt="Studio Kharis Logo" 
                className="w-full h-full object-cover dark:hidden" 
              />
              {/* Dark Mode Logo */}
              <img 
                src="/logo-dark.webp" 
                alt="Studio Kharis Logo" 
                className="w-full h-full object-cover hidden dark:block" 
              />
            </div>
            
            {/* Text in the middle */}
            <div className="flex flex-col justify-center text-left pt-1 pr-4">
              <h3 className="text-lg md:text-xl font-black tracking-tight leading-none text-foreground mb-1">Studio Kharis</h3>
              <p className="text-[11px] md:text-xs font-medium text-muted-foreground whitespace-nowrap">Small Studio. Big Ideas.</p>
            </div>
          </div>

          <div className="w-full h-px bg-foreground/10 dark:bg-white/10 my-1" />

          {/* Social Icons row */}
          <div className="flex items-center justify-center gap-4 w-full py-1">
            {socialsData.slice(0, 4).map((social, idx) => {
              let Icon = FaGlobe;
              const platform = social.platformName || social.name.toLowerCase();
              if (platform.includes("github")) Icon = FaGithub;
              if (platform.includes("linkedin")) Icon = FaLinkedin;
              if (platform.includes("twitter") || platform.includes("x")) Icon = FaTwitter;
              if (platform.includes("instagram")) Icon = FaInstagram;
              if (platform.includes("whatsapp")) Icon = FaWhatsapp;
              
              return (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              );
            })}
            
            {/* Email icon */}
            <a 
              href={`mailto:${profileData.email}`} 
              className="text-foreground/70 hover:text-foreground transition-all hover:scale-110"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

