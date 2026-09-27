#!/bin/bash

# 8. Image Compressor
cat << 'TOOL' > src/app/\(main\)/toolbox/image-compressor/page.tsx
"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({ maxSizeMB: 1, maxWidthOrHeight: 1920 });

  const handleCompress = async () => {
    if(!file) return;
    setLoading(true);
    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if(!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = \`compressed_\${file?.name}\`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="Image Compressor" desc="COMPRESS IMAGES DIRECTLY IN BROWSER.">
      <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)]">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2" />
        
        {file && (
          <div className="flex flex-col gap-4">
            <p className="font-bold">Original Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-sm">Max Size (MB)</label>
              <input type="number" value={options.maxSizeMB} onChange={e => setOptions({...options, maxSizeMB: Number(e.target.value)})} className="p-2 border-[3px] border-foreground max-w-[150px]" />
            </div>

            <button onClick={handleCompress} disabled={loading} className="py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all disabled:opacity-50">
              {loading ? "COMPRESSING..." : "COMPRESS IMAGE"}
            </button>
          </div>
        )}

        {compressedFile && (
          <div className="mt-4 p-4 border-[3px] border-foreground bg-[#DFFF00] text-black flex flex-col gap-4">
            <p className="font-bold">Compressed Size: {(compressedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button onClick={handleDownload} className="py-3 bg-black text-white font-black uppercase tracking-widest border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all">
              DOWNLOAD
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
TOOL

# 9. Image Resizer
cat << 'TOOL' > src/app/\(main\)/toolbox/image-resizer/page.tsx
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
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2" />
        
        {file && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-sm">Width (px)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="p-2 border-[3px] border-foreground max-w-[150px]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-sm">Height (px)</label>
                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="p-2 border-[3px] border-foreground max-w-[150px]" />
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
            <a href={resizedUrl} download={\`resized_\${file?.name}\`} className="text-center py-3 bg-[#DFFF00] text-black font-black uppercase tracking-widest border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all">
              DOWNLOAD
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
TOOL

# 10. Image Converter
cat << 'TOOL' > src/app/\(main\)/toolbox/image-converter/page.tsx
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
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2" />
        
        {file && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-sm">Target Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className="p-2 border-[3px] border-foreground max-w-[200px] font-bold">
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
          <div className="mt-4 p-4 border-[3px] border-foreground bg-[#DFFF00] text-black flex flex-col gap-4">
            <p className="font-black uppercase text-xl">Success!</p>
            <a href={convertedUrl} download={\`converted.\${getExt()}\`} className="text-center py-3 bg-black text-white font-black uppercase tracking-widest border-[3px] border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all">
              DOWNLOAD
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
TOOL

chmod +x generate_image_tools.sh
./generate_image_tools.sh
rm generate_image_tools.sh
