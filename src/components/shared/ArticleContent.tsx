"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all headings
    const headings = Array.from(contentRef.current.querySelectorAll("h1, h2, h3"));
    
    const items: TOCItem[] = headings.map((heading, index) => {
      // Assign an ID if it doesn't have one
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

    // Setup Intersection Observer for scrollspy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-8 items-start">
      {/* Content */}
      <div 
        ref={contentRef}
        className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-xl prose-a:text-accent lg:w-[70%]"
        dangerouslySetInnerHTML={{ __html: content }}
      />

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
