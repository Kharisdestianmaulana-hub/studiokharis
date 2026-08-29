"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";

export function NotFoundInteractive() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [buttonPos, setButtonPos] = useState<{ left: string; top: string } | null>(null);
  const [runCount, setRunCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const MAX_RUNS = 3;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Initial center position
    if (typeof window !== "undefined") {
      setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const dodgeButton = (e: React.MouseEvent | React.TouchEvent) => {
    if (runCount >= MAX_RUNS) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Pick random position between 15% and 85% of screen to avoid edges
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    const randomTop = Math.floor(Math.random() * 70) + 15;
    
    setButtonPos({ left: `${randomLeft}%`, top: `${randomTop}%` });
    setRunCount(prev => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center text-foreground touch-none"
      onPointerMove={handlePointerMove}
    >
      {/* The actual content (hidden by default unless spotlight shines on it) */}
      <div className="z-0 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-[8rem] md:text-[15rem] font-black leading-none tracking-tighter text-background [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff]">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-2">
          Are you lost?
        </h2>
        <p className="text-muted-foreground max-w-md">
          Looks like this page doesn't exist in our directory. Find the button to return to base.
        </p>
      </div>

      {/* The Runaway Button */}
      {isClient && (
        <div 
          className="absolute z-0 transition-all duration-300 ease-out"
          style={{
            left: buttonPos ? buttonPos.left : "50%",
            top: buttonPos ? buttonPos.top : "75%",
            transform: "translate(-50%, -50%)"
          }}
        >
          {runCount < MAX_RUNS ? (
            <Button 
              size="lg" 
              className="rounded-none shadow-lg pointer-events-auto"
              onMouseEnter={dodgeButton}
              onTouchStart={dodgeButton}
              onClick={(e) => e.preventDefault()} // Prevent click if they somehow catch it before run completes
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          ) : (
            <TransitionLink href="/">
              <Button size="lg" className="rounded-none shadow-lg pointer-events-auto animate-in zoom-in duration-300">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </TransitionLink>
          )}
        </div>
      )}

      {/* The Spotlight Mask Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[#09090B] z-10"
        style={{
          maskImage: `radial-gradient(circle 200px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`
        }}
      />
      
      {/* Subtle hint text that is visible on top of the black overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none opacity-30 text-xs md:text-sm text-white/50 animate-pulse whitespace-nowrap">
        Move your cursor or swipe to find the way out
      </div>
    </div>
  );
}
