"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function ColorConverter() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("");
  
  const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if(hex.length == 4){
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }else if(hex.length == 7){
      r = parseInt(hex.substring(1,3), 16);
      g = parseInt(hex.substring(3,5), 16);
      b = parseInt(hex.substring(5,7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    try {
      if(hex.startsWith('#') && (hex.length === 4 || hex.length === 7)) {
        setRgb(hexToRgb(hex));
      }
    } catch(e) {}
  }, [hex]);

  return (
    <ToolLayout title="Color Converter" desc="CONVERT HEX TO RGB EASILY.">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
          <label className="font-black uppercase tracking-widest text-sm">HEX Color</label>
          <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold text-foreground" />
          
          <label className="font-black uppercase tracking-widest text-sm mt-4">RGB Output</label>
          <input type="text" readOnly value={rgb} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold bg-muted text-foreground" />
        </div>
        <div 
          className="w-full md:w-64 h-64 border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)]"
          style={{ backgroundColor: hex }}
        />
      </div>
    </ToolLayout>
  );
}
