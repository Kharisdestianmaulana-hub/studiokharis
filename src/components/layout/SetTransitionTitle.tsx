"use client";

import { useEffect } from "react";
import { useTransitionStore } from "@/store/useTransitionStore";

export function SetTransitionTitle({ title }: { title: string }) {
  useEffect(() => {
    useTransitionStore.getState().setTransitionTitle(title);
    return () => {
      useTransitionStore.getState().setTransitionTitle("");
    };
  }, [title]);
  
  return null;
}
