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
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Global Reach</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Explore this interactive map that highlights the real-time geographic locations of people who sign the Guestbook. 
          It demonstrates the use of Vercel Edge Headers for IP geolocation mapped using Leaflet.
        </p>
      </div>

      <MapSectionWrapper messages={validMessages} />
    </div>
  );
}
