"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Check initial scroll position
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed right-4 md:right-8 z-50 transition-all duration-500",
        // Mobile: MusicPlayer is at bottom-4, its height is 3rem (h-12). So we place this at bottom-20 (5rem).
        // Desktop: MusicPlayer is at bottom-8, its height is 3rem (h-12). So we place this at md:bottom-24 (6rem).
        "bottom-20 md:bottom-24",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg border border-border bg-surface hover:bg-surface-hover text-foreground transition-all duration-300"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          Back to top
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
