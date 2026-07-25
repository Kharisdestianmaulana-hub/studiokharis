"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export function VisitorCounter({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCount() {
      try {
        const hasVisited = sessionStorage.getItem("studiokharis_visited");
        // If not visited in this session, increment (/up). Otherwise, just get current count
        const action = hasVisited ? "" : "/up";
        
        const res = await fetch(`https://api.counterapi.dev/v1/studiokharis/views${action}`);
        if (!res.ok) return;
        
        const data = await res.json();
        
        if (mounted && data && typeof data.count === 'number') {
          setCount(data.count);
          if (!hasVisited) {
            sessionStorage.setItem("studiokharis_visited", "true");
          }
        }
      } catch (err) {
        console.error("Failed to fetch visitor count", err);
      }
    }

    // Delay slightly to prevent blocking the main thread during hydration
    const timer = setTimeout(fetchCount, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (count === null) {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs font-medium text-transparent bg-secondary/10 px-2.5 py-1.5 rounded-full animate-pulse", className)}>
        <Eye className="w-3.5 h-3.5 opacity-0" />
        <span>----</span>
      </div>
    );
  }

  return (
    <div 
      className={cn("flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors bg-secondary/10 px-2.5 py-1.5 rounded-full border border-border/30 hover:border-accent/30 cursor-default", className)}
      title="Total Website Views"
    >
      <Eye className="w-3.5 h-3.5" />
      <span>{count.toLocaleString()}</span>
    </div>
  );
}
