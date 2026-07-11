"use client";

import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SearchBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetch results when debounced query changes
  React.useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          // Take only top 5 for dropdown
          setResults(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchResults();
    }
  }, [debouncedQuery, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  return (
    <div ref={containerRef} className="relative flex w-full max-w-sm ml-2 md:ml-0">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center w-full h-10 px-3 rounded-[0.5rem] bg-background border transition-colors",
          isOpen ? "border-accent ring-1 ring-accent/20" : "border-border hover:border-accent/50"
        )}
      >
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="flex-1 h-full px-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {!query && (
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-primary-text">
            <span className="text-xs">Ctrl</span> K
          </kbd>
        )}
        {query && (
          <button 
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 hover:bg-muted rounded-md text-muted-foreground absolute right-2"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <button
                    onClick={() => handleSelect(result.url)}
                    className="w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Search className="w-4 h-4 text-muted-foreground group-hover:text-accent shrink-0" />
                      <span className="text-sm text-foreground truncate">{result.title}</span>
                    </div>
                    {result.imageUrl && (
                      <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden ml-2 bg-muted hidden lg:block">
                        <Image src={result.imageUrl} alt="" fill className="object-cover" />
                      </div>
                    )}
                  </button>
                </li>
              ))}
              <li className="border-t border-border mt-1 pt-1 px-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                  }}
                  className="w-full text-center py-2 text-xs font-medium text-accent hover:bg-accent/10 rounded-md transition-colors"
                >
                  See all results
                </button>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
