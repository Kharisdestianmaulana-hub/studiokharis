"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function JsonFormatter() {
  const { dict } = useLanguage();
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
    <ToolLayout title={dict.toolbox.tools.json.title} desc={dict.toolbox.tools.json.desc}>
      <div className="flex flex-col gap-4">
        <button onClick={formatJSON} className="self-start px-6 py-3 bg-foreground text-background font-black uppercase tracking-widest border-[3px] border-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--foreground)] transition-all">Format JSON</button>
        {error && <div className="p-4 bg-background text-foreground border-[3px] border-dashed border-foreground font-bold">{error}</div>}
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
            className="w-full flex-1 h-[400px] p-4 border-[3px] border-foreground bg-foreground text-background rounded-none focus:outline-none font-mono text-sm"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </ToolLayout>
  );
}
