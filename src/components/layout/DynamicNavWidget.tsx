"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MapPin, Clock, ChevronRight, Terminal, Sun, Moon, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransitionPhaseStore } from "@/store/transitionPhaseStore";

export function DynamicNavWidget() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [time, setTime] = React.useState<Date | null>(null);
  const [displayPath, setDisplayPath] = React.useState("home");
  const seqPhase = useTransitionPhaseStore((state) => state.seqPhase);

  // Handle client-side clock rendering to avoid hydration mismatch
  React.useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle state rotation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % 3);
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Reset to breadcrumbs on navigation and update displayPath
  React.useEffect(() => {
    setActiveIndex(0);
    
    const paths = pathname.split('/').filter(Boolean);
    const currentPath = paths.length > 0 ? paths[0] : "home";
    const newDisplayPath = currentPath === "globe" ? "visitor map" : currentPath.replace('-', ' ');
    setDisplayPath(newDisplayPath);
  }, [pathname]);

  if (!time) return null; // Avoid hydration errors

  // Hide during transition animation
  if (seqPhase !== 5) {
    return null;
  }

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const hour = time.getHours();
  let greeting = { text: "Good Morning", icon: Coffee };
  if (hour >= 12 && hour < 17) greeting = { text: "Good Afternoon", icon: Sun };
  else if (hour >= 17 && hour < 22) greeting = { text: "Good Evening", icon: Moon };
  else if (hour >= 22 || hour < 5) greeting = { text: "Late night coding?", icon: Terminal };

  return (
    <div className="hidden lg:flex items-center text-sm ml-4 relative h-6 overflow-hidden min-w-[250px]">
      {/* State 0: Breadcrumbs */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center text-muted-foreground transition-all duration-500",
          activeIndex === 0 ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <span className="text-foreground font-medium">Kharis</span>
        <ChevronRight className="w-3 h-3 mx-1" />
        <span className="capitalize">{displayPath}</span>
      </div>

      {/* State 1: Location & Time */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center gap-3 text-muted-foreground transition-all duration-500",
          activeIndex === 1 ? "translate-y-0 opacity-100" : activeIndex < 1 ? "translate-y-full opacity-0" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>Remote (WIB)</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        <div className="flex items-center gap-1.5 text-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* State 2: Greeting */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center gap-1.5 text-foreground font-medium transition-all duration-500",
          activeIndex === 2 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <greeting.icon className="w-3.5 h-3.5 text-accent" />
        <span>{greeting.text}</span>
      </div>
    </div>
  );
}
