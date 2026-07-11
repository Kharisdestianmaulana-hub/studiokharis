"use client";

import * as React from "react";
import { useStoryStore } from "@/store/useStoryStore";
import { Button } from "@/components/ui/button";
import { Compass, BookOpen } from "lucide-react";

export function StoryPrologModal() {
  const { hasChosen, setHasChosen, setIsStoryMode } = useStoryStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (hasChosen) return null;

  const handleChoice = (isStory: boolean) => {
    setIsStoryMode(isStory);
    setHasChosen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-700">
      <div className="bg-surface/95 border border-border rounded-2xl p-8 max-w-lg w-[90%] shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-500 delay-300 fill-mode-both">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
          Selamat datang di dunia Kharis.
        </h2>
        <p className="text-secondary-text text-center mb-8 leading-relaxed">
          Bagaimana Anda ingin menjelajahi tempat ini? Anda bisa mengikuti panduan naratif interaktif, atau menjelajah dengan bebas sesuai keinginan Anda.
        </p>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => handleChoice(true)} 
            className="w-full py-6 text-lg rounded-xl bg-foreground text-background hover:bg-foreground/90 hover:text-background transition-all flex items-center justify-center gap-3 group"
          >
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Mulai Petualangan (Story Mode)
          </Button>
          
          <Button 
            onClick={() => handleChoice(false)} 
            variant="outline"
            className="w-full py-6 text-lg rounded-xl border-border bg-transparent hover:bg-secondary/20 hover:text-foreground transition-all flex items-center justify-center gap-3 group"
          >
            <Compass className="w-5 h-5 group-hover:scale-110 transition-transform text-muted" />
            Eksplorasi Bebas
          </Button>
        </div>
      </div>
    </div>
  );
}
