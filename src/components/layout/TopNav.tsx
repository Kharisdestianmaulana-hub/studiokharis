"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";

export function TopNav({ profileData }: { profileData?: any }) {
  return (
    <header className="sticky top-0 z-20 w-full h-[72px] border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Drawer Trigger */}
        <MobileDrawer profileData={profileData} />
        
        <SearchBar />
      </div>

      <div className="flex items-center gap-2">
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
