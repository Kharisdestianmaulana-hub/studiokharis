"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("image/png");
  const [convertedUrl, setConvertedUrl] = useState("");

  const handleConvert = () => {
    if(!file) return;
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      setConvertedUrl(canvas.toDataURL(format));
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  const getExt = () => {
    if(format === 'image/jpeg') return 'jpg';
    if(format === 'image/webp') return 'webp';
    return 'png';
  };

  return (
    <ToolLayout title="Image Converter" desc="CONVERT IMAGES BETWEEN FORMATS.">
      <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)]">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2 text-foreground" />
        
        {file && (
          <div className="flex flex-col gap-4 text-foreground">
            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-sm">Target Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="p-2 border-[3px] border-foreground max-w-[200px] font-bold bg-background">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG / JPEG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </div>

            <button onClick={handleConvert} className="py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">
              CONVERT IMAGE
            </button>
          </div>
        )}

        {convertedUrl && (
          <div className="mt-4 p-4 border-[3px] border-foreground bg-foreground text-background flex flex-col gap-4">
            <p className="font-black uppercase text-xl">Success!</p>
            <a href={convertedUrl} download={`converted.${getExt()}`} className="text-center py-3 bg-background text-foreground font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--background)] transition-all">
              DOWNLOAD
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
