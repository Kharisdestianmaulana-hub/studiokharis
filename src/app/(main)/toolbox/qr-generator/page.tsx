"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://studiokharis.com");
  
  return (
    <ToolLayout title="QR Code Generator" desc="CREATE QR CODES FROM ANY TEXT OR URL INSTANTLY.">
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
          <QRCodeSVG value={text || "https://studiokharis.com"} size={200} level="H" includeMargin={false} fgColor="currentColor" bgColor="transparent" className="text-foreground" />
          <p className="font-black uppercase tracking-widest text-xs mt-2 text-foreground">Scan Me</p>
        </div>
      </div>
    </ToolLayout>
  );
}
