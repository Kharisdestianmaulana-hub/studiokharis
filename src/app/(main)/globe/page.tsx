import { GlobeSection } from "@/components/sections/GlobeSection";
import { fetchGlobeCoordinates } from "@/lib/appwriteServer";

export const metadata = {
  title: "Global Reach | Studiokharis",
  description: "See where visitors of Studiokharis are coming from around the world.",
};

export default async function GlobePage() {
  const coordsData = await fetchGlobeCoordinates();
  
  // Format the data for the globe markers
  // Markers expect location: [lat, lng] and size: number
  const markers = coordsData
    .filter((c: any) => typeof c.latitude === 'number' && typeof c.longitude === 'number')
    .map((c: any) => ({
      location: [c.latitude, c.longitude] as [number, number],
      size: 0.1, // Fixed size for each marker
    }));

  // Let's add some default markers for aesthetics if the database is mostly empty
  const defaultMarkers: { location: [number, number], size: number }[] = [
    { location: [-6.2088, 106.8456], size: 0.1 }, // Jakarta
    { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
    { location: [51.5074, -0.1278], size: 0.05 }, // London
    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.1 }, // Singapore
  ];

  const allMarkers = [...defaultMarkers, ...markers];

  return (
    <div className="flex flex-col gap-8 pb-16 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Global Reach</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          This interactive 3D globe lights up based on the real-time geographic locations of people who sign the Guestbook. 
          It demonstrates the use of Vercel Edge Headers for IP geolocation mapping directly into an Appwrite database.
        </p>
      </div>

      <GlobeSection markers={allMarkers} />
    </div>
  );
}
