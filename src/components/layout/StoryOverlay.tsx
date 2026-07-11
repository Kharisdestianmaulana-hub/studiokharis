"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStoryStore } from "@/store/useStoryStore";
import { storyData } from "@/data/storyData";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StoryOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const { isStoryMode, currentStep, nextStep, setStep, setCurrentChapter, resetStory } = useStoryStore();
  
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Sync current chapter with pathname
  React.useEffect(() => {
    setCurrentChapter(pathname);
  }, [pathname, setCurrentChapter]);

  const chapterData = storyData[pathname] || [];
  const currentScript = chapterData[currentStep];

  // Typewriter effect
  React.useEffect(() => {
    if (!isStoryMode || !currentScript) return;

    // Clear existing timers
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

    setDisplayedText("");
    setIsTyping(true);

    let i = 0;
    const fullText = currentScript.text;
    
    const typeNextChar = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
        typingTimerRef.current = setTimeout(typeNextChar, 30); // Typing speed
      } else {
        setIsTyping(false);
        // Auto-advance after reading time (e.g. 5 seconds + length based)
        const readingTime = Math.max(3000, fullText.length * 60);
        autoAdvanceTimerRef.current = setTimeout(handleNext, readingTime);
      }
    };

    typeNextChar();

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, currentScript, isStoryMode]);

  const handleNext = () => {
    if (!currentScript) return;

    if (currentScript.action === "navigate" && currentScript.target) {
      router.push(currentScript.target);
    } else if (currentStep < chapterData.length - 1) {
      nextStep();
    }
  };

  const handleSkipAnimation = () => {
    if (isTyping && currentScript) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setDisplayedText(currentScript.text);
      setIsTyping(false);
      
      const readingTime = Math.max(3000, currentScript.text.length * 60);
      autoAdvanceTimerRef.current = setTimeout(handleNext, readingTime);
    } else {
      handleNext();
    }
  };

  if (!isStoryMode || !currentScript) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center lg:pl-[280px] pointer-events-none"
      >
        <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden p-6 relative group w-[90%] max-w-3xl pointer-events-auto">
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={resetStory} className="h-8 text-xs text-muted hover:text-foreground">
              <X className="w-4 h-4 mr-1" /> Akhiri Story
            </Button>
          </div>

          <div className="min-h-[80px] flex flex-col justify-center cursor-pointer" onClick={handleSkipAnimation}>
            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
              {displayedText}
              {isTyping && <span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse" />}
            </p>
          </div>

          <div className="mt-4 flex justify-between items-center border-t border-border/50 pt-4">
            <div className="text-xs text-muted font-mono">
              [ {currentStep + 1} / {chapterData.length} ]
            </div>
            
            <Button 
              onClick={handleSkipAnimation}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6"
            >
              {isTyping ? (
                <>Lewati <SkipForward className="w-4 h-4 ml-2" /></>
              ) : (
                <>Lanjut <ChevronRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
