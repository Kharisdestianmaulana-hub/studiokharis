"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/toolbox/ToolLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PercentageCalculator() {
  const { dict } = useLanguage();
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const res1 = (Number(val1) / 100) * Number(val2);
  const res2 = Number(discountPrice) - ((Number(discountPercent) / 100) * Number(discountPrice));

  return (
    <ToolLayout title={dict.toolbox.tools.percentage.title} desc={dict.toolbox.tools.percentage.desc}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6 p-6 border-[3px] border-foreground bg-surface shadow-[6px_6px_0_0_var(--foreground)]">
          <h2 className="font-black uppercase tracking-widest text-xl border-b-[3px] border-foreground pb-2">Find Percentage</h2>
          <div className="flex items-center gap-4 text-lg font-bold">
            What is <input type="number" value={val1} onChange={e=>setVal1(e.target.value)} className="w-24 p-2 border-[3px] border-foreground bg-background" /> %
          </div>
          <div className="flex items-center gap-4 text-lg font-bold">
            of <input type="number" value={val2} onChange={e=>setVal2(e.target.value)} className="w-32 p-2 border-[3px] border-foreground bg-background" /> ?
          </div>
          <div className="p-4 bg-foreground text-background border-[3px] border-foreground font-black text-2xl text-center">
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
          <div className="p-4 bg-foreground text-background border-[3px] border-foreground font-black text-2xl text-center flex flex-col">
            <span className="text-sm font-bold uppercase">Final Price</span>
            {isNaN(res2) ? "..." : res2}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
