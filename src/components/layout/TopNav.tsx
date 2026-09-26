"use client";

import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { Search, PlayCircle } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { DynamicNavWidget } from "./DynamicNavWidget";
import { DynamicLogo } from "./DynamicLogo";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";
import { VisitorCounter } from "@/components/shared/VisitorCounter";
import { useTour } from "@/providers/TourProvider";

export function TopNav({ profileData }: { profileData?: any }) {
  const { startTour } = useTour();

  return (
    <header className="sticky top-0 z-20 w-full h-[72px] border-b-[3px] border-foreground bg-background flex items-center justify-between px-4 lg:px-8">
      {/* Left Section */}
      <div className="flex items-center gap-2 flex-1 md:flex-none md:w-auto md:min-w-[250px] mr-2 md:mr-0">
        <MobileDrawer profileData={profileData} />
        <DynamicLogo />
        <DynamicNavWidget />
        <div className="md:hidden flex-1 max-w-[200px]">
          <SearchBar />
        </div>
      </div>

      {/* Center Section (Desktop Search) */}
      <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
        <div id="tour-search" className="w-full max-w-lg">
          <SearchBar />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:min-w-[200px] justify-end">
        <button 
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface text-foreground font-black uppercase tracking-widest text-xs border-[3px] border-foreground hover:bg-foreground hover:text-background transition-all shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
          onClick={startTour}
        >
          <PlayCircle className="w-4 h-4 stroke-[3]" />
          <span>Tour</span>
        </button>
        <div id="tour-visitor">
          <VisitorCounter />
        </div>
      </div>
    </header>
  );
}
