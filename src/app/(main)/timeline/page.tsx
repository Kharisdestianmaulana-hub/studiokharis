import { TimelineSection } from "@/components/sections/TimelineSection";

export const metadata = {
  title: "Timeline | Studiokharis",
  description: "Timeline of Kharis Destian Maulana",
};

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-2">
      <TimelineSection />
    </div>
  );
}
