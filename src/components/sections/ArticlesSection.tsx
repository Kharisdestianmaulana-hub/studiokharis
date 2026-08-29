import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticles } from "@/data/articles";

import { ArticlesClient } from "./ArticlesClient";

export async function ArticlesSection({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const articlesData = await getArticles();

  return (
    <section id="articles" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-black tracking-widest text-foreground uppercase opacity-70">LATEST UPDATES</p>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
            Articles & Updates
          </h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
            MY THOUGHTS ON SOFTWARE ENGINEERING, DESIGN, AND TECHNICAL EXPERIMENTS.
          </p>
        </div>
        {!hideViewAll && (
          <Link 
            href="/articles" 
            className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 px-8 py-4 transition-none mt-4 md:mt-0"
          >
            VIEW ALL ARTICLES <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      <ArticlesClient articlesData={articlesData} hideViewAll={hideViewAll} />
    </section>
  );
}
