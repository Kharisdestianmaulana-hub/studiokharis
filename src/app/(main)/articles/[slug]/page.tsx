import * as React from "react";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticles } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { ArticleContent } from "@/components/shared/ArticleContent";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const articles = await getArticles();
  const article = articles.find((a: any) => a.slug === params.slug);
  
  if (!article) return { title: "Article Not Found" };
  
  const description = article.content?.substring(0, 160) || "Read this article";
  return {
    title: article.title,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      images: [{ url: article.ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
      images: [article.ogImage],
    },
  };
}

export default async function ArticleDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const articles = await getArticles();
  const article = articles.find((a: any) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <article className="flex flex-col gap-10 pb-16 pt-8 animate-in fade-in duration-700">
        
        {/* Brutalist Back Button */}
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm border-[3px] border-foreground px-4 py-2 bg-surface hover:bg-foreground hover:text-background transition-colors w-fit shadow-[4px_4px_0_0_var(--foreground)] active:translate-y-1 active:shadow-none"
        >
          <ArrowLeft className="w-5 h-5 stroke-[3]" />
          Back to articles
        </Link>

        <header className="flex flex-col gap-8 border-[3px] border-foreground bg-background p-6 md:p-10 shadow-[8px_8px_0_0_var(--foreground)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags && article.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1.5 border-[3px] border-foreground bg-accent text-accent-foreground font-black uppercase tracking-widest text-xs shadow-[2px_2px_0_0_var(--foreground)]">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-none mt-2">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-4 w-full mt-4 pt-6 border-t-[3px] border-foreground border-dashed">
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-foreground">
                <span className="flex items-center gap-2 border-[2px] border-foreground px-3 py-1 bg-surface"><Calendar className="w-4 h-4 stroke-[3]" /> {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-2 border-[2px] border-foreground px-3 py-1 bg-surface"><Clock className="w-4 h-4 stroke-[3]" /> {article.readingTime}</span>
              </div>
              <ShareButtons url={`/articles/${article.slug}`} title={article.title} />
            </div>
          </div>
        </header>

        {article.cover && (
          <div className="relative aspect-[2/1] w-full bg-background border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] p-2">
            <div className="relative w-full h-full border-[3px] border-foreground overflow-hidden">
              <Image 
                src={article.cover} 
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        )}

        <ArticleContent content={article.content || article.excerpt || "Article content goes here..."} />
      </article>
    </>
  );
}
