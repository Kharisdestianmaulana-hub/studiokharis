import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";

export const metadata = {
  title: "About | Studiokharis",
  description: "About Kharis Destian Maulana",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <HeroSection hideButtons={true} />
      <AboutSection />
    </div>
  );
}
