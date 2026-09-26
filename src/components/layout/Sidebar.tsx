"use client";

import { useState, useEffect } from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { usePathname } from "next/navigation";
import { NAVIGATION_ROUTES, BOTTOM_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PanelLeftClose, PanelLeft } from "lucide-react";

export function Sidebar({ profileData }: { profileData?: any }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("studiokharis_sidebar_collapsed");
    if (stored === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("studiokharis_sidebar_collapsed", String(newState));
  };

  return (
    <aside className={cn(
      "hidden lg:flex flex-col shrink-0 h-screen sticky top-0 border-r-[3px] border-foreground bg-background z-30 transition-all duration-300",
      isCollapsed ? "w-[90px]" : "w-[280px]"
    )}>
      {/* Top Profile / Header & Toggle */}
      <div className={cn("p-6 flex border-b-[3px] border-foreground", isCollapsed ? "flex-col items-center gap-4" : "items-center justify-between")}>
        {!isCollapsed && (
          <Link href="/about" id="tour-profile" className="flex items-center gap-4 overflow-hidden px-1 hover:-translate-y-1 transition-transform cursor-pointer group">
            <Avatar className="h-12 w-12 border-[3px] border-foreground rounded-none shrink-0 shadow-[4px_4px_0_0_var(--foreground)] group-hover:shadow-[2px_2px_0_0_var(--foreground)] bg-accent overflow-hidden">
              <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} className="object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              <AvatarFallback className="font-black text-background bg-foreground rounded-none">{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden w-full">
              <span className="font-black text-sm uppercase tracking-widest text-foreground line-clamp-1">{profileData?.name || "User"}</span>
              <div className="overflow-hidden relative w-full mask-edges">
                <div className="flex w-max animate-marquee hover-pause text-xs font-bold uppercase tracking-widest text-foreground opacity-80 mt-1">
                  <span className="pr-8">{profileData?.tagline || "Developer"}</span>
                  <span className="pr-8">{profileData?.tagline || "Developer"}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              id="tour-collapse"
              className={cn(
                "flex items-center justify-center shrink-0 border-[3px] border-foreground bg-surface text-foreground hover:bg-foreground hover:text-background transition-all active:translate-y-1 active:shadow-none shadow-[2px_2px_0_0_var(--foreground)]",
                isCollapsed ? "w-12 h-12" : "w-10 h-10 ml-2"
              )}
              onClick={toggleSidebar}
            >
              {isCollapsed ? <PanelLeft className="h-5 w-5 stroke-[3]" /> : <PanelLeftClose className="h-5 w-5 stroke-[3]" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-black uppercase tracking-widest border-[3px] border-foreground">
            {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </TooltipContent>
        </Tooltip>

        {isCollapsed && (
          <Link href="/about" id="tour-profile" className="mx-auto hover:-translate-y-1 transition-transform cursor-pointer group mt-4">
            <Avatar className="h-12 w-12 border-[3px] border-foreground rounded-none shrink-0 shadow-[4px_4px_0_0_var(--foreground)] group-hover:shadow-[2px_2px_0_0_var(--foreground)] bg-accent overflow-hidden">
              <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} className="object-cover w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              <AvatarFallback className="font-black text-background bg-foreground rounded-none">{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        <nav className="flex flex-col gap-3">
          {NAVIGATION_ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href));

            const LinkContent = (
              <Link
                id={`tour-nav-${route.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-black uppercase tracking-widest transition-all duration-200 border-[3px]",
                  isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-4 px-4 py-3",
                  isActive
                    ? "bg-accent text-accent-foreground border-foreground shadow-[4px_4px_0_0_var(--foreground)] translate-x-1"
                    : "border-transparent text-foreground hover:border-foreground hover:bg-surface hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]"
                )}
              >
                <Icon className={cn("shrink-0 stroke-[3]", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
                {!isCollapsed && <span className="truncate">{route.name}</span>}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip key={route.name}>
                <TooltipTrigger asChild>
                  {LinkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-black uppercase tracking-widest border-[3px] border-foreground">{route.name}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={route.name}>{LinkContent}</div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation & Utilities */}
      <div className="p-4 border-t-[3px] border-foreground">
        <nav className="flex flex-col gap-3 mb-6">
          {BOTTOM_ROUTES.map((route) => {
            const Icon = route.icon;
            const LinkContent = (
              <Link
                id={`tour-nav-${route.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-black uppercase tracking-widest transition-all duration-200 border-[3px]",
                  isCollapsed ? "justify-center h-12 w-12 mx-auto border-transparent hover:border-foreground hover:bg-surface hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]" : "gap-4 px-4 py-3 border-transparent hover:border-foreground hover:bg-surface hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] text-foreground"
                )}
              >
                <Icon className={cn("shrink-0 stroke-[3]", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
                {!isCollapsed && <span className="truncate">{route.name}</span>}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip key={route.name}>
                <TooltipTrigger asChild>
                  {LinkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-black uppercase tracking-widest border-[3px] border-foreground">{route.name}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={route.name}>{LinkContent}</div>
            );
          })}
        </nav>
        
        <div className={cn("flex items-center border-[3px] border-foreground bg-surface p-2 shadow-[4px_4px_0_0_var(--foreground)]", isCollapsed ? "justify-center flex-col gap-3" : "justify-between px-4 py-3")}>
          {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest text-foreground">Theme</span>}
          <Tooltip>
            <TooltipTrigger asChild>
              <div id="tour-theme">
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right" className="font-black uppercase tracking-widest border-[3px] border-foreground">Toggle Theme</TooltipContent>}
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
