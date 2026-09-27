"use client";

import * as React from "react";
import { Download, Printer } from "lucide-react";

export function CvClient({ 
  resumeUrl, 
  resumeViewUrl 
}: { 
  resumeUrl: string;
  resumeViewUrl?: string; 
}) {
  const handlePrint = () => {
    window.print();
  };

  const urlToEmbed = resumeViewUrl || resumeUrl;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
      {/* Brutalist Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <a 
          href={resumeUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex-1"
        >
          <button className="w-full bg-foreground text-background border-[3px] border-foreground text-sm font-black py-4 px-6 rounded-none hover:bg-background hover:text-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </a>
        <button 
          onClick={handlePrint}
          className="flex-1 bg-surface text-foreground border-[3px] border-foreground text-sm font-black py-4 px-6 rounded-none hover:bg-foreground hover:text-background hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          <Printer className="w-5 h-5" />
          Print Page
        </button>
      </div>

      {/* Brutalist PDF Viewer Wrapper */}
      <div className="relative w-full aspect-[1/1.4] sm:aspect-[1/1.2] lg:aspect-auto lg:h-[800px] border-[3px] border-foreground bg-accent shadow-[8px_8px_0_0_var(--foreground)] overflow-hidden group">
        {/* Decorative Tape / Corners for Brutalism */}
        <div className="absolute top-0 left-0 w-8 h-8 border-b-[3px] border-r-[3px] border-foreground pointer-events-none z-10 bg-background" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-t-[3px] border-l-[3px] border-foreground pointer-events-none z-10 bg-background" />
        
        {/* Warning if PDF doesn't load */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 -z-10 pointer-events-none">
          <p className="font-black text-2xl uppercase tracking-widest opacity-20">Loading Document...</p>
        </div>

        <iframe 
          src={urlToEmbed} 
          className="w-full h-full relative z-0 border-none bg-white"
          title="Resume PDF Viewer"
        />
      </div>
    </div>
  );
}
