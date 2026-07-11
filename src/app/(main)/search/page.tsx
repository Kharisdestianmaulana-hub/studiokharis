import { fetchFromHub } from "@/lib/appwrite";
import { Highlighter } from "@/components/ui/Highlighter";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, SearchX } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';

  let results: any[] = [];

  if (query) {
    const q = query.toLowerCase();
    
    // In a real robust implementation, we would use Appwrite's Query.search() 
    // but fetching and filtering locally works perfectly for small-mid portfolios
    const [projects, articles] = await Promise.all([
      fetchFromHub('public_projects', []),
      fetchFromHub('public_articles', [])
    ]);

    results = [
      ...projects.map((p: any) => ({
        id: p.$id,
        title: p.title,
        description: p.description,
        type: 'Project',
        url: `/projects/${p.$id}`,
        imageUrl: p.thumbnail_url || p.image_url,
      })),
      ...articles.map((a: any) => ({
        id: a.$id,
        title: a.title,
        description: a.excerpt || a.content?.substring(0, 150) + "...",
        type: 'Article',
        url: `/articles/${a.slug}`,
        imageUrl: a.thumbnail_url,
      })),
    ].filter(item => 
      item.title?.toLowerCase().includes(q) || 
      item.description?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto min-h-[50vh]">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Search Results
        </h3>
        {query ? (
          <p className="text-muted text-sm md:text-base">
            Found <span className="font-bold text-accent">{results.length}</span> results for "<span className="italic">{query}</span>"
          </p>
        ) : (
          <p className="text-muted text-sm md:text-base">
            Enter a search term in the navigation bar to begin.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {results.length > 0 ? (
          results.map((result) => (
            <Link 
              key={`${result.type}-${result.id}`} 
              href={result.url}
              className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-4"
            >
              {result.imageUrl && (
                <div className="relative w-full md:w-48 h-32 md:h-auto rounded-xl overflow-hidden shrink-0 bg-muted">
                  <Image src={result.imageUrl} alt={result.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {result.type}
                  </Badge>
                </div>
                <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  <Highlighter text={result.title} query={query} />
                </h4>
                <p className="text-sm text-secondary-text line-clamp-2">
                  <Highlighter text={result.description || ""} query={query} />
                </p>
                <div className="flex items-center gap-1 text-xs font-bold text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Read more <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))
        ) : query ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl font-bold">No results found</h4>
            <p className="text-secondary-text max-w-sm">
              We couldn't find anything matching "{query}". Try adjusting your search terms or checking for typos.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
