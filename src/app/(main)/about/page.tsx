import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "About | Studiokharis",
  description: "About Kharis Destian Maulana",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <ScrollReveal delay={0.1}>
        <HeroSection hideButtons={true} />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <AboutSection />
      </ScrollReveal>
    </div>
  );
}
