import * as React from "react";

export function Highlighter({ text, query }: { text: string; query?: string }) {
  if (!query) return <span>{text}</span>;

  // Split text by the query, case-insensitive
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#DFFF00] text-black rounded-none px-1 font-black border-[2px] border-black mx-[2px] shadow-[2px_2px_0_0_#000]">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
