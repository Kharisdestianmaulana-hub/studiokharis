"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  if (!mounted) return <div className="w-full h-[60vh] flex items-center justify-center border rounded-xl animate-pulse bg-secondary/10 mt-8" />;

  // CartoDB tiles are very clean. Dark Matter for dark mode, Positron for light mode.
  const tileUrl = resolvedTheme === "dark" 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[80vh] w-full mt-8 rounded-xl overflow-hidden border border-border shadow-lg">
      
      {/* Sidebar List */}
      <div className="w-full lg:w-1/3 bg-background flex flex-col h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-border overflow-hidden z-10">
        <div className="p-4 bg-secondary/20 border-b border-border shadow-sm">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            📍 Visitor Locations
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Click a message to fly to their location</p>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4 space-y-4 bg-secondary/5">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <span className="text-4xl mb-2">🌍</span>
              <p className="text-sm text-muted-foreground">No visitor locations recorded yet. Be the first to sign the guestbook!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className="bg-background p-4 rounded-xl border border-border cursor-pointer hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => setActiveLocation([msg.latitude, msg.longitude])}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10 border shadow-sm">
                    <AvatarImage src={msg.avatarUrl} />
                    <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{msg.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{msg.message}</p>
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
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url={tileUrl}
          />
          
          {messages.map((msg) => (
            <Marker key={msg.id} position={[msg.latitude, msg.longitude]}>
              <Popup>
                <div className="flex flex-col gap-2 min-w-[200px] p-1">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <img src={msg.avatarUrl} alt={msg.name} className="w-6 h-6 rounded-full border" />
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
