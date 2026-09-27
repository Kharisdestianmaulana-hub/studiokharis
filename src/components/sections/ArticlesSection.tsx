import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticles } from "@/data/articles";
import { getDictionary } from "@/lib/i18n";

import { ArticlesClient } from "./ArticlesClient";

export async function ArticlesSection({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const articlesData = await getArticles();
  const dict = getDictionary();

  return (
    <section id="articles" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-black tracking-widest text-foreground uppercase opacity-70">{dict.articles.latestUpdates}</p>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
            {dict.articles.title}
          </h3>
          <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
            {dict.articles.subtitle}
          </p>
        </div>
        {!hideViewAll && (
          <Link 
            href="/articles" 
            className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 px-8 py-4 transition-none mt-4 md:mt-0"
          >
            {dict.articles.viewAll} <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      <ArticlesClient articlesData={articlesData} hideViewAll={hideViewAll} />
    </section>
  );
}
