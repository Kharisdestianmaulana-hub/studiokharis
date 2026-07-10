import * as React from "react";
import Link from "next/link";
import { Star, GitFork, BookOpen, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";

export function RepositoryCard({ repo }: { repo: any }) {
  return (
    <Card className="group bg-surface border-border overflow-hidden rounded-[16px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-3">
          <FaGithub className="w-5 h-5 text-muted mt-1" />
          <div className="flex flex-col gap-1">
            <Link href={repo.url} target="_blank" className="font-semibold text-lg text-foreground hover:text-accent transition-colors break-words">
              {repo.name}
            </Link>
          </div>
        </div>
        
        <p className="text-sm text-secondary-text mb-6 flex-1">
          {repo.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: repo.languageColor }}
            />
            <span>{repo.language}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" />
            <span>{repo.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5" />
            <span>{repo.forks.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Scale className="w-3.5 h-3.5" />
            <span>{repo.license}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
