import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const metadata = {
  title: "Experience | Studiokharis",
  description: "Experience of Kharis Destian Maulana",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <ExperienceSection />
    </div>
  );
}
