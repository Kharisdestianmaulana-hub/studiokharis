"use client";
import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Pipette, Copy, Check } from "lucide-react";

export default function ColorPicker() {
  const { dict } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [hexColor, setHexColor] = useState("");
  const [copied, setCopied] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imgRef.current = img;
        drawToCanvas();
        URL.revokeObjectURL(url);
      };
    } else {
      imgRef.current = null;
      setHexColor("");
      setIsPicking(false);
      clearCanvas();
    }
  }, [file]);

  const drawToCanvas = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    
    // Set internal resolution to match image
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    ctx.drawImage(imgRef.current, 0, 0);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPicking || !canvasRef.current || !imgRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Calculate actual pixel coordinates based on CSS scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      if (pixel[3] > 0) { // If not transparent
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        setHexColor(hex);
        setIsPicking(false); // Auto turn off picking after click
      }
    } catch (err) {
      console.error("Failed to read pixel data", err);
    }
  };

  const copyToClipboard = async () => {
    if (!hexColor) return;
    try {
      await navigator.clipboard.writeText(hexColor);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  return (
    <ToolLayout title={dict.toolbox.tools.picker.title} desc={dict.toolbox.tools.picker.desc} maxWidth="max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Kontrol Kiri */}
        <div className="w-full md:w-[350px] flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)] h-fit">
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-sm">Upload Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="border-[3px] border-foreground p-2 text-foreground bg-background" 
            />
          </div>
          
          <button 
            onClick={() => setIsPicking(!isPicking)}
            disabled={!file}
            className={`py-4 mt-2 font-black uppercase tracking-widest border-[3px] border-foreground transition-all flex items-center justify-center gap-2 ${isPicking ? 'bg-foreground text-background shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]' : 'bg-background text-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]'} disabled:opacity-50 disabled:pointer-events-none`}
          >
            <Pipette className="w-5 h-5" />
            {isPicking ? "PICKING COLOR..." : "ACTIVATE PICKER"}
          </button>

          {hexColor && (
            <div className="flex flex-col gap-4 p-4 border-[3px] border-foreground bg-background mt-2">
              <label className="font-black uppercase tracking-widest text-xs">Selected Color</label>
              
              <div className="flex gap-4 items-center">
                <div 
                  className="w-16 h-16 border-[3px] border-foreground shrink-0" 
                  style={{ backgroundColor: hexColor }} 
                />
                <input 
                  type="text" 
                  readOnly 
                  value={hexColor} 
                  className="w-full p-3 font-mono font-bold text-xl border-[3px] border-foreground bg-surface uppercase text-center" 
                />
              </div>

              <button 
                onClick={copyToClipboard}
                className="w-full py-3 mt-2 flex items-center justify-center gap-2 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "COPIED!" : "COPY HEX"}
              </button>
            </div>
          )}
        </div>
        
        {/* Kanvas Kanan */}
        <div className="flex-1 flex flex-col gap-2 relative">
          <label className="font-black uppercase tracking-widest text-sm">Image View</label>
          <div className={`w-full min-h-[400px] border-[3px] border-foreground flex items-center justify-center bg-muted shadow-[6px_6px_0_0_var(--foreground)] overflow-hidden relative ${!file ? 'border-dashed' : ''}`}>
            
            {/* Canvas untuk me-render gambar dan membaca pixel */}
            <canvas 
              ref={canvasRef}
              onClick={handleCanvasClick}
              className={`max-w-full max-h-[70vh] object-contain transition-all ${isPicking ? 'cursor-crosshair' : 'cursor-default'} ${!file ? 'hidden' : 'block'}`}
            />
            
            {/* Teks placeholder jika belum ada gambar */}
            {!file && (
              <div className="text-foreground font-bold uppercase tracking-widest p-4 text-center">
                NO IMAGE SELECTED
              </div>
            )}
            
            {/* Overlay instruksi saat mode picker aktif */}
            {file && isPicking && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_var(--background)] pointer-events-none animate-in fade-in slide-in-from-top-2">
                CLICK ANYWHERE ON IMAGE
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
