"use client";
import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Dices } from "lucide-react";

export default function DecisionMaker() {
  const { dict } = useLanguage();
  const [optionsText, setOptionsText] = useState("Pizza\nBurger\nSushi\nNasi Goreng\nSate Ayam");
  const [spinning, setSpinning] = useState(false);
  const [currentFlash, setCurrentFlash] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  
  const handleSpin = () => {
    const rawOptions = optionsText.split("\n").map(opt => opt.trim()).filter(opt => opt.length > 0);
    if (rawOptions.length < 2) {
      alert("Please enter at least 2 options!");
      return;
    }

    setSpinning(true);
    setWinner(null);

    let count = 0;
    const maxSpins = 30 + Math.floor(Math.random() * 20); // 30-50 flashes
    let currentSpeed = 50;

    const flash = () => {
      const randomOpt = rawOptions[Math.floor(Math.random() * rawOptions.length)];
      setCurrentFlash(randomOpt);
      
      count++;
      if (count < maxSpins) {
        // Slow down at the end
        if (count > maxSpins - 10) {
          currentSpeed += 30;
        }
        setTimeout(flash, currentSpeed);
      } else {
        // Pick final winner
        const finalWinner = rawOptions[Math.floor(Math.random() * rawOptions.length)];
        setCurrentFlash(null);
        setWinner(finalWinner);
        setSpinning(false);
      }
    };

    flash();
  };

  return (
    <ToolLayout title={dict.toolbox.tools.decision.title} desc={dict.toolbox.tools.decision.desc} maxWidth="max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px]">
        {/* Kontrol Kiri */}
        <div className="flex flex-col gap-4">
          <label className="font-black uppercase tracking-widest text-sm">Enter Options (One per line)</label>
          <textarea
            value={optionsText}
            onChange={(e) => setOptionsText(e.target.value)}
            disabled={spinning}
            className="flex-1 w-full min-h-[300px] p-4 border-[3px] border-foreground bg-surface text-foreground font-mono resize-none focus:outline-none focus:shadow-[8px_8px_0_0_var(--foreground)] transition-all disabled:opacity-50"
            placeholder="Option 1\nOption 2\nOption 3"
          />
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="py-4 font-black uppercase tracking-widest text-xl border-[3px] border-foreground flex items-center justify-center gap-2 bg-foreground text-background hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)] transition-all active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <Dices className="w-6 h-6" />
            {spinning ? "DECIDING..." : "RANDOMIZE"}
          </button>
        </div>
        
        {/* Hasil Kanan */}
        <div className="flex flex-col gap-2 relative h-full min-h-[300px]">
          <label className="font-black uppercase tracking-widest text-sm text-center lg:text-left">Result</label>
          <div className="flex-1 w-full border-[3px] border-foreground flex items-center justify-center bg-background shadow-[8px_8px_0_0_var(--foreground)] overflow-hidden relative p-8">
            
            {!spinning && !winner && (
              <div className="text-muted-foreground font-black uppercase tracking-widest text-center opacity-50">
                WAITING FOR INPUT...
              </div>
            )}
            
            {spinning && currentFlash && (
              <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center break-words w-full animate-pulse text-foreground mix-blend-difference">
                {currentFlash}
              </div>
            )}

            {winner && (
              <div className="flex flex-col items-center justify-center gap-6 animate-in zoom-in-50 duration-300 w-full">
                <div className="text-sm font-black uppercase tracking-widest px-4 py-1 border-[2px] border-foreground bg-surface">
                  THE WINNER IS
                </div>
                <div className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-center break-words w-full bg-foreground text-background p-4 shadow-[8px_8px_0_0_var(--foreground)] -rotate-2">
                  {winner}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
