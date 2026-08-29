"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
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
      <div className="flex flex-col w-full border border-border mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 border-b border-border last:border-b-0 bg-transparent">
            <Skeleton className="h-6 w-1/3 rounded-none" />
            <Skeleton className="h-4 w-2/3 rounded-none" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-4 border border-red-500/20 text-red-600 dark:text-red-400 rounded-none bg-transparent">
        <p className="font-semibold">Error loading GitHub data</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="p-6 mt-4 border border-border text-secondary-text rounded-none bg-transparent">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full border-[3px] border-foreground mt-8 shadow-[8px_8px_0_0_var(--foreground)]">
      {repos.map((repo, idx) => {
        const isExpanded = expandedRepos.has(repo.id);
        const isDark = idx % 2 === 0;
        
        return (
          <div
            key={repo.id}
            className={`flex flex-col border-b-[3px] border-foreground last:border-b-0 transition-all duration-300 animate-in fade-in group ${isDark ? "bg-foreground text-background" : "bg-background text-foreground"}`}
          >
            {/* Repository Header - Accordion Trigger */}
            <button
              onClick={() => toggleRepo(repo.id)}
              className="w-full py-8 md:py-10 px-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200 text-left cursor-pointer"
            >
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                    {repo.name}
                  </h4>
                  {repo.language && (
                    <span className="text-xs font-black uppercase tracking-widest border-[2px] border-current px-3 py-1.5">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                {repo.description && (
                  <p className="text-sm md:text-base opacity-80 max-w-2xl font-medium group-hover:translate-x-2 transition-transform duration-300 delay-50">
                    {repo.description}
                  </p>
                )}
                
                <div className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:translate-x-2 transition-transform duration-300 delay-75 mt-2">
                  UPDATED: {formatDate(repo.pushed_at)}
                </div>
              </div>

              <div className={`hidden md:flex items-center justify-center p-4 border-[3px] border-current shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                <ChevronDown className="w-8 h-8" strokeWidth={3} />
              </div>
            </button>

            {/* Commits List - Accordion Content */}
            {isExpanded && (
              <div className={`border-t-[3px] border-foreground ${isDark ? "bg-background text-foreground" : "bg-foreground text-background"}`}>
                {repo.commits.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="px-6 md:px-10 py-4 border-b-[3px] border-current">
                      <p className="text-sm font-black uppercase tracking-widest">
                        LATEST COMMITS ({repo.commits.length})
                      </p>
                    </div>
                    
                    <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
                      {repo.commits.map((commit, idx) => (
                        <div
                          key={commit.sha}
                          className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-6 md:p-8 px-6 md:px-10 hover:opacity-80 transition-opacity duration-200 ${idx !== repo.commits.length - 1 ? "border-b-[2px] border-current" : ""}`}
                        >
                          <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
                            {commit.avatar && (
                              <img
                                src={commit.avatar}
                                alt={commit.author}
                                className="w-12 h-12 border-[2px] border-current grayscale"
                              />
                            )}
                            <div className="flex flex-col md:hidden">
                              <span className="text-sm font-black uppercase">{commit.author}</span>
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70">{formatDate(commit.date)}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0 flex flex-col gap-2 w-full">
                            <p className="text-sm md:text-base font-bold break-words leading-snug">
                              {formatCommitMessage(commit.message)}
                            </p>
                            <div className="hidden md:flex items-center gap-3">
                              <span className="text-xs font-black uppercase tracking-widest">{commit.author}</span>
                              <span className="opacity-30 font-black">///</span>
                              <span className="text-xs font-bold uppercase tracking-widest opacity-70">{formatDate(commit.date)}</span>
                            </div>
                          </div>
                          
                          <div className="shrink-0 w-full md:w-auto flex justify-start md:justify-end">
                            <code className="text-sm font-black tracking-widest uppercase border-[2px] border-current px-3 py-1.5">
                              {commit.sha.substring(0, 7)}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-sm font-black uppercase tracking-widest opacity-50">
                    NO COMMITS FOUND.
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
