"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Type, EyeOff, LayoutGrid, List, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SettingsContent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const { 
    reducedMotion, 
    textSize, 
    projectsView, 
    setReducedMotion, 
    setTextSize, 
    setProjectsView, 
    resetSettings 
  } = useSettingsStore();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col gap-10 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">Settings</h1>
          <p className="font-bold tracking-widest text-xs uppercase text-foreground">Loading preferences...</p>
        </div>
      </div>
    );
  }

  const brutalistCard = "flex flex-col border-[3px] border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)]";
  const brutalistCardHeader = "p-6 md:p-8 border-b-[3px] border-foreground bg-surface";
  const brutalistCardTitle = "text-3xl font-black uppercase tracking-tighter text-foreground";
  const brutalistCardDesc = "font-bold tracking-widest text-xs uppercase text-foreground opacity-80 mt-2";
  const brutalistCardContent = "p-6 md:p-8 flex flex-col gap-8";
  const brutalistLabel = "text-sm font-black uppercase tracking-widest text-foreground";
  
  const getBrutalistBtnClass = (isActive: boolean) => cn(
    "flex items-center gap-2 px-5 py-3 border-[3px] border-foreground font-black uppercase tracking-widest text-xs transition-all",
    isActive 
      ? "bg-foreground text-background translate-x-[4px] translate-y-[4px] shadow-none" 
      : "bg-surface text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-1 shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-[6px_6px_0_0_var(--foreground)]"
  );

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">Settings</h1>
        <p className="font-bold tracking-widest text-xs uppercase text-foreground border-[3px] border-foreground bg-accent text-accent-foreground px-4 py-2 w-fit shadow-[4px_4px_0_0_var(--foreground)]">Customize your experience on this portfolio.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Appearance Settings */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>Appearance</h2>
            <p className={brutalistCardDesc}>Adjust the visual theme and colors.</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Theme Toggle */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>Theme</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setTheme("light")}
                  className={getBrutalistBtnClass(theme === "light")}
                >
                  <Sun className="w-5 h-5 stroke-[3]" /> Light
                </button>
                <button 
                  onClick={() => setTheme("dark")}
                  className={getBrutalistBtnClass(theme === "dark")}
                >
                  <Moon className="w-5 h-5 stroke-[3]" /> Dark
                </button>
                <button 
                  onClick={() => setTheme("system")}
                  className={getBrutalistBtnClass(theme === "system")}
                >
                  <Monitor className="w-5 h-5 stroke-[3]" /> System
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Accessibility Settings */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>Accessibility</h2>
            <p className={brutalistCardDesc}>Make the site easier to use.</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Text Size */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>Text Size</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setTextSize("normal")}
                  className={getBrutalistBtnClass(textSize === "normal")}
                >
                  <Type className="w-5 h-5 stroke-[3]" /> Normal
                </button>
                <button 
                  onClick={() => setTextSize("large")}
                  className={getBrutalistBtnClass(textSize === "large")}
                >
                  <Type className="w-6 h-6 stroke-[3]" /> Large
                </button>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>Reduced Motion</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setReducedMotion(false)}
                  className={getBrutalistBtnClass(!reducedMotion)}
                >
                  Animated
                </button>
                <button 
                  onClick={() => setReducedMotion(true)}
                  className={getBrutalistBtnClass(reducedMotion)}
                >
                  <EyeOff className="w-5 h-5 stroke-[3]" /> Reduced
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Display Preferences */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>Layout</h2>
            <p className={brutalistCardDesc}>Customize how content is presented.</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Projects View */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>Projects View Default</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setProjectsView("grid")}
                  className={getBrutalistBtnClass(projectsView === "grid")}
                >
                  <LayoutGrid className="w-5 h-5 stroke-[3]" /> Grid
                </button>
                <button 
                  onClick={() => setProjectsView("list")}
                  className={getBrutalistBtnClass(projectsView === "list")}
                >
                  <List className="w-5 h-5 stroke-[3]" /> List
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Data & Privacy */}
        <div className={cn(brutalistCard, "border-destructive")}>
          <div className={cn(brutalistCardHeader, "bg-destructive text-destructive-foreground border-destructive")}>
            <h2 className={cn(brutalistCardTitle, "text-destructive-foreground")}>Danger Zone</h2>
            <p className={cn(brutalistCardDesc, "text-destructive-foreground opacity-90")}>Manage your stored preferences.</p>
          </div>
          <div className={brutalistCardContent}>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-sm font-bold uppercase tracking-widest text-foreground leading-relaxed">
                Atur ulang semua preferensi dan pengaturan Anda ke bawaan pabrik. Tindakan ini akan menghapus semua konfigurasi personalisasi yang telah Anda buat.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4 w-full">
                <button 
                  onClick={resetSettings}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-destructive text-destructive-foreground font-black uppercase tracking-widest border-[3px] border-foreground hover:bg-foreground hover:text-background transition-all shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                >
                  <RefreshCw className="w-5 h-5 stroke-[3]" />
                  Reset All Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
