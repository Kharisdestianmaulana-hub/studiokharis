import * as React from "react";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getArticles } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/shared/ShareButtons";

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
      images: [{ url: article.cover, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
      images: [article.cover],
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
    <article className="flex flex-col gap-8 pb-16 pt-8 animate-in fade-in duration-700">
      <Link 
        href="/articles" 
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </Link>

      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {article.tags && article.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="w-fit bg-secondary/10 text-secondary-text border-transparent">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readingTime}</span>
            </div>
            <ShareButtons url={`/articles/${article.slug}`} title={article.title} />
          </div>
        </div>
      </header>

      {article.cover && (
        <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden border border-border shadow-sm">
          <Image 
            src={article.cover} 
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      )}

      {/* Render Markdown or HTML content here */}
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-xl prose-a:text-accent mt-8">
        {/* Placeholder if we don't have a markdown parser yet, we can safely render html or pre-wrap text */}
        <div className="whitespace-pre-wrap text-lg text-secondary-text leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content || article.excerpt || "Article content goes here..." }} />
      </div>
    </article>
  );
}
