"use client";

import { useSettingsStore, AccentColor } from "@/store/settingsStore";
import { useStoryStore } from "@/store/useStoryStore";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, Monitor, Type, EyeOff, LayoutGrid, List, RefreshCw, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SettingsContent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const { 
    accentColor, 
    reducedMotion, 
    textSize, 
    projectsView, 
    setAccentColor, 
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
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-secondary-text">Loading preferences...</p>
        </div>
      </div>
    );
  }

  const accentOptions: { id: AccentColor; label: string; colorClass: string }[] = [
    { id: "blue", label: "Blue", colorClass: "bg-blue-500" },
    { id: "green", label: "Green", colorClass: "bg-green-500" },
    { id: "purple", label: "Purple", colorClass: "bg-purple-500" },
    { id: "orange", label: "Orange", colorClass: "bg-orange-500" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-secondary-text">Customize your experience on this portfolio.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Appearance Settings */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-xl">Appearance</CardTitle>
            <CardDescription>Adjust the visual theme and colors.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            
            {/* Theme Toggle */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Theme</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className={cn("gap-2", theme === "light" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <Sun className="w-4 h-4" /> Light
                </Button>
                <Button 
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className={cn("gap-2", theme === "dark" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <Moon className="w-4 h-4" /> Dark
                </Button>
                <Button 
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className={cn("gap-2", theme === "system" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <Monitor className="w-4 h-4" /> System
                </Button>
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Accent Color</span>
              <div className="flex flex-wrap gap-3">
                {accentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAccentColor(opt.id)}
                    title={opt.label}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ring-offset-2 ring-offset-background",
                      opt.colorClass,
                      accentColor === opt.id ? "ring-2 ring-foreground scale-110" : "hover:scale-105 opacity-80 hover:opacity-100"
                    )}
                  />
                ))}
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-xl">Accessibility</CardTitle>
            <CardDescription>Make the site easier to use.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            
            {/* Text Size */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Text Size</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={textSize === "normal" ? "default" : "outline"}
                  onClick={() => setTextSize("normal")}
                  className={cn("gap-2", textSize === "normal" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <Type className="w-4 h-4" /> Normal
                </Button>
                <Button 
                  variant={textSize === "large" ? "default" : "outline"}
                  onClick={() => setTextSize("large")}
                  className={cn("gap-2", textSize === "large" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <Type className="w-5 h-5" /> Large
                </Button>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Reduced Motion</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={!reducedMotion ? "default" : "outline"}
                  onClick={() => setReducedMotion(false)}
                  className={cn("gap-2", !reducedMotion && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  Default (Animated)
                </Button>
                <Button 
                  variant={reducedMotion ? "default" : "outline"}
                  onClick={() => setReducedMotion(true)}
                  className={cn("gap-2", reducedMotion && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <EyeOff className="w-4 h-4" /> Reduce Motion
                </Button>
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-xl">Display Preferences</CardTitle>
            <CardDescription>Customize how content is presented.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            
            {/* Projects View */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Projects View Default</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={projectsView === "grid" ? "default" : "outline"}
                  onClick={() => setProjectsView("grid")}
                  className={cn("gap-2", projectsView === "grid" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <LayoutGrid className="w-4 h-4" /> Grid
                </Button>
                <Button 
                  variant={projectsView === "list" ? "default" : "outline"}
                  onClick={() => setProjectsView("list")}
                  className={cn("gap-2", projectsView === "list" && "bg-accent text-white hover:bg-accent/90 border-transparent")}
                >
                  <List className="w-4 h-4" /> List
                </Button>
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-surface border-border border-destructive/20">
          <CardHeader>
            <CardTitle className="text-xl text-destructive">Data & Privacy</CardTitle>
            <CardDescription>Manage your stored preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 items-start">
              <p className="text-sm text-secondary-text">
                Ulangi kembali pengalaman naratif Visual Novel dari awal, atau atur ulang semua preferensi Anda ke bawaan pabrik.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    useStoryStore.getState().setHasChosen(false);
                    useStoryStore.getState().resetStory();
                    window.location.href = "/";
                  }}
                  className="gap-2 border-border hover:bg-secondary/20 hover:text-foreground"
                >
                  <BookOpen className="w-4 h-4" />
                  Restart Story Mode
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={resetSettings}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset All Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
