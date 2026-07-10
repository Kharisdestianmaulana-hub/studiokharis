import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSocialLinks } from "@/data/socials";

export default async function Home() {
  const socialsData = await getSocialLinks();
  
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <ArticlesSection />
      <TimelineSection />
      <ContactSection socialsData={socialsData} />
    </div>
  );
}
