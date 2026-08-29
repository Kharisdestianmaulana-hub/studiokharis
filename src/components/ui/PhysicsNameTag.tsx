"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PhysicsNameTag({ profileData }: { profileData: any }) {
  // Motion values to track the drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotate opposite to the drag direction to simulate hanging physics
  // When pulled right (x is positive), the bottom swings right, so it rotates counter-clockwise (negative)
  const rotate = useTransform(x, [-200, 200], [25, -25]);
  
  // 3D Tilt Effect: mapping drag x,y to 3D rotation
  const rotateY = useTransform(x, [-200, 200], [-30, 30]);
  const rotateX = useTransform(y, [-200, 200], [30, -30]);

  // The distance between the anchor (pin) and the name tag hole is 80px (mt-[80px]) + 16px (p-4) = 96px
  // We add this offset so the line always connects from (0,0) to the moving hole.
  const stringY = useTransform(y, (latestY) => latestY + 96);

  return (
    <div className="relative w-48 h-[250px] flex flex-col items-center hidden lg:flex mt-4" style={{ perspective: 1200 }}>
      {/* Anchor Pin */}
      <div className="absolute top-0 w-3 h-3 rounded-none bg-zinc-300 dark:bg-zinc-600 shadow-inner z-10 border border-zinc-400 dark:border-zinc-500" />

      {/* Dynamic Lanyard String */}
      <svg className="absolute top-1.5 left-1/2 overflow-visible z-0 pointer-events-none">
        <motion.line
          x1={0}
          y1={0}
          x2={x}
          y2={stringY}
          stroke="currentColor"
          strokeWidth={2}
          className="text-zinc-300 dark:text-zinc-700"
        />
      </svg>

      {/* The Physics Card */}
      <motion.div
        drag
        // Constrain to 0 so it always springs back to the center
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.6}
        // Lower damping means it will swing back and forth multiple times like a pendulum
        dragTransition={{ bounceStiffness: 100, bounceDamping: 3 }}
        whileDrag={{ 
          scale: 1.05, 
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
          cursor: "grabbing"
        }}
        style={{ x, y, rotate, rotateX, rotateY }}
        className="mt-[80px] w-48 bg-white/90 dark:bg-[#18181B]/90 backdrop-blur-md border border-border rounded-none shadow-2xl p-4 flex flex-col items-center cursor-grab z-20"
      >
        {/* Hole for the lanyard */}
        <div className="w-4 h-1.5 rounded-none bg-zinc-200 dark:bg-zinc-800 shadow-inner mb-4" />

        <Avatar className="w-16 h-16 border-2 border-border mb-3 shadow-sm">
          <AvatarImage src={profileData?.avatarUrl || "/avatar.jpg"} alt={profileData?.name || "User"} />
          <AvatarFallback>{profileData?.name?.substring(0, 2).toUpperCase() || "US"}</AvatarFallback>
        </Avatar>

        <h3 className="font-bold text-foreground text-center leading-tight">
          {profileData?.name || "Kharis"}
        </h3>
        <p className="text-xs text-muted text-center mt-1 mb-3">
          {profileData?.tagline || "Software Engineer"}
        </p>

        {/* Small barcode visual */}
        <div className="w-full flex justify-center items-center gap-[2px] opacity-20">
          <div className="w-1 h-4 bg-foreground" />
          <div className="w-2 h-4 bg-foreground" />
          <div className="w-0.5 h-4 bg-foreground" />
          <div className="w-1.5 h-4 bg-foreground" />
          <div className="w-1 h-4 bg-foreground" />
          <div className="w-3 h-4 bg-foreground" />
          <div className="w-0.5 h-4 bg-foreground" />
          <div className="w-1 h-4 bg-foreground" />
          <div className="w-2 h-4 bg-foreground" />
        </div>
      </motion.div>
    </div>
  );
}
