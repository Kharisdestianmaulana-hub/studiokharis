import { ArticlesSection } from "@/components/sections/ArticlesSection";

export const metadata = {
  title: "Articles | Studiokharis",
  description: "Articles by Kharis Destian Maulana",
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <ArticlesSection />
    </div>
  );
}
