"use client";

import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

import { NAVIGATION_ROUTES, BOTTOM_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function MobileDrawer({ profileData }: { profileData?: any }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { dict } = useLanguage();

  // Close drawer on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center justify-center w-10 h-10 border-[3px] border-foreground bg-surface text-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none transition-all mr-2">
          <Menu className="h-5 w-5 stroke-[3]" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 flex flex-col border-r-[3px] border-foreground bg-background">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="p-6 pb-2 border-b-[3px] border-foreground">
          <Link href="/about" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10 border-[3px] border-foreground rounded-none shadow-[2px_2px_0_0_var(--foreground)]">
              <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} className="rounded-none object-cover" />
              <AvatarFallback className="rounded-none font-black">{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden w-full">
              <span className="font-black text-sm uppercase tracking-tighter text-foreground line-clamp-1">{profileData?.name || "User"}</span>
              <div className="overflow-hidden relative w-full mask-edges">
                <div className="flex w-max animate-marquee hover-pause text-[10px] font-bold uppercase tracking-widest text-foreground">
                  <span className="pr-8">{profileData?.tagline || "Developer"}</span>
                  <span className="pr-8">{profileData?.tagline || "Developer"}</span>
                </div>
              </div>
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
                    "flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 border-[3px] mb-2",
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                      : "bg-background text-foreground border-transparent hover:border-foreground hover:shadow-[4px_4px_0_0_var(--foreground)] hover:-translate-y-[2px]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {dict.nav[route.dictKey]}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t-[3px] border-foreground">
          <nav className="flex flex-col gap-1 mb-4">
            {BOTTOM_ROUTES.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.name}
                  href={route.href}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 border-[3px] border-transparent hover:border-foreground hover:shadow-[4px_4px_0_0_var(--foreground)] hover:-translate-y-[2px] bg-background text-foreground mb-2"
                >
                  <Icon className="w-4 h-4" />
                  {dict.nav[route.dictKey]}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between px-3">
            <span className="text-xs font-black uppercase tracking-widest text-foreground">{dict.nav.theme}</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
