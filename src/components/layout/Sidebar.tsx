"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <aside className={cn(
      "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-background/50 backdrop-blur-xl z-30 transition-all duration-300",
      isCollapsed ? "w-[80px]" : "w-[280px]"
    )}>
      {/* Top Profile / Header & Toggle */}
      <div className={cn("p-4 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-10 w-10 border border-border shrink-0">
              <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} />
              <AvatarFallback>{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-foreground line-clamp-1">{profileData?.name || "User"}</span>
              <span className="text-xs text-muted line-clamp-1">{profileData?.role || "Developer"}</span>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <Avatar className="h-10 w-10 border border-border shrink-0 mb-4 mt-2">
            <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} />
            <AvatarFallback>{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
          </Avatar>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 shrink-0 text-muted hover:text-foreground", isCollapsed ? "absolute top-16" : "")}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-3 scrollbar-none">
        <nav className="flex flex-col gap-2">
          {NAVIGATION_ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href));

            const LinkContent = (
              <Link
                href={route.href}
                className={cn(
                  "flex items-center rounded-md text-sm transition-all duration-200",
                  isCollapsed ? "justify-center h-10 w-10 mx-auto" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-secondary/10 text-primary font-medium"
                    : "text-secondary-text hover:bg-secondary/5 hover:text-foreground"
                )}
              >
                <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                {!isCollapsed && <span className="truncate">{route.name}</span>}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip key={route.name}>
                <TooltipTrigger asChild>
                  {LinkContent}
                </TooltipTrigger>
                <TooltipContent side="right">{route.name}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={route.name}>{LinkContent}</div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation & Utilities */}
      <div className="p-3 border-t border-border">
        <nav className="flex flex-col gap-2 mb-4">
          {BOTTOM_ROUTES.map((route) => {
            const Icon = route.icon;
            const LinkContent = (
              <Link
                href={route.href}
                className={cn(
                  "flex items-center rounded-md text-sm text-secondary-text hover:bg-secondary/5 hover:text-foreground transition-all duration-200",
                  isCollapsed ? "justify-center h-10 w-10 mx-auto" : "gap-3 px-3 py-2"
                )}
              >
                <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                {!isCollapsed && <span className="truncate">{route.name}</span>}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip key={route.name}>
                <TooltipTrigger asChild>
                  {LinkContent}
                </TooltipTrigger>
                <TooltipContent side="right">{route.name}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={route.name}>{LinkContent}</div>
            );
          })}
        </nav>
        
        <div className={cn("flex items-center", isCollapsed ? "justify-center flex-col gap-2" : "justify-between px-3")}>
          {!isCollapsed && <span className="text-xs text-muted">Theme</span>}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Toggle Theme</TooltipContent>}
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
