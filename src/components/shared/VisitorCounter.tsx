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
        const hasVisited = localStorage.getItem("studiokharis_visited");
        const action = hasVisited ? "" : "?action=up";
        const urlParams = action ? `${action}&t=${Date.now()}` : `?t=${Date.now()}`;
        
        const res = await fetch(`/api/views${urlParams}`);
        if (!res.ok) return;
        
        const data = await res.json();
        
        if (mounted && data && typeof data.count === 'number') {
          setCount(data.count);
          if (!hasVisited) {
            localStorage.setItem("studiokharis_visited", "true");
          }
        }
      } catch (err) {
        console.error("Failed to fetch visitor count", err);
      }
    }

    const timer = setTimeout(fetchCount, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (count === null) {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs font-medium text-muted bg-secondary/20 px-2.5 py-1.5 rounded-none animate-pulse border border-border/30", className)}>
        <Eye className="w-3.5 h-3.5" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div 
      className={cn("flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors bg-secondary/10 px-2.5 py-1.5 rounded-none border border-border/30 hover:border-accent/30 cursor-default", className)}
      title="Total Website Views"
    >
      <Eye className="w-3.5 h-3.5" />
      <span>{count.toLocaleString()}</span>
    </div>
  );
}
