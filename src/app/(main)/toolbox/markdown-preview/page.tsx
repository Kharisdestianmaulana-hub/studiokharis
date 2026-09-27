"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { marked } from "marked";

export default function MarkdownPreview() {
  const { dict } = useLanguage();
  const [markdown, setMarkdown] = useState("# Hello World\n\nType your **markdown** here...\n\n- List item 1\n- List item 2");
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Compile markdown to HTML
    setHtml(marked.parse(markdown) as string);
  }, [markdown]);

  return (
    <ToolLayout title="Markdown Preview" desc="WRITE AND PREVIEW MARKDOWN IN REAL-TIME.">
      <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-black uppercase tracking-widest text-sm">Markdown Input</label>
          <textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full p-4 border-[3px] border-foreground bg-surface text-foreground font-mono resize-none focus:outline-none focus:shadow-[8px_8px_0_0_var(--foreground)] transition-shadow"
            placeholder="Type your markdown here..."
          />
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-black uppercase tracking-widest text-sm">Live Preview</label>
          <div 
            className="flex-1 w-full p-6 border-[3px] border-foreground bg-background text-foreground markdown-body overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-body h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; }
        .markdown-body h2 { font-size: 2rem; font-weight: 900; margin-top: 1.5rem; margin-bottom: 1rem; }
        .markdown-body h3 { font-size: 1.5rem; font-weight: 900; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .markdown-body p { margin-bottom: 1rem; }
        .markdown-body a { font-weight: bold; text-decoration: underline; }
        .markdown-body ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body blockquote { border-left: 5px solid currentColor; padding-left: 1rem; font-style: italic; opacity: 0.8; }
        .markdown-body code { background: var(--foreground); color: var(--background); padding: 0.2rem 0.4rem; font-weight: bold; }
        .markdown-body pre { background: var(--foreground); color: var(--background); padding: 1rem; overflow-x: auto; font-weight: bold; margin-bottom: 1rem; border: 3px solid var(--foreground); }
        .markdown-body pre code { background: transparent; padding: 0; color: inherit; }
        .markdown-body hr { border: none; border-bottom: 3px dashed currentColor; margin: 2rem 0; }
      `}} />
    </ToolLayout>
  );
}
