"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  const { dict } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Auto switch mode
      if (mode === "work") {
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("work");
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: "work" | "break") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "work" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <ToolLayout title="Pomodoro Timer" desc="STAY FOCUSED WITH BRUTALIST TIME MANAGEMENT.">
      <div className="flex flex-col items-center gap-8 border-[3px] border-foreground bg-surface p-8 shadow-[8px_8px_0_0_var(--foreground)]">
        
        <div className="flex gap-4">
          <button 
            onClick={() => switchMode("work")}
            className={`px-6 py-2 font-black uppercase tracking-widest border-[3px] border-foreground transition-all ${mode === "work" ? "bg-foreground text-background" : "bg-background text-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]"}`}
          >
            Work (25m)
          </button>
          <button 
            onClick={() => switchMode("break")}
            className={`px-6 py-2 font-black uppercase tracking-widest border-[3px] border-foreground transition-all ${mode === "break" ? "bg-foreground text-background" : "bg-background text-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]"}`}
          >
            Break (5m)
          </button>
        </div>

        <div className="text-8xl md:text-[150px] font-black tracking-tighter text-foreground tabular-nums leading-none">
          {minutes}:{seconds}
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          <button 
            onClick={toggleTimer}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isActive ? "PAUSE" : "START"}
          </button>
          <button 
            onClick={resetTimer}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-background text-foreground font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all"
          >
            <RotateCcw className="w-6 h-6" />
            RESET
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
