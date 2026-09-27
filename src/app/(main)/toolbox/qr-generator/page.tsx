"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { QRCodeCanvas } from "qrcode.react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Copy, Check } from "lucide-react";

export default function QRCodeGenerator() {
  const { dict } = useLanguage();
  const [text, setText] = useState("https://studiokharis.com");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current.querySelector("canvas");
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.error("Failed to copy image: ", err);
    }
  };
  
  return (
    <ToolLayout title={dict.toolbox.tools.qr.title} desc={dict.toolbox.tools.qr.desc}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full flex-1 flex flex-col gap-4">
          <label className="font-black uppercase tracking-widest text-sm">Input Text or URL</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="w-full h-32 p-4 border-[3px] border-foreground bg-surface text-foreground rounded-none focus:outline-none focus:shadow-[4px_4px_0_0_var(--foreground)] transition-shadow resize-none font-bold"
            placeholder="Enter something..."
          />
        </div>
        <div className="w-full md:w-64 flex flex-col gap-4 items-center p-6 border-[3px] border-foreground bg-background shadow-[6px_6px_0_0_var(--foreground)]">
          <div ref={canvasRef} className="bg-white p-2 border-[3px] border-black">
            <QRCodeCanvas value={text || "https://studiokharis.com"} size={180} level="H" includeMargin={false} fgColor="#000000" bgColor="#FFFFFF" />
          </div>
          <button 
            onClick={copyToClipboard}
            className="w-full py-3 mt-2 flex items-center justify-center gap-2 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? "COPIED!" : "COPY QR"}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
