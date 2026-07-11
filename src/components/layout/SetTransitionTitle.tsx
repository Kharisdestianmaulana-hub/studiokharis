"use client";

import { useEffect } from "react";
import { useStoryStore } from "@/store/useStoryStore";

export function SetTransitionTitle({ title }: { title: string }) {
  useEffect(() => {
    useStoryStore.getState().setTransitionTitle(title);
    return () => {
      // Clear title on unmount if needed, but not strictly necessary since next page sets it or default logic applies
      useStoryStore.getState().setTransitionTitle("");
    };
  }, [title]);
  
  return null;
}
