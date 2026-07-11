"use client";

import { usePathname } from "next/navigation";
import { useStoryStore } from "@/store/useStoryStore";
import { useEffect } from "react";

export function RouteTracker() {
  const pathname = usePathname();
  const setPreviousPath = useStoryStore(s => s.setPreviousPath);
  
  useEffect(() => {
    return () => {
      setPreviousPath(pathname);
    };
  }, [pathname, setPreviousPath]);
  
  return null;
}
