"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ROUTES, BOTTOM_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileDrawer({ profileData }: { profileData?: any }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 flex flex-col border-r border-border bg-background">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="p-6 pb-2">
          <Link href="/about" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} />
              <AvatarFallback>{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-foreground line-clamp-1">{profileData?.name || "User"}</span>
              <span className="text-xs text-muted line-clamp-1">{profileData?.role || "Developer"}</span>
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-none">
          <nav className="flex flex-col gap-1">
            {NAVIGATION_ROUTES.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href));

              return (
                <Link
                  key={route.name}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200",
                    isActive
                      ? "bg-secondary/10 text-primary font-medium"
                      : "text-secondary-text hover:bg-secondary/5 hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {route.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <nav className="flex flex-col gap-1 mb-4">
            {BOTTOM_ROUTES.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.name}
                  href={route.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary-text hover:bg-secondary/5 hover:text-foreground transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  {route.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-muted">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
