"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { ImageViewer } from "./ImageViewer";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [mainImage, setMainImage] = React.useState(images[0]);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border shadow-sm bg-secondary/5 flex items-center justify-center">
        <Image 
          src={mainImage} 
          alt={`${title} Preview`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
        
        {/* Fullscreen Button overlay */}
        <button
          onClick={() => setIsViewerOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 bg-background/80 hover:bg-background text-foreground backdrop-blur-md rounded-xl border border-border shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          title="View Fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails (Only show if there's more than 1 image) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(image)}
              className={cn(
                "relative aspect-video w-full rounded-lg overflow-hidden border-2 transition-all",
                mainImage === image 
                  ? "border-accent shadow-md opacity-100" 
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
              )}
            >
              <Image 
                src={image} 
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 16vw"
              />
            </button>
          ))}
        </div>
      )}

      <ImageViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        imageSrc={mainImage} 
        altText={title} 
      />
    </div>
  );
}
