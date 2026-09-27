#!/bin/bash

# 1. QR Code Generator
cat << 'TOOL' > src/app/\(main\)/toolbox/qr-generator/page.tsx
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
            className="w-full h-32 p-4 border-[3px] border-foreground bg-surface rounded-none focus:outline-none focus:shadow-[4px_4px_0_0_var(--foreground)] transition-shadow resize-none font-bold"
            placeholder="Enter something..."
          />
        </div>
        <div className="w-full md:w-64 flex flex-col gap-4 items-center p-6 border-[3px] border-foreground bg-white shadow-[6px_6px_0_0_var(--foreground)]">
          <QRCodeSVG value={text || "https://studiokharis.com"} size={200} level="H" includeMargin={false} />
          <p className="font-black uppercase tracking-widest text-xs mt-2 text-black">Scan Me</p>
        </div>
      </div>
    </ToolLayout>
  );
}
TOOL

# 2. JSON Formatter
cat << 'TOOL' > src/app/\(main\)/toolbox/json-formatter/page.tsx
"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <ToolLayout title="JSON Formatter" desc="FORMAT, VALIDATE, AND BEAUTIFY YOUR JSON DATA.">
      <div className="flex flex-col gap-4">
        <button onClick={formatJSON} className="self-start px-6 py-3 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">Format JSON</button>
        {error && <div className="p-4 bg-red-400 text-black border-[3px] border-foreground font-bold">{error}</div>}
        <div className="flex flex-col md:flex-row gap-6">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="w-full flex-1 h-[400px] p-4 border-[3px] border-foreground bg-surface rounded-none focus:outline-none focus:shadow-[4px_4px_0_0_var(--foreground)] font-mono text-sm"
            placeholder="Paste your unformatted JSON here..."
          />
          <textarea 
            value={output} 
            readOnly
            className="w-full flex-1 h-[400px] p-4 border-[3px] border-foreground bg-[#DFFF00] text-black rounded-none focus:outline-none font-mono text-sm"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </ToolLayout>
  );
}
TOOL

# 3. Password Generator
cat << 'TOOL' > src/app/\(main\)/toolbox/password-generator/page.tsx
"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generate = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let chars = lower;
    if (useUpper) chars += upper;
    if (useNumbers) chars += nums;
    if (useSymbols) chars += syms;
    
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  return (
    <ToolLayout title="Password Generator" desc="GENERATE STRONG, SECURE, AND RANDOM PASSWORDS.">
      <div className="flex flex-col max-w-xl gap-6 border-[3px] border-foreground bg-surface p-6 shadow-[8px_8px_0_0_var(--foreground)]">
        <div className="flex items-center justify-between gap-4">
          <input type="text" readOnly value={password} className="w-full p-4 border-[3px] border-foreground font-mono text-lg font-black bg-[#DFFF00] text-black" placeholder="Click generate..." />
        </div>
        
        <div className="flex flex-col gap-4">
          <label className="font-black uppercase tracking-widest text-sm flex justify-between">
            <span>Length: {length}</span>
            <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-1/2 accent-foreground" />
          </label>
          <label className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="w-5 h-5 border-[3px] border-foreground accent-foreground" /> Include Uppercase
          </label>
          <label className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-5 h-5 border-[3px] border-foreground accent-foreground" /> Include Numbers
          </label>
          <label className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-5 h-5 border-[3px] border-foreground accent-foreground" /> Include Symbols
          </label>
        </div>

        <button onClick={generate} className="w-full py-4 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">GENERATE PASSWORD</button>
      </div>
    </ToolLayout>
  );
}
TOOL

# 4. Word Counter
cat << 'TOOL' > src/app/\(main\)/toolbox/word-counter/page.tsx
"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const readingTime = Math.ceil(words / 200); // 200 words per min
  
  return (
    <ToolLayout title="Word Counter" desc="COUNT WORDS, CHARACTERS, AND ESTIMATE READING TIME.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: "Words", val: words, color: "bg-[#DFFF00]" },
          { label: "Characters", val: chars, color: "bg-blue-400" },
          { label: "No Spaces", val: charsNoSpaces, color: "bg-pink-400" },
          { label: "Min Read", val: readingTime, color: "bg-emerald-400" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] text-black ${stat.color} flex flex-col items-center justify-center`}>
            <span className="text-3xl font-black">{stat.val}</span>
            <span className="text-xs font-black uppercase tracking-widest mt-1 text-center">{stat.label}</span>
          </div>
        ))}
      </div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="w-full h-[400px] p-6 border-[3px] border-foreground bg-surface rounded-none focus:outline-none focus:shadow-[6px_6px_0_0_var(--foreground)] transition-shadow font-bold text-lg leading-relaxed"
        placeholder="Type or paste your text here..."
      />
    </ToolLayout>
  );
}
TOOL

# 5. Percentage Calculator
cat << 'TOOL' > src/app/\(main\)/toolbox/percentage-calculator/page.tsx
"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function PercentageCalculator() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const res1 = (Number(val1) / 100) * Number(val2);
  const res2 = Number(discountPrice) - ((Number(discountPercent) / 100) * Number(discountPrice));

  return (
    <ToolLayout title="Percentage Calculator" desc="CALCULATE PERCENTAGES AND DISCOUNTS EASILY.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
          <h2 className="font-black uppercase tracking-widest text-xl border-b-[3px] border-foreground pb-2">Find Percentage</h2>
          <div className="flex items-center gap-4 text-lg font-bold">
            What is <input type="number" value={val1} onChange={e=>setVal1(e.target.value)} className="w-24 p-2 border-[3px] border-foreground bg-background" /> %
          </div>
          <div className="flex items-center gap-4 text-lg font-bold">
            of <input type="number" value={val2} onChange={e=>setVal2(e.target.value)} className="w-32 p-2 border-[3px] border-foreground bg-background" /> ?
          </div>
          <div className="p-4 bg-[#DFFF00] text-black border-[3px] border-foreground font-black text-2xl text-center">
            {isNaN(res1) ? "..." : res1}
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
          <h2 className="font-black uppercase tracking-widest text-xl border-b-[3px] border-foreground pb-2">Discount Calculator</h2>
          <div className="flex items-center gap-4 text-lg font-bold justify-between">
            Original Price <input type="number" value={discountPrice} onChange={e=>setDiscountPrice(e.target.value)} className="w-32 p-2 border-[3px] border-foreground bg-background" />
          </div>
          <div className="flex items-center gap-4 text-lg font-bold justify-between">
            Discount (%) <input type="number" value={discountPercent} onChange={e=>setDiscountPercent(e.target.value)} className="w-32 p-2 border-[3px] border-foreground bg-background" />
          </div>
          <div className="p-4 bg-emerald-400 text-black border-[3px] border-foreground font-black text-2xl text-center flex flex-col">
            <span className="text-sm font-bold uppercase">Final Price</span>
            {isNaN(res2) ? "..." : res2}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
TOOL

# 6. Color Converter
cat << 'TOOL' > src/app/\(main\)/toolbox/color-converter/page.tsx
"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";

export default function ColorConverter() {
  const [hex, setHex] = useState("#DFFF00");
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
    return \`rgb(\${r}, \${g}, \${b})\`;
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
          <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold" />
          
          <label className="font-black uppercase tracking-widest text-sm mt-4">RGB Output</label>
          <input type="text" readOnly value={rgb} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold bg-muted" />
        </div>
        <div 
          className="w-full md:w-64 h-64 border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)]"
          style={{ backgroundColor: hex }}
        />
      </div>
    </ToolLayout>
  );
}
TOOL

# 7. Contrast Checker
cat << 'TOOL' > src/app/\(main\)/toolbox/contrast-checker/page.tsx
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
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#DFFF00");
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
          <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold" />
          
          <label className="font-black uppercase tracking-widest text-sm mt-4">Background HEX</label>
          <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="p-4 border-[3px] border-foreground font-mono text-xl font-bold" />
          
          <div className="mt-4 p-4 border-[3px] border-foreground bg-background">
            <div className="text-xs font-black uppercase tracking-widest">Contrast Ratio</div>
            <div className="text-4xl font-black mt-2">{ratio.toFixed(2)} : 1</div>
            <div className={`mt-2 font-bold uppercase px-2 py-1 inline-block border-[2px] border-foreground ${ratio >= 4.5 ? 'bg-emerald-400 text-black' : 'bg-red-400 text-black'}`}>
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
TOOL

chmod +x generate_tools.sh
./generate_tools.sh
rm generate_tools.sh
