"use client";
import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Download, Upload, Type, Stamp } from "lucide-react";

export default function WatermarkCreator() {
  const { dict } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("STUDIO KHARIS");
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(10); // Percentage of image width
  const [position, setPosition] = useState("bottom-right"); // top-left, center, bottom-right, tiled
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imgRef.current = img;
        drawCanvas();
        URL.revokeObjectURL(url);
      };
    } else {
      imgRef.current = null;
      clearCanvas();
    }
  }, [file]);

  // Re-draw canvas whenever any settings change
  useEffect(() => {
    if (imgRef.current) {
      drawCanvas();
    }
  }, [watermarkText, opacity, fontSize, position]);

  const drawCanvas = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imgRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw original image
    ctx.drawImage(img, 0, 0);
    
    if (!watermarkText) return;

    // Set text style
    const sizeInPx = (canvas.width * fontSize) / 100;
    ctx.font = `900 ${sizeInPx}px "Inter", "Helvetica Neue", sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity / 100})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Add black stroke for contrast
    ctx.strokeStyle = `rgba(0, 0, 0, ${(opacity / 100) * 0.8})`;
    ctx.lineWidth = sizeInPx * 0.05;

    const textMetrics = ctx.measureText(watermarkText);
    const textWidth = textMetrics.width;

    if (position === "tiled") {
      // Draw tiled watermark
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      const spacingX = textWidth + sizeInPx;
      const spacingY = sizeInPx * 2;
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6); // Rotate -30 degrees
      ctx.translate(-canvas.width, -canvas.height); // Expand bounding box due to rotation
      
      for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
        for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
          ctx.fillText(watermarkText, x, y);
          ctx.strokeText(watermarkText, x, y);
        }
      }
      
      // Reset transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      // Fixed positions
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      
      if (position === "top-left") {
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        x = sizeInPx;
        y = sizeInPx;
      } else if (position === "bottom-right") {
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        x = canvas.width - sizeInPx;
        y = canvas.height - sizeInPx;
      }
      
      ctx.fillText(watermarkText, x, y);
      ctx.strokeText(watermarkText, x, y);
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `watermarked-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title={dict.toolbox.tools.watermark.title} desc={dict.toolbox.tools.watermark.desc} maxWidth="max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kontrol Kiri */}
        <div className="lg:col-span-4 flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[8px_8px_0_0_var(--foreground)] h-fit">
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-sm flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="border-[3px] border-foreground p-2 text-foreground bg-background cursor-pointer" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-sm flex items-center gap-2"><Type className="w-4 h-4" /> Watermark Text</label>
            <input 
              type="text" 
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="border-[3px] border-foreground p-3 font-bold text-foreground bg-background uppercase focus:outline-none focus:shadow-[4px_4px_0_0_var(--foreground)] transition-shadow" 
            />
          </div>

          <div className="flex flex-col gap-4 border-[3px] border-foreground p-4 bg-background">
            <label className="font-black uppercase tracking-widest text-sm border-b-[3px] border-foreground pb-2">Appearance</label>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-bold text-xs uppercase">
                <span>Opacity</span>
                <span>{opacity}%</span>
              </div>
              <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="accent-foreground h-2 bg-muted rounded-none border-2 border-foreground" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between font-bold text-xs uppercase">
                <span>Size</span>
                <span>{fontSize}%</span>
              </div>
              <input type="range" min="2" max="30" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="accent-foreground h-2 bg-muted rounded-none border-2 border-foreground" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-sm">Position</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "top-left", label: "Top Left" },
                { id: "center", label: "Center" },
                { id: "bottom-right", label: "Bottom Right" },
                { id: "tiled", label: "Tiled / Pattern" },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setPosition(pos.id)}
                  className={`p-2 text-xs font-black uppercase tracking-widest border-[3px] border-foreground transition-all ${position === pos.id ? 'bg-foreground text-background shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]' : 'bg-background hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)]'}`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={downloadImage}
            disabled={!file}
            className="w-full py-4 mt-4 flex items-center justify-center gap-2 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)] transition-all active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download className="w-5 h-5" />
            Download Result
          </button>
        </div>
        
        {/* Kanvas Kanan */}
        <div className="lg:col-span-8 flex flex-col gap-2 relative">
          <label className="font-black uppercase tracking-widest text-sm">Live Preview</label>
          <div className={`w-full min-h-[500px] border-[3px] border-foreground flex items-center justify-center bg-muted shadow-[8px_8px_0_0_var(--foreground)] overflow-hidden relative ${!file ? 'border-dashed' : ''}`}>
            
            <canvas 
              ref={canvasRef}
              className={`max-w-full max-h-[70vh] object-contain transition-all ${!file ? 'hidden' : 'block'}`}
            />
            
            {!file && (
              <div className="flex flex-col items-center gap-4 opacity-50 text-foreground">
                <Stamp className="w-16 h-16" />
                <div className="font-black uppercase tracking-widest text-center">
                  UPLOAD AN IMAGE TO BEGIN
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
