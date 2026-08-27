import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticles } from "@/data/articles";

export async function ArticlesSection({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const articlesData = await getArticles();
  
  // Helper to remove HTML for excerpt
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

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

      {articlesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed rounded-2xl border-border bg-secondary/5 w-full">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium">No articles yet</h3>
          <p className="text-muted-foreground mt-1 max-w-sm">
            I'm currently working on some exciting content. Check back soon for new articles!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {articlesData.map((article: any, index: number) => (
            <div key={article.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center group">
              {/* Photo on left for index 0 (even), right for index 1 (odd) */}
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {article.title}
                  </h4>
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
      )}
    </section>
  );
}
