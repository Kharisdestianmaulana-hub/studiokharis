import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight } from "lucide-react";
import { getOpenSource } from "@/data/oss";
import { RepositoryCard } from "@/components/shared/RepositoryCard";
import { FaGithub } from "react-icons/fa";

export async function OpenSourceSection() {
  const ossData = await getOpenSource();
  return (
    <section id="open-source" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">Open Source</h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
            MY CONTRIBUTIONS TO THE OPEN-SOURCE COMMUNITY.
          </p>
        </div>
        <Link 
          href="https://github.com/Kharisdestianmaulana-hub" 
          target="_blank"
          className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 px-8 py-4 transition-none mt-4 md:mt-0"
        >
          <FaGithub className="w-5 h-5" /> VIEW GITHUB PROFILE
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ossData.map((repo: any) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      
      <div className="mt-6 md:hidden">
        <Link 
          href="https://github.com/amelie" 
          target="_blank"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-none py-3 hover:bg-secondary/10 transition-colors"
        >
          <FaGithub className="w-4 h-4" /> View GitHub Profile
        </Link>
      </div>
    </section>
  );
}
