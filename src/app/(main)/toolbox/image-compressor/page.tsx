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
    a.download = `compressed_${file?.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="Image Compressor" desc="COMPRESS IMAGES DIRECTLY IN BROWSER.">
      <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)]">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border-[3px] border-foreground p-2 text-foreground" />
        
        {file && (
          <div className="flex flex-col gap-4 text-foreground">
            <p className="font-bold">Original Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-sm">Max Size (MB)</label>
              <input type="number" value={options.maxSizeMB} onChange={e => setOptions({...options, maxSizeMB: Number(e.target.value)})} className="p-2 border-[3px] border-foreground max-w-[150px] bg-background" />
            </div>

            <button onClick={handleCompress} disabled={loading} className="py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all disabled:opacity-50">
              {loading ? "COMPRESSING..." : "COMPRESS IMAGE"}
            </button>
          </div>
        )}

        {compressedFile && (
          <div className="mt-4 p-4 border-[3px] border-foreground bg-foreground text-background flex flex-col gap-4">
            <p className="font-bold">Compressed Size: {(compressedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button onClick={handleDownload} className="py-3 bg-background text-foreground font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--background)] transition-all">
              DOWNLOAD
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
