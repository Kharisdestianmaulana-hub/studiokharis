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
    // If a block has a single newline, the first part might be a heading
    const parts = block.split(/\n/);
    if (parts.length >= 2) {
      const firstLine = parts[0].trim();
      // If it looks like a title (no ending punctuation, short, not already markdown)
      if (firstLine.length > 0 && firstLine.length < 80 && !firstLine.match(/[.!?:]$/) && !firstLine.match(/^[#*\-]/)) {
        parts[0] = `## ${firstLine}`;
      }
    }
    // Rejoin with double newlines so ReactMarkdown treats them as separate blocks
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
        className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:scroll-mt-24 prose-img:rounded-xl prose-a:text-accent lg:w-[70%]"
      >
        <ReactMarkdown>{formattedContent}</ReactMarkdown>
      </div>

      {/* Sidebar TOC */}
      {toc.length > 0 && (
        <aside className="hidden lg:block lg:w-[30%] sticky top-24 shrink-0">
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <List className="w-4 h-4" />
              Table of Contents
            </h4>
            <nav className="flex flex-col gap-2.5 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "text-sm transition-colors hover:text-accent line-clamp-2",
                    item.level === 3 && "pl-4",
                    item.level === 4 && "pl-8",
                    activeId === item.id 
                      ? "text-accent font-medium" 
                      : "text-muted"
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
