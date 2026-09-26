"use client";

import React, { useState } from "react";
import { getTechIcon } from "@/lib/tech-icons";

interface HybridIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HybridIcon({ name, className, style }: HybridIconProps) {
  const { icon: Icon, color, isDefault } = getTechIcon(name);
  const [imgError, setImgError] = useState(false);

  // If it's a known mapped icon, OR if the CDN fallback failed, render the mapped/default icon
  if (!isDefault || imgError) {
    return <Icon className={className} style={{ color, ...style }} />;
  }

  // Convert name to simpleicons slug (e.g. "Svelte" -> "svelte")
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}`} 
      alt={name} 
      className={className}
      style={style}
      onError={() => setImgError(true)}
    />
  );
}
