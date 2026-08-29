"use client";

import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, BookOpen, LayoutGrid, List } from "lucide-react";

export function ArticlesClient({ 
  articlesData, 
  hideViewAll 
}: { 
  articlesData: any[], 
  hideViewAll: boolean 
}) {
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

  if (articlesData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-none-2xl border-border bg-secondary/5 w-full">
        <BookOpen className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No articles yet</h3>
        <p className="text-muted-foreground mt-1 max-w-sm">
          I'm currently working on some exciting content. Check back soon for new articles!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative w-full">
      {/* View Toggle (Only shown on Articles Page where hideViewAll is true) */}
      {hideViewAll && (
        <div className="flex justify-end mb-2 md:-mt-20 relative z-10 w-full">
          <div className="flex items-center bg-secondary/20 border border-border/50 rounded-none p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-none transition-all duration-300 ${viewMode === 'list' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-none transition-all duration-300 ${viewMode === 'grid' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {viewMode === "list" ? (
        <div className="flex flex-col border-y-[3px] border-foreground divide-y-[3px] divide-foreground">
          {articlesData.map((article: any, index: number) => (
            <div key={article.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center group py-12 md:py-16">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex justify-between items-start mb-6">
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase group-hover:text-accent transition-colors leading-tight">
                      {article.title}
                    </h4>
                  </Link>
                  <span className="text-xs md:text-sm font-black text-foreground whitespace-nowrap ml-4 border-[2px] border-foreground px-3 py-1.5 uppercase tracking-widest">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-foreground text-xs font-bold uppercase tracking-widest mb-6">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="border-[2px] border-current px-2.5 py-1">#{tag}</span>
                    ))}
                  </div>
                )}
                
                <p className="text-muted-foreground font-medium leading-relaxed mb-8 text-sm md:text-base border-l-[3px] border-foreground pl-4 md:pl-6 py-1">
                  {stripHtml(article.content).substring(0, 200)}...
                </p>
                
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="w-full text-center text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 py-4 transition-none flex items-center justify-center gap-2"
                >
                  READ ARTICLE <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <Link href={`/articles/${article.slug}`} className={`relative aspect-[4/3] w-full overflow-hidden bg-foreground border-[3px] border-foreground ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <img 
                  src={article.cover || '/placeholder.svg'} 
                  alt={article.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" 
                />
              </Link>
            </div>
          ))}
          
          {!hideViewAll && (
            <div className="mt-6 md:hidden py-6">
              <Link 
                href="/articles" 
                className="w-full text-center text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 py-4 transition-none flex items-center justify-center gap-2"
              >
                VIEW ALL ARTICLES <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article: any) => (
            <div key={article.id} className="group flex flex-col h-full bg-background border-[3px] border-foreground overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <Link href={`/articles/${article.slug}`} className="relative aspect-video w-full overflow-hidden bg-foreground border-b-[3px] border-foreground">
                <img 
                  src={article.cover || '/placeholder.svg'} 
                  alt={article.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" 
                />
              </Link>
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex justify-between items-start mb-6 gap-2">
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors line-clamp-3 leading-tight">
                      {article.title}
                    </h4>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  {article.tags && article.tags.length > 0 && (
                    <p className="text-foreground border-[2px] border-current px-2 py-1 text-xs font-bold uppercase tracking-widest line-clamp-1">
                      #{article.tags[0]}
                    </p>
                  )}
                  <span className="text-xs font-black border-[2px] border-foreground px-2 py-1 uppercase text-foreground whitespace-nowrap">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1 line-clamp-3 border-l-[3px] border-foreground pl-4 py-1">
                  {stripHtml(article.content).substring(0, 120)}...
                </p>
                
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="mt-auto w-full text-center text-sm font-black uppercase tracking-widest text-background bg-foreground hover:bg-foreground/90 py-4 transition-none flex items-center justify-center gap-2"
                >
                  READ ARTICLE <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
