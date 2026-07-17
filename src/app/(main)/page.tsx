import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechMarqueeSection } from "@/components/sections/TechMarqueeSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getSocialLinks } from "@/data/socials";

export default async function Home() {
  const socialsData = await getSocialLinks();
  
  return (
    <div className="flex flex-col gap-16 pb-16">
      <ScrollReveal delay={0.1}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <StatsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <TechMarqueeSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <FeaturedProjectsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <TechStackSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ArticlesSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <TimelineSection 
          repoNames={["flowdesk", "flowdeskweb", "ShiftOS", "dfc-cirebon", "H-W"]}
          showTitle={false}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ContactSection socialsData={socialsData} />
      </ScrollReveal>
    </div>
  );
}
