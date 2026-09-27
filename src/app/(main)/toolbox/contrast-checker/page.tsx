"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

function getLuminance(r: number, g: number, b: number) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgbArr(hex: string) {
    if(hex.length == 4){
      return [parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16), parseInt(hex[3] + hex[3], 16)];
    }else if(hex.length == 7){
      return [parseInt(hex.substring(1,3), 16), parseInt(hex.substring(3,5), 16), parseInt(hex.substring(5,7), 16)];
    }
    return [0,0,0];
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#000000");
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    try {
      const [r1, g1, b1] = hexToRgbArr(fg);
      const [r2, g2, b2] = hexToRgbArr(bg);
      const l1 = getLuminance(r1, g1, b1);
      const l2 = getLuminance(r2, g2, b2);
      const cr = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      setRatio(cr);
    } catch(e) {}
  }, [fg, bg]);

  return (
    <ToolLayout title="Contrast Checker" desc="CHECK IF YOUR COLORS MEET WCAG STANDARDS.">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
          <label className="font-black uppercase tracking-widest text-sm">Foreground (Text) HEX</label>
          <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold text-foreground" />
          
          <label className="font-black uppercase tracking-widest text-sm mt-4">Background HEX</label>
          <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold text-foreground" />
          
          <div className="mt-4 p-4 border-[3px] border-foreground bg-background text-foreground">
            <div className="text-xs font-black uppercase tracking-widest">Contrast Ratio</div>
            <div className="text-4xl font-black mt-2">{ratio.toFixed(2)} : 1</div>
            <div className={`mt-2 font-bold uppercase px-2 py-1 inline-block border-[2px] border-foreground ${ratio >= 4.5 ? 'bg-foreground text-background' : 'bg-background text-foreground border-dashed'}`}>
              {ratio >= 4.5 ? 'PASS (AA)' : 'FAIL'}
            </div>
          </div>
        </div>
        
        <div 
          className="flex-1 min-h-[300px] border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)] flex items-center justify-center p-8 text-center"
          style={{ backgroundColor: bg, color: fg }}
        >
          <div>
            <h2 className="text-4xl font-black uppercase">Hello World</h2>
            <p className="mt-4 font-bold text-lg">This is a live preview of how your text will look on the background color.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
