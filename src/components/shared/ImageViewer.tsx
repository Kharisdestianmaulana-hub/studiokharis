"use client";

import * as React from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText?: string;
}

export function ImageViewer({ isOpen, onClose, imageSrc, altText = "Image preview" }: ImageViewerProps) {
  const [scale, setScale] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStart = React.useRef({ x: 0, y: 0 });
  
  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onWheel={handleWheel}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 z-[110] flex items-center gap-4 bg-black/50 p-2 rounded-xl backdrop-blur-md border border-white/10">
            <button 
              onClick={handleZoomOut}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white/90 text-sm font-medium w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button 
              onClick={handleReset}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button 
              onClick={onClose}
              className="p-2 text-white/70 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
          >
            <div
              className={cn(
                "relative transition-transform duration-200 ease-out",
                isDragging ? "cursor-grabbing duration-0" : "cursor-grab"
              )}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img 
                src={imageSrc}
                alt={altText}
                className="max-h-[90vh] max-w-[90vw] object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
