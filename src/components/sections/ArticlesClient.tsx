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
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-2xl border-border bg-secondary/5 w-full">
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
          <div className="flex items-center bg-secondary/20 border border-border/50 rounded-full p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {viewMode === "list" ? (
        <div className="flex flex-col gap-12">
          {articlesData.map((article: any, index: number) => (
            <div key={article.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center group">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {article.title}
                    </h4>
                  </Link>
                  <span className="text-sm font-medium text-muted whitespace-nowrap ml-4">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                
                {article.tags && article.tags.length > 0 && (
                  <p className="text-accent text-sm font-semibold mb-4">
                    {article.tags.join(" • ")}
                  </p>
                )}
                
                <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
                  {stripHtml(article.content).substring(0, 200)}...
                </p>
                
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent flex items-center gap-2 w-fit"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <Link href={`/articles/${article.slug}`} className={`relative aspect-video rounded-2xl overflow-hidden bg-secondary/10 border border-border/50 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <img 
                  src={article.cover || '/placeholder.svg'} 
                  alt={article.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
            </div>
          ))}
          
          {!hideViewAll && (
            <div className="mt-6 md:hidden">
              <Link 
                href="/articles" 
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-xl py-3 hover:bg-secondary/10 transition-colors"
              >
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article: any) => (
            <div key={article.id} className="group flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <Link href={`/articles/${article.slug}`} className="relative aspect-video w-full overflow-hidden bg-secondary/10 border-b border-border/50">
                <img 
                  src={article.cover || '/placeholder.svg'} 
                  alt={article.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  {article.tags && article.tags.length > 0 && (
                    <p className="text-accent text-xs font-semibold line-clamp-1">
                      {article.tags[0]}
                    </p>
                  )}
                  <span className="text-xs font-medium text-muted whitespace-nowrap">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {stripHtml(article.content).substring(0, 150)}...
                </p>
                
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="mt-auto text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent flex items-center gap-2 w-fit"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
