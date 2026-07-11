"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { HoverLink } from "./HoverLink";
import { useSearchDictionary } from "@/hooks/useSearchDictionary";

interface HoverBadgeProps {
  tech: string;
}

export function HoverBadge({ tech }: HoverBadgeProps) {
  const dictionary = useSearchDictionary();

  const matchedItem = dictionary?.find(item => item.title.toLowerCase() === tech.toLowerCase());

  if (matchedItem) {
    return (
      <HoverLink data={matchedItem} noUnderline className="!border-0">
        <Badge variant="secondary" className="bg-secondary/10 text-secondary-text hover:bg-secondary/20 rounded-md font-normal text-xs transition-colors">
          {tech}
        </Badge>
      </HoverLink>
    );
  }

  // Fallback if not found in dictionary
  return (
    <Badge variant="secondary" className="bg-secondary/10 text-secondary-text hover:bg-secondary/20 rounded-md font-normal text-xs">
      {tech}
    </Badge>
  );
}
