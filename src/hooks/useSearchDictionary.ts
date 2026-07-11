"use client";

import * as React from "react";
import { HoverLinkData } from "@/components/ui/HoverLink";

let globalDictionary: HoverLinkData[] | null = null;
let fetchPromise: Promise<HoverLinkData[]> | null = null;

export function useSearchDictionary() {
  const [dictionary, setDictionary] = React.useState<HoverLinkData[] | null>(globalDictionary);

  React.useEffect(() => {
    if (dictionary) return;

    if (!fetchPromise) {
      fetchPromise = fetch('/api/search')
        .then(res => res.json())
        .then(data => {
          const sorted = (data as HoverLinkData[]).sort((a, b) => b.title.length - a.title.length);
          globalDictionary = sorted;
          return sorted;
        })
        .catch(err => {
          console.error("Failed to fetch search dictionary", err);
          return [];
        });
    }

    fetchPromise.then(setDictionary);
  }, [dictionary]);

  return dictionary;
}
