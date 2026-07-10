"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { FileText, FolderGit2, Loader2, ArrowRight } from "lucide-react";
import { NAVIGATION_ROUTES } from "@/constants/routes";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
          setResults(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (open) {
      fetchResults();
    }
  }, [debouncedQuery, open]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent/10 hover:text-accent px-4 py-2 relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search website...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a command or search..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              "No results found."
            )}
          </CommandEmpty>
          
          {query.trim() && results.length > 0 && (
            <CommandGroup heading="Search Results">
              {results.map((result) => (
                <CommandItem
                  key={`${result.type}-${result.id}`}
                  value={result.title}
                  onSelect={() => runCommand(() => router.push(result.url))}
                  className="cursor-pointer"
                >
                  {result.type === "project" ? (
                    <FolderGit2 className="mr-2 h-4 w-4" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  <span>{result.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!query.trim() && (
            <CommandGroup heading="Navigation">
              {NAVIGATION_ROUTES.map((route) => (
                <CommandItem
                  key={route.href}
                  value={route.name}
                  onSelect={() => runCommand(() => router.push(route.href))}
                  className="cursor-pointer"
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  <span>{route.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          <CommandSeparator />
          
          {query.trim() && (
            <CommandGroup>
              <CommandItem
                onSelect={() => runCommand(() => router.push(`/search?q=${encodeURIComponent(query)}`))}
                className="cursor-pointer text-accent"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                <span>See all results for "{query}"</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
