"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WordCounter() {
  const { dict } = useLanguage();
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const readingTime = Math.ceil(words / 200);
  
  return (
    <ToolLayout title={dict.toolbox.tools.wordCount.title} desc={dict.toolbox.tools.wordCount.desc}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: "Words", val: words },
          { label: "Characters", val: chars },
          { label: "No Spaces", val: charsNoSpaces },
          { label: "Min Read", val: readingTime },
        ].map((stat, i) => (
          <div key={i} className={`p-4 border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] text-background bg-foreground flex flex-col items-center justify-center`}>
            <span className="text-3xl font-black">{stat.val}</span>
            <span className="text-xs font-black uppercase tracking-widest mt-1 text-center">{stat.label}</span>
          </div>
        ))}
      </div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="w-full h-[400px] p-6 border-[3px] border-foreground bg-surface rounded-none focus:outline-none focus:shadow-[6px_6px_0_0_var(--foreground)] transition-shadow font-bold text-lg leading-relaxed text-foreground"
        placeholder="Type or paste your text here..."
      />
    </ToolLayout>
  );
}
