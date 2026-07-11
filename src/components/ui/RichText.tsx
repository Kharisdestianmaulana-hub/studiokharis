"use client";

import * as React from "react";
import { HoverLink, HoverLinkData } from "./HoverLink";

interface RichTextProps {
  content: string;
  className?: string;
}

// Global cache to prevent multiple fetches
let globalDictionary: HoverLinkData[] | null = null;
let fetchPromise: Promise<HoverLinkData[]> | null = null;

export function RichText({ content, className }: RichTextProps) {
  const [dictionary, setDictionary] = React.useState<HoverLinkData[] | null>(globalDictionary);

  React.useEffect(() => {
    if (dictionary) return;

    if (!fetchPromise) {
      fetchPromise = fetch('/api/search')
        .then(res => res.json())
        .then(data => {
          // Sort by length descending to match longer phrases first (e.g., "Next.js" before "Next")
          const sorted = (data as HoverLinkData[]).sort((a, b) => b.title.length - a.title.length);
          globalDictionary = sorted;
          return sorted;
        })
        .catch(err => {
          console.error("Failed to fetch search dictionary for RichText", err);
          return [];
        });
    }

    fetchPromise.then(setDictionary);
  }, [dictionary]);

  if (!dictionary || dictionary.length === 0) {
    // Fallback before dictionary loads: render basic text with basic line breaks support
    return (
      <div className={className}>
        {content.split(/<br\s*\/?>|\n/g).map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== content.split(/<br\s*\/?>|\n/g).length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Escape regex special characters
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  // Create a dictionary map for O(1) lookups by lowercase title
  const dictMap = new Map<string, HoverLinkData>();
  dictionary.forEach(item => {
    dictMap.set(item.title.toLowerCase(), item);
  });

  // Create regex pattern from all titles
  const pattern = dictionary
    .map(d => escapeRegExp(d.title))
    .join('|');
  
  // \b ensures word boundaries so we don't match substrings (e.g., "react" inside "reactor")
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

  // Parse the content
  // First, handle explicit <br> tags if they exist
  const lines = content.split(/<br\s*\/?>|\n/g);

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        if (!line.trim()) return <br key={`br-${lineIndex}`} />;

        // Split line by our keyword regex
        const parts = line.split(regex);
        
        return (
          <React.Fragment key={`line-${lineIndex}`}>
            {parts.map((part, partIndex) => {
              const matchedItem = dictMap.get(part.toLowerCase());
              
              if (matchedItem) {
                // If it's a known keyword, wrap it in a HoverLink
                return (
                  <HoverLink key={`part-${lineIndex}-${partIndex}`} data={matchedItem}>
                    {part}
                  </HoverLink>
                );
              }

              // Otherwise just return the plain text
              return <React.Fragment key={`part-${lineIndex}-${partIndex}`}>{part}</React.Fragment>;
            })}
            {lineIndex !== lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
