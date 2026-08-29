import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticles } from "@/data/articles";

import { ArticlesClient } from "./ArticlesClient";

export async function ArticlesSection({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const articlesData = await getArticles();

  return (
    <section id="articles" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/50 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">LATEST UPDATES</p>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Articles & Updates
          </h3>
          <p className="text-muted text-sm md:text-base max-w-xl mt-2">
            My thoughts on software engineering, design, and technical experiments.
          </p>
        </div>
        {!hideViewAll && (
          <Link 
            href="/articles" 
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground bg-secondary/20 hover:bg-surface px-6 py-3 rounded-full transition-colors border border-border mt-4 md:mt-0"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <ArticlesClient articlesData={articlesData} hideViewAll={hideViewAll} />
    </section>
  );
}
