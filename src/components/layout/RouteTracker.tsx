"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransitionStore } from "@/store/useTransitionStore";

export function RouteTracker() {
  const pathname = usePathname();
  
  const setPreviousPath = useTransitionStore(s => s.setPreviousPath);
  
  useEffect(() => {
    return () => {
      setPreviousPath(pathname);
    };
  }, [pathname, setPreviousPath]);
  
  return null;
}
