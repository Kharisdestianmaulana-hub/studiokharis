import { AboutSection } from "@/components/sections/AboutSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "About | Studiokharis",
  description: "About Kharis Destian Maulana",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-8 w-full">
      <ScrollReveal delay={0.1} className="w-full">
        <AboutSection />
      </ScrollReveal>
    </div>
  );
}
