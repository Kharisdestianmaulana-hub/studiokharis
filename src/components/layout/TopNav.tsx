"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { ThemeToggle } from "./ThemeToggle";
import { DynamicNavWidget } from "./DynamicNavWidget";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";

export function TopNav({ profileData }: { profileData?: any }) {
  return (
    <header className="sticky top-0 z-20 w-full h-[72px] border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8">
      {/* Left Section */}
      <div className="flex items-center gap-2 w-full md:w-auto md:min-w-[250px]">
        <MobileDrawer profileData={profileData} />
        <DynamicNavWidget />
        <div className="md:hidden flex-1">
          <SearchBar />
        </div>
      </div>

      {/* Center Section (Desktop Search) */}
      <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
        <div className="w-full max-w-lg">
          <SearchBar />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:min-w-[200px] justify-end">
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
