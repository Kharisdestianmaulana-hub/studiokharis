"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PasswordGenerator() {
  const { dict } = useLanguage();
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
    <ToolLayout title={dict.toolbox.tools.password.title} desc={dict.toolbox.tools.password.desc}>
      <div className="flex flex-col max-w-xl gap-6 border-[3px] border-foreground bg-surface p-6 shadow-[8px_8px_0_0_var(--foreground)]">
        <div className="flex items-center justify-between gap-4">
          <input type="text" readOnly value={password} className="w-full p-4 border-[3px] border-foreground font-mono text-lg font-black bg-foreground text-background" placeholder="Click generate..." />
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
