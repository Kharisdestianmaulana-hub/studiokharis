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
    <ToolLayout title="Markdown Preview" desc="WRITE AND PREVIEW MARKDOWN IN REAL-TIME." maxWidth="max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]">
        <div className="flex flex-col gap-2 h-full min-h-[500px]">
          <label className="font-black uppercase tracking-widest text-sm shrink-0">Markdown Input</label>
          <textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full p-4 border-[3px] border-foreground bg-surface text-foreground font-mono resize-none focus:outline-none focus:shadow-[8px_8px_0_0_var(--foreground)] transition-shadow"
            placeholder="Type your markdown here..."
          />
        </div>
        
        <div className="flex flex-col gap-2 h-full min-h-[500px]">
          <label className="font-black uppercase tracking-widest text-sm shrink-0">Live Preview</label>
          <div 
            className="w-full h-full p-6 border-[3px] border-foreground bg-background text-foreground markdown-body overflow-y-auto break-words"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-body h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; line-height: 1.2; }
        .markdown-body h2 { font-size: 2rem; font-weight: 900; margin-top: 1.5rem; margin-bottom: 1rem; line-height: 1.2; border-bottom: 3px solid var(--foreground); padding-bottom: 0.5rem; }
        .markdown-body h3 { font-size: 1.5rem; font-weight: 900; margin-top: 1.5rem; margin-bottom: 0.5rem; line-height: 1.2; }
        .markdown-body p { margin-bottom: 1rem; line-height: 1.6; }
        .markdown-body a { font-weight: bold; text-decoration: underline; text-underline-offset: 4px; }
        .markdown-body ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body li { margin-bottom: 0.25rem; }
        .markdown-body blockquote { border-left: 6px solid var(--foreground); padding-left: 1rem; font-style: italic; opacity: 0.9; margin: 1.5rem 0; background: var(--surface); padding: 1rem; font-weight: bold; }
        .markdown-body code { background: var(--foreground); color: var(--background); padding: 0.2rem 0.4rem; font-weight: bold; font-family: monospace; font-size: 0.9em; }
        .markdown-body pre { background: var(--foreground); color: var(--background); padding: 1rem; overflow-x: auto; font-weight: bold; margin-bottom: 1.5rem; border: 3px solid var(--foreground); box-shadow: 6px 6px 0 0 rgba(0,0,0,0.2); }
        .markdown-body pre code { background: transparent; padding: 0; color: inherit; font-size: 0.85em; }
        .markdown-body hr { border: none; border-bottom: 3px dashed var(--foreground); margin: 2rem 0; }
        
        /* Tables */
        .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; border: 3px solid var(--foreground); }
        .markdown-body th, .markdown-body td { border: 2px solid var(--foreground); padding: 0.75rem; text-align: left; }
        .markdown-body th { background-color: var(--foreground); color: var(--background); font-weight: 900; text-transform: uppercase; }
        .markdown-body tr:nth-child(even) { background-color: var(--surface); }
      `}} />
    </ToolLayout>
  );
}
