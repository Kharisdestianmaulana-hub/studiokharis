import * as React from "react";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import Image from "next/image";
import { ArrowRight, Clock, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ArticleCard({ article }: { article: any }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="group bg-surface border-border overflow-hidden rounded-[16px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer">
          {article.cover ? (
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
              <Image 
                src={article.cover} 
                alt={article.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-secondary/5 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted/30" />
            </div>
          )}
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs text-muted mb-3">
              <span className="font-medium text-accent">{article.category}</span>
              <span>•</span>
              <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
            
            <h4 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
              {article.title}
            </h4>
            
            <p className="text-sm text-secondary-text mb-6 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTime}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>Article: {article.title}</TooltipContent>
    </Tooltip>
  );
}
