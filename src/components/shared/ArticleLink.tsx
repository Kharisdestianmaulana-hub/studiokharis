"use client";

import * as React from "react";
import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import { useStoryStore } from "@/store/useStoryStore";

export function ArticleLink({ article }: { article: any }) {
  const setTransitionTitle = useStoryStore(state => state.setTransitionTitle);
  return (
    <Link 
      href={`/articles/${article.slug}`} 
      className="block h-full"
      onClick={() => setTransitionTitle(`Articles / ${article.title}`)}
    >
      <ArticleCard article={article} />
    </Link>
  );
}
