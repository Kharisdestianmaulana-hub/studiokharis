import * as React from "react";
import { Laptop, Cpu, Code2, Paintbrush, Terminal, MonitorSmartphone } from "lucide-react";
import { FaLinux, FaApple } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";

export function WorkspaceSetup() {
  return (
    <div className="flex flex-col gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col gap-2 border-b-[3px] border-foreground pb-4">
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase flex items-center gap-4">
          <MonitorSmartphone className="w-8 h-8 md:w-12 md:h-12" />
          Workspace & Setup
        </h3>
        <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm">
          A GLIMPSE INTO MY DAILY DEVELOPMENT ENVIRONMENT AND THE TOOLS I USE TO BRING IDEAS TO LIFE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-[3px] border-foreground">
        
        {/* Hardware & OS Card */}
        <div className="group relative p-8 md:p-10 bg-foreground text-background transition-none">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b-[3px] border-background pb-4">
              <Laptop className="w-8 h-8" />
              <h4 className="font-black uppercase tracking-widest text-lg">Hardware & OS</h4>
            </div>
            
            <div className="space-y-6 mt-2">
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-1">Laptop</span>
                <span className="text-sm font-black uppercase">ThinkPad T470s</span>
              </div>
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-2">Operating Systems</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-current text-xs font-bold uppercase tracking-wider">
                    <FaLinux className="w-4 h-4" /> Fedora KDE 44
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-current text-xs font-bold uppercase tracking-wider">
                    <FaApple className="w-4 h-4" /> macOS Monterey
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IDE & Tools Card */}
        <div className="group relative p-8 md:p-10 bg-background text-foreground border-y-[3px] md:border-y-0 lg:border-x-[3px] border-foreground transition-none">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b-[3px] border-foreground pb-4">
              <Code2 className="w-8 h-8" />
              <h4 className="font-black uppercase tracking-widest text-lg">IDE & Editors</h4>
            </div>
            
            <div className="space-y-6 mt-2">
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-2">Primary Editors</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-current text-xs font-bold uppercase tracking-wider">
                    <TbBrandVscode className="w-4 h-4" /> VS Code
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-current text-xs font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4" /> Zed
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-2">AI Assistant</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-current text-xs font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4" /> Antigravity (Gemini)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme & Aesthetics Card */}
        <div className="group relative p-8 md:p-10 bg-foreground text-background transition-none">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b-[3px] border-background pb-4">
              <Paintbrush className="w-8 h-8" />
              <h4 className="font-black uppercase tracking-widest text-lg">Theme & Aesthetics</h4>
            </div>
            
            <div className="space-y-6 mt-2">
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-1">VS Code Theme</span>
                <span className="text-sm font-black uppercase">Mayukai</span>
              </div>
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-1">Icon Pack</span>
                <span className="text-sm font-black uppercase">vscode-icons</span>
              </div>
              <div>
                <span className="text-xs opacity-70 uppercase tracking-widest font-bold block mb-2">Font</span>
                <span className="text-xs font-bold font-mono border-[2px] border-current px-3 py-1.5 uppercase">Fira Code</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
