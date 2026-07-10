"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [mainImage, setMainImage] = React.useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border shadow-sm bg-secondary/5 flex items-center justify-center">
        <Image 
          src={mainImage} 
          alt={`${title} Preview`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
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
    </div>
  );
}
