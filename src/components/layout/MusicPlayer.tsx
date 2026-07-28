"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side to avoid hydration mismatch
    audioRef.current = new Audio("/music/lofi.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume[0] / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = volume[0] / 100;
      }
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div id="tour-music" className={cn(
      "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2 transition-all duration-300",
    )}>
      {/* Expanded Controls */}
      <div className={cn(
        "bg-surface/90 backdrop-blur-xl border border-border rounded-2xl p-4 flex flex-col gap-4 shadow-xl transition-all duration-300 origin-bottom-right",
        isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none absolute bottom-14 right-0"
      )}>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            <Music className="w-5 h-5 text-primary relative z-10" />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-lg" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Lo-Fi Coding Beats</span>
            <span className="text-xs text-muted flex items-center gap-1">
              {isPlaying && (
                <span className="flex items-end gap-[2px] h-3">
                  <span className="w-1 bg-primary/70 h-[30%] animate-[bounce_1s_infinite_100ms]"></span>
                  <span className="w-1 bg-primary/70 h-[60%] animate-[bounce_1s_infinite_200ms]"></span>
                  <span className="w-1 bg-primary/70 h-[100%] animate-[bounce_1s_infinite_300ms]"></span>
                  <span className="w-1 bg-primary/70 h-[40%] animate-[bounce_1s_infinite_100ms]"></span>
                </span>
              )}
              {isPlaying ? "Now Playing" : "Paused"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted hover:text-foreground"
            onClick={toggleMute}
          >
            {isMuted || volume[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={isMuted ? 0 : volume[0]}
            onChange={(e) => setVolume([parseInt(e.target.value)])}
            className="w-[120px] accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              if (!isExpanded) setIsExpanded(true);
              else if (!isPlaying) togglePlay(); 
              else togglePlay(); 
            }}
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full shadow-lg border relative transition-all duration-500",
              isPlaying 
                ? "bg-primary border-primary hover:bg-primary/90 text-primary-foreground" 
                : "bg-surface border-border hover:bg-surface-hover text-foreground",
              isExpanded && isPlaying ? "animate-[pulse_2s_infinite]" : ""
            )}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Music className="w-5 h-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          {isPlaying ? "Pause Music" : "Play Lo-Fi"}
        </TooltipContent>
      </Tooltip>
      
      {/* Close button for expanded state */}
      {isExpanded && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(false)}
          className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-surface border border-border p-0 text-muted shadow-sm hover:text-foreground z-10"
        >
          <span className="text-xs">✕</span>
        </Button>
      )}
    </div>
  );
}
