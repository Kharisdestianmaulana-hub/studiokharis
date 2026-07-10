import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";

export const metadata = {
  title: "Projects | Studiokharis",
  description: "Projects by Kharis Destian Maulana",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <FeaturedProjectsSection showAll={true} />
    </div>
  );
}
