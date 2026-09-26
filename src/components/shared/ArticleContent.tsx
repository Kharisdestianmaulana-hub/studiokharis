"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleContentProps {
  content: string;
}

function formatContent(text: string) {
  if (!text) return "";
  
  // Split by double newline to get blocks
  const blocks = text.split(/\n\n+/);
  
  const formattedBlocks = blocks.map(block => {
    const parts = block.split(/\n/);
    
    // Case 1: Heading is separated from paragraph by a single newline
    if (parts.length >= 2) {
      const firstLine = parts[0].trim();
      if (firstLine.length > 0 && firstLine.length < 80 && !firstLine.match(/[.,!?:]$/) && !firstLine.match(/^[#*\-]/)) {
        parts[0] = `## ${firstLine}`;
        return parts.join('\n\n'); 
      }
    } 
    // Case 2: Heading is in its own isolated block (user pressed Enter twice)
    else if (parts.length === 1) {
      const line = parts[0].trim();
      // If the block is a single short line without ending punctuation, treat it as a heading
      // Exception for quotes starting with "
      if (line.length > 0 && line.length < 80 && !line.match(/[.,!?:]$/) && !line.match(/^[#*\-]/) && !line.startsWith('"')) {
        return `## ${line}`;
      }
    }
    
    // Default: Rejoin with double newlines so ReactMarkdown treats them as separate paragraphs (if there were single newlines inside)
    return parts.join('\n\n'); 
  });
  
  return formattedBlocks.join('\n\n');
}

export function ArticleContent({ content }: ArticleContentProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Format content before passing to ReactMarkdown
  const formattedContent = formatContent(content);

  useEffect(() => {
    if (!contentRef.current) return;

    // Use setTimeout to ensure ReactMarkdown has finished rendering the DOM
    const timeoutId = setTimeout(() => {
      if (!contentRef.current) return;
      
      const headings = Array.from(contentRef.current.querySelectorAll("h1, h2, h3"));
      
      const items: TOCItem[] = headings.map((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || "";
          heading.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `heading-${index}`;
        }
        return {
          id: heading.id,
          text: heading.textContent || "",
          level: Number(heading.tagName.replace("H", ""))
        };
      });

      setToc(items);

      const observer = new IntersectionObserver(
        (entries) => {
          // Find all intersecting entries
          const visibleEntries = entries.filter(e => e.isIntersecting);
          if (visibleEntries.length > 0) {
            // Pick the first one in the viewport
            setActiveId(visibleEntries[0].target.id);
          }
        },
        { rootMargin: "-100px 0px -60% 0px" } // Adjust margins so active state triggers better
      );

      headings.forEach((heading) => observer.observe(heading));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [formattedContent]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-8 items-start relative">
      {/* Content */}
      <div 
        ref={contentRef}
        className="prose prose-neutral dark:prose-invert max-w-none lg:w-[70%] p-6 md:p-10 border-[3px] border-foreground bg-background shadow-[8px_8px_0_0_var(--foreground)] prose-p:font-medium prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:scroll-mt-24 prose-img:border-[3px] prose-img:border-foreground prose-img:shadow-[6px_6px_0_0_var(--foreground)] prose-a:text-accent prose-a:font-bold prose-a:decoration-[3px] prose-a:underline-offset-4 prose-blockquote:border-l-[6px] prose-blockquote:border-foreground prose-blockquote:bg-surface prose-blockquote:p-4 prose-blockquote:font-bold prose-blockquote:not-italic prose-strong:font-black"
      >
        <ReactMarkdown>{formattedContent}</ReactMarkdown>
      </div>

      {/* Sidebar TOC */}
      {toc.length > 0 && (
        <aside className="hidden lg:block lg:w-[30%] sticky top-24 shrink-0">
          <div className="bg-background border-[3px] border-foreground p-6 shadow-[8px_8px_0_0_var(--foreground)]">
            <h4 className="font-black uppercase tracking-widest text-foreground flex items-center gap-2 mb-6 border-b-[3px] border-foreground pb-4">
              <List className="w-5 h-5 stroke-[3]" />
              Table of Contents
            </h4>
            <nav className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "text-sm uppercase font-bold tracking-wider transition-all px-2 py-1.5 border-[2px] border-transparent",
                    item.level === 3 && "pl-6",
                    item.level === 4 && "pl-10",
                    activeId === item.id 
                      ? "text-background bg-foreground border-foreground shadow-[2px_2px_0_0_var(--color-accent)] translate-x-1" 
                      : "text-foreground hover:bg-accent hover:text-accent-foreground hover:border-foreground hover:translate-x-1 hover:shadow-[2px_2px_0_0_var(--foreground)]"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
