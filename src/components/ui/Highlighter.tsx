import * as React from "react";

export function Highlighter({ text, query }: { text: string; query?: string }) {
  if (!query) return <span>{text}</span>;

  // Split text by the query, case-insensitive
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-accent rounded-sm px-0.5 font-medium">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
