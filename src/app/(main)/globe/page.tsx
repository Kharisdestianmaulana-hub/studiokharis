import { fetchGlobeCoordinates } from "@/lib/appwriteServer";
import { MapSectionWrapper } from "@/components/sections/MapSectionWrapper";

export const metadata = {
  title: "Global Reach | Studiokharis",
  description: "See where visitors of Studiokharis are coming from around the world.",
};

export default async function GlobePage() {
  const coordsData = await fetchGlobeCoordinates();
  
  // Filter out entries without valid coordinates
  const validMessages = coordsData.filter(
    (c: any) => typeof c.latitude === 'number' && typeof c.longitude === 'number'
  );

  return (
    <div className="flex flex-col gap-8 pb-16 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 h-full">
      <div className="flex flex-col text-left gap-4 w-full px-4 border-b-[3px] border-foreground pb-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
          Global <br className="md:hidden" /> Reach
        </h1>
        <p className="text-sm md:text-base font-bold uppercase tracking-widest max-w-2xl bg-foreground text-background px-3 py-1.5 w-fit">
          Real-time visitor map & guestbook
        </p>
      </div>

      <MapSectionWrapper messages={validMessages} />
    </div>
  );
}
