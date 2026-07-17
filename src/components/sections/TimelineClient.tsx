"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { GitCommit, ChevronDown, Star, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Commit {
  sha: string;
  message: string;
  author: string;
  avatar: string;
  date: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  stargazers_count: number;
  language: string;
  pushed_at: string;
  commits: Commit[];
}

interface TimelineClientProps {
  limit?: number;
  repoNames?: string[];
}

export function TimelineClient({ limit, repoNames }: TimelineClientProps) {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedRepos, setExpandedRepos] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        let data: Repository[] = await response.json();

        // Filter by repoNames if provided
        if (repoNames && repoNames.length > 0) {
          data = data.filter(repo => repoNames.includes(repo.name));
        }

        // Apply limit if provided
        if (limit) {
          data = data.slice(0, limit);
        }

        setRepos(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [limit, repoNames]);

  const toggleRepo = (repoId: number) => {
    setExpandedRepos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatCommitMessage = (message: string) => {
    return message.split('\n')[0];
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-6 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
        <p className="font-semibold">Error loading GitHub data</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-surface border border-border text-secondary-text">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      {repos.map((repo) => {
        const isExpanded = expandedRepos.has(repo.id);
        
        return (
          <div
            key={repo.id}
            className="flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          >
            {/* Repository Header - Accordion Trigger */}
            <button
              onClick={() => toggleRepo(repo.id)}
              className="w-full p-6 flex items-start justify-between gap-4 hover:bg-secondary/30 transition-colors duration-200 text-left"
            >
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg font-bold text-foreground hover:text-accent transition-colors">
                    {repo.name}
                  </h4>
                  {repo.stargazers_count > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </Badge>
                  )}
                  {repo.language && (
                    <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                      <Code className="w-3 h-3" />
                      {repo.language}
                    </Badge>
                  )}
                </div>
                
                {repo.description && (
                  <p className="text-sm text-secondary-text line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                <div className="text-xs text-muted-foreground">
                  Last updated: {formatDate(repo.pushed_at)}
                </div>
              </div>

              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 mt-1",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {/* Commits List - Accordion Content */}
            {isExpanded && (
              <div className="border-t border-border bg-secondary/20 px-6 py-4">
                {repo.commits.length > 0 ? (
                  <div className="flex flex-col space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {repo.commits.length} Commits
                    </p>
                    
                    <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
                      {repo.commits.map((commit) => (
                        <div
                          key={commit.sha}
                          className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors duration-200 border border-border/50"
                        >
                          {commit.avatar && (
                            <img
                              src={commit.avatar}
                              alt={commit.author}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <code className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-accent">
                                {commit.sha}
                              </code>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(commit.date)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-foreground mt-1 break-words">
                              {formatCommitMessage(commit.message)}
                            </p>
                            
                            <p className="text-xs text-secondary-text mt-1">
                              by {commit.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-secondary-text italic">No commits found.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
