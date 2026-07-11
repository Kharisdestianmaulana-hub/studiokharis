import * as React from "react";
import { Laptop, Cpu, Code2, Paintbrush, Terminal, MonitorSmartphone } from "lucide-react";
import { FaLinux, FaApple } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";

export function WorkspaceSetup() {
  return (
    <div className="flex flex-col gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <MonitorSmartphone className="w-6 h-6 text-accent" />
          Workspace & Setup
        </h3>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl">
          A glimpse into my daily development environment and the tools I use to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Hardware & OS Card */}
        <div className="group relative p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-accent mb-2">
              <Laptop className="w-5 h-5" />
              <h4 className="font-semibold text-foreground">Hardware & OS</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">Laptop</span>
                <span className="text-sm font-medium text-primary-text">ThinkPad T470s</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">Operating Systems</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-xs font-medium border border-secondary/20">
                    <FaLinux className="w-3.5 h-3.5" /> Fedora KDE 44
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 text-xs font-medium border border-secondary/20">
                    <FaApple className="w-3.5 h-3.5" /> macOS Monterey
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IDE & Tools Card */}
        <div className="group relative p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-blue-500 mb-2">
              <Code2 className="w-5 h-5" />
              <h4 className="font-semibold text-foreground">IDE & Editors</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">Primary Editors</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20">
                    <TbBrandVscode className="w-3.5 h-3.5" /> VS Code
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-500/10 text-zinc-500 text-xs font-medium border border-zinc-500/20">
                    <Terminal className="w-3.5 h-3.5" /> Zed
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">AI Assistant</span>
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-500 text-xs font-medium border border-purple-500/20">
                    <Cpu className="w-3.5 h-3.5" /> Antigravity (Gemini)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme & Aesthetics Card */}
        <div className="group relative p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-pink-500 mb-2">
              <Paintbrush className="w-5 h-5" />
              <h4 className="font-semibold text-foreground">Theme & Aesthetics</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">VS Code Theme</span>
                <span className="text-sm font-medium text-primary-text">Mayukai</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">Icon Pack</span>
                <span className="text-sm font-medium text-primary-text">vscode-icons</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">Font</span>
                <span className="text-sm font-medium font-mono text-primary-text bg-secondary/10 px-1.5 py-0.5 rounded">Fira Code</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
