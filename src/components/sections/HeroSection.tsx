import * as React from "react";
import { getProfileData } from "@/data/profile";
import { getSocialLinks } from "@/data/socials";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { TransitionLink } from "@/components/layout/TransitionLink";

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
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-end justify-center pb-24 md:pb-0 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-[200vw] left-1/2 -translate-x-1/2 flex items-center overflow-hidden pointer-events-none z-0">
        <div className="flex flex-nowrap whitespace-nowrap animate-marquee w-max" style={{ animationDuration: '40s' }}>
          {/* We repeat the name horizontally to ensure it loops smoothly without wrapping */}
          {Array(4).fill(profileData.name).map((name, i) => (
            <h1 key={i} className="text-[12rem] md:text-[20rem] lg:text-[25rem] font-black uppercase tracking-tighter mx-8 text-background [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff] leading-none whitespace-nowrap">
              {name}
            </h1>
          ))}
        </div>
      </div>
      
      {/* Center Image */}
      <div className="relative z-10 w-full max-w-3xl flex justify-center items-end h-full">
        <img 
          src="/images/hero-profile.webp" 
          alt={profileData.name}
          className="object-contain h-[90%] md:h-[100%] max-h-[85vh] object-bottom drop-shadow-2xl pointer-events-none"
        />
        
        {/* Text Highlight Badge and Floating Button Wrapper */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both w-max min-w-[260px]">
          
          <div className="flex flex-col items-center gap-2 w-full">
          
          <div className="flex items-center justify-center gap-3 w-full">
            {/* Logo on the left */}
            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 relative flex items-center justify-center rounded-none overflow-hidden shadow-none bg-background border border-border">
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
            <div className="flex flex-col justify-center text-left gap-1">
              <div className="bg-foreground text-background px-2 py-1">
                <h3 className="text-base md:text-lg font-black tracking-widest uppercase leading-none">Studio Kharis</h3>
              </div>
              <div className="bg-background text-foreground px-2 py-0.5 border border-border w-fit">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Small Studio. Big Ideas.</p>
              </div>
            </div>
          </div>

          {/* Social Icons row */}
          <div className="flex items-center justify-center gap-2 w-full mt-1">
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
                  className="bg-background border border-border text-foreground p-2 hover:bg-foreground hover:text-background transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
            
            {/* Email icon */}
            <a 
              href={`mailto:${profileData.email}`} 
              className="bg-background border border-border text-foreground p-2 hover:bg-foreground hover:text-background transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
          </div>
          
          </div>
        
        {/* Floating Button */}
        {!hideButtons && (
          <TransitionLink href="/projects" className="w-full">
            <button className="w-full bg-foreground text-background text-sm font-semibold py-2.5 px-6 rounded-none shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgb(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
              Lihat Project
              <FaArrowRight className="w-3 h-3" />
            </button>
          </TransitionLink>
        )}
      </div>
      </div>
    </section>
  );
}

