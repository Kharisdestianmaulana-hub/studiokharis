import { TechStackSection } from "@/components/sections/TechStackSection";

export const metadata = {
  title: "Tech Stack | Studiokharis",
  description: "Tech Stack of Kharis Destian Maulana",
};

export default function TechStackPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <TechStackSection />
    </div>
  );
}
