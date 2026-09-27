"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Type, EyeOff, LayoutGrid, List, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function SettingsContent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { dict } = useLanguage();
  
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
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">{dict.settings.title}</h1>
          <p className="font-bold tracking-widest text-xs uppercase text-foreground">{dict.settings.loading}</p>
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
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase">{dict.settings.title}</h1>
        <p className="font-bold tracking-widest text-xs uppercase text-foreground border-[3px] border-foreground bg-accent text-accent-foreground px-4 py-2 w-fit shadow-[4px_4px_0_0_var(--foreground)]">{dict.settings.subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Appearance Settings */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>{dict.settings.appearance}</h2>
            <p className={brutalistCardDesc}>{dict.settings.appearanceDesc}</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Theme Toggle */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>{dict.settings.theme}</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setTheme("light")}
                  className={getBrutalistBtnClass(theme === "light")}
                >
                  <Sun className="w-5 h-5 stroke-[3]" /> {dict.settings.lightMode}
                </button>
                <button 
                  onClick={() => setTheme("dark")}
                  className={getBrutalistBtnClass(theme === "dark")}
                >
                  <Moon className="w-5 h-5 stroke-[3]" /> {dict.settings.darkMode}
                </button>
                <button 
                  onClick={() => setTheme("system")}
                  className={getBrutalistBtnClass(theme === "system")}
                >
                  <Monitor className="w-5 h-5 stroke-[3]" /> {dict.settings.system}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Accessibility Settings */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>{dict.settings.accessibility}</h2>
            <p className={brutalistCardDesc}>{dict.settings.accessibilityDesc}</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Text Size */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>{dict.settings.textSize}</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setTextSize("normal")}
                  className={getBrutalistBtnClass(textSize === "normal")}
                >
                  <Type className="w-5 h-5 stroke-[3]" /> {dict.settings.textNormal}
                </button>
                <button 
                  onClick={() => setTextSize("large")}
                  className={getBrutalistBtnClass(textSize === "large")}
                >
                  <Type className="w-6 h-6 stroke-[3]" /> {dict.settings.textLarge}
                </button>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>{dict.settings.reduceMotion}</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setReducedMotion(false)}
                  className={getBrutalistBtnClass(!reducedMotion)}
                >
                  {dict.settings.motionAnimated}
                </button>
                <button 
                  onClick={() => setReducedMotion(true)}
                  className={getBrutalistBtnClass(reducedMotion)}
                >
                  <EyeOff className="w-5 h-5 stroke-[3]" /> {dict.settings.motionReduced}
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Display Preferences */}
        <div className={brutalistCard}>
          <div className={brutalistCardHeader}>
            <h2 className={brutalistCardTitle}>{dict.settings.layout}</h2>
            <p className={brutalistCardDesc}>{dict.settings.layoutDesc}</p>
          </div>
          <div className={brutalistCardContent}>
            
            {/* Projects View */}
            <div className="flex flex-col gap-4">
              <span className={brutalistLabel}>{dict.settings.projectsView}</span>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setProjectsView("grid")}
                  className={getBrutalistBtnClass(projectsView === "grid")}
                >
                  <LayoutGrid className="w-5 h-5 stroke-[3]" /> {dict.settings.viewGrid}
                </button>
                <button 
                  onClick={() => setProjectsView("list")}
                  className={getBrutalistBtnClass(projectsView === "list")}
                >
                  <List className="w-5 h-5 stroke-[3]" /> {dict.settings.viewList}
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Data & Privacy */}
        <div className={cn(brutalistCard, "border-destructive")}>
          <div className={cn(brutalistCardHeader, "bg-destructive text-destructive-foreground border-destructive")}>
            <h2 className={cn(brutalistCardTitle, "text-destructive-foreground")}>{dict.settings.dangerZone}</h2>
            <p className={cn(brutalistCardDesc, "text-destructive-foreground opacity-90")}>{dict.settings.dangerDesc}</p>
          </div>
          <div className={brutalistCardContent}>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-sm font-bold uppercase tracking-widest text-foreground leading-relaxed">
                {dict.settings.resetWarning}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4 w-full">
                <button 
                  onClick={resetSettings}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-destructive text-destructive-foreground font-black uppercase tracking-widest border-[3px] border-foreground hover:bg-foreground hover:text-background transition-all shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
                >
                  <RefreshCw className="w-5 h-5 stroke-[3]" />
                  {dict.settings.resetSettings}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
