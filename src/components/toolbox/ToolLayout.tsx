import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export function ToolLayout({ title, desc, children }: { title: string, desc: string, children: ReactNode }) {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto min-h-[50vh] gap-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col gap-4 border-b-[3px] border-foreground pb-6">
        <Link href="/toolbox" className="flex items-center gap-2 w-fit font-black uppercase tracking-widest hover:-translate-x-1 transition-transform border-[3px] border-transparent hover:border-foreground px-2 py-1">
          <ArrowLeft className="w-5 h-5 stroke-[3]" /> BACK TO TOOLBOX
        </Link>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase mt-4">
          {title}
        </h1>
        <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
          {desc}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}
