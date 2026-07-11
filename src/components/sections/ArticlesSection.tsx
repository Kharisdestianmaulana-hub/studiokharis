import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticles } from "@/data/articles";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ArticleLink } from "@/components/shared/ArticleLink";

export async function ArticlesSection({ hideViewAll = false }: { hideViewAll?: boolean }) {
  const articlesData = await getArticles();
  return (
    <section id="articles" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Recent Articles</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            My thoughts on software engineering, design, and architecture.
          </p>
        </div>
        {!hideViewAll && (
          <Link 
            href="/articles" 
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.map((article: any) => (
              <ArticleLink key={article.id} article={article} />
            ))}
          </div>
          
          {!hideViewAll && (
            <div className="mt-6 md:hidden">
              <Link 
                href="/articles" 
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-xl py-3 hover:bg-secondary/10 transition-colors"
              >
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
