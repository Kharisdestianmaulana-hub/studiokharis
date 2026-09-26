"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Globe2 } from "lucide-react";

// Fix leaflet marker icon issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle flying to a location
function FlyToLocation({ location }: { location: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location, 10, {
        duration: 2, // 2 seconds animation
      });
    }
  }, [location, map]);
  return null;
}

export default function MapSection({ messages }: { messages: any[] }) {
  const { resolvedTheme } = useTheme();
  const [activeLocation, setActiveLocation] = useState<[number, number] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-[60vh] flex items-center justify-center border rounded-none animate-pulse bg-secondary/10 mt-8" />;

  // Use standard OpenStreetMap tiles
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-0 h-[80vh] w-full mt-4 rounded-none overflow-hidden border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] md:shadow-[12px_12px_0_0_var(--foreground)]">
      
      {/* Sidebar List */}
      <div className="w-full lg:w-1/3 bg-background flex flex-col h-1/2 lg:h-full border-t-[3px] lg:border-t-0 lg:border-r-[3px] border-foreground overflow-hidden z-10">
        <div className="p-4 bg-foreground text-background border-b-[3px] border-foreground">
          <h3 className="font-black text-xl flex items-center gap-2 uppercase tracking-widest">
            <MapPin className="w-6 h-6" /> Visitors
          </h3>
          <p className="text-xs font-bold mt-1 opacity-80 uppercase tracking-widest">Click to trace location</p>
        </div>
        
        <div className="overflow-y-auto flex-1 bg-background flex flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Globe2 className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm font-bold uppercase">No visitors yet</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div 
                key={msg.id || idx} 
                className={`p-4 border-b-[3px] border-foreground cursor-pointer transition-none ${activeLocation?.[0] === msg.latitude && activeLocation?.[1] === msg.longitude ? 'bg-foreground text-background' : 'hover:bg-foreground hover:text-background bg-background text-foreground'}`}
                onClick={() => setActiveLocation([msg.latitude, msg.longitude])}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 border-[3px] border-current bg-background shrink-0 p-0.5">
                    <img src={msg.avatarUrl} alt={msg.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-black uppercase truncate">{msg.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      {msg.city || "Unknown City"}, {msg.country || "Earth"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative z-0 bg-secondary/20">
        <MapContainer 
          center={[20, 0]} 
          zoom={2.5} 
          scrollWheelZoom={true} 
          className={resolvedTheme === "dark" ? "map-dark-mode" : ""}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={tileUrl}
          />
          
          {messages.map((msg) => (
            <Marker key={msg.id} position={[msg.latitude, msg.longitude]}>
              <Popup>
                <div className="flex flex-col gap-2 min-w-[200px] p-1">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <img src={msg.avatarUrl} alt={msg.name} className="w-6 h-6 rounded-none border" />
                    <span className="font-semibold text-sm">{msg.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{msg.message}</span>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <FlyToLocation location={activeLocation} />
        </MapContainer>
      </div>
    </div>
  );
}
