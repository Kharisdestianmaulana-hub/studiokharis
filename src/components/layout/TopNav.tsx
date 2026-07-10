"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <Button variant="ghost" size="icon" asChild className="text-muted hover:text-foreground">
            <Link href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-muted hover:text-foreground">
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
              <FaLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-muted hover:text-foreground">
            <Link href="mailto:hello@example.com" title="Email">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
