"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [resizedUrl, setResizedUrl] = useState("");

  const handleResize = () => {
    if(!file) return;
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedUrl(canvas.toDataURL(file.type));
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  return (
    <ToolLayout title="Image Resizer" desc="RESIZE IMAGES TO EXACT DIMENSIONS.">
      <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)]">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2 text-foreground" />
        
        {file && (
          <div className="flex flex-col gap-4 text-foreground">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-sm">Width (px)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="p-2 border-[3px] border-foreground max-w-[150px] bg-background" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-sm">Height (px)</label>
                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="p-2 border-[3px] border-foreground max-w-[150px] bg-background" />
              </div>
            </div>

            <button onClick={handleResize} className="py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">
              RESIZE IMAGE
            </button>
          </div>
        )}

        {resizedUrl && (
          <div className="mt-4 flex flex-col gap-4">
            <div className="border-[3px] border-foreground overflow-hidden max-h-[400px] flex items-center justify-center bg-muted">
              <img src={resizedUrl} alt="Resized" className="max-w-full max-h-[400px] object-contain" />
            </div>
            <a href={resizedUrl} download={`resized_${file?.name}`} className="text-center py-3 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">
              DOWNLOAD
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
