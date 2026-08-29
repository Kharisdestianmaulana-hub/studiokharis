import { getProjects } from '@/data/projects';
import { getArticles } from '@/data/articles';
import { getExperiences } from '@/data/experience';
import { getTechStack } from '@/data/tech-stack';
import { getChangelogs } from '@/data/timeline';
import { getOpenSource } from '@/data/oss';
import { getProfileData } from '@/data/profile';
import { getSocialLinks } from '@/data/socials';
import { Highlighter } from "@/components/ui/Highlighter";
import { TransitionLink as Link } from "@/components/layout/TransitionLink";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, SearchX } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';

  let results: any[] = [];

  if (query) {
    const q = query.toLowerCase();
    
    const [
      projects, 
      articles, 
      experiences, 
      techStackCategories, 
      changelogs, 
      oss, 
      profile, 
      socials
    ] = await Promise.all([
      getProjects(),
      getArticles(),
      getExperiences(),
      getTechStack(),
      getChangelogs(),
      getOpenSource(),
      getProfileData(),
      getSocialLinks()
    ]);

    const allTechStacks = techStackCategories.flatMap((cat: any) => 
      cat.items.map((item: any) => ({
        ...item,
        categoryName: cat.category
      }))
    );

    results = [
      ...projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        type: 'Project',
        url: `/projects/${p.id}`,
        imageUrl: p.thumbnail,
      })),
      ...articles.map((a: any) => ({
        id: a.id,
        title: a.title,
        description: a.excerpt,
        type: 'Article',
        url: `/articles/${a.slug}`,
        imageUrl: a.cover,
      })),
      ...experiences.map((e: any) => ({
        id: e.id,
        title: `${e.role} at ${e.company}`,
        description: e.description || e.duration,
        type: 'Experience',
        url: `/experience`,
      })),
      ...allTechStacks.map((t: any, index: number) => ({
        id: `tech-${index}`,
        title: t.name,
        description: `Tech Stack • ${t.categoryName}`,
        type: 'Tech Stack',
        url: `/tech-stack`,
      })),
      ...changelogs.map((c: any) => ({
        id: c.id,
        title: `${c.project_name} - ${c.version}`,
        description: c.description || c.type,
        type: 'Changelog',
        url: `/timeline`,
      })),
      ...oss.map((o: any) => ({
        id: o.id,
        title: o.name,
        description: o.description,
        type: 'Open Source',
        url: o.url,
      })),
      ...(profile ? [{
        id: 'profile-info',
        title: profile.name,
        description: profile.about ? profile.about.substring(0, 100) + '...' : profile.tagline,
        type: 'Profile',
        url: `/about`,
        imageUrl: profile.avatarUrl,
      }] : []),
      ...socials.map((s: any) => ({
        id: s.name,
        title: s.name,
        description: 'Social Media Profile',
        type: 'Social',
        url: s.url,
      }))
    ].filter(item => 
      item.title?.toLowerCase().includes(q) || 
      item.description?.toLowerCase().includes(q) ||
      item.type?.toLowerCase().includes(q)
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
              className="flex flex-col md:flex-row gap-4 p-5 rounded-none-2xl bg-surface border border-border hover:border-accent/50 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-4"
            >
              {result.imageUrl && (
                <div className="relative w-full md:w-48 h-32 md:h-auto rounded-none overflow-hidden shrink-0 bg-muted">
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
            <div className="w-16 h-16 rounded-none bg-accent/10 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl font-bold">No results found</h4>
            <p className="text-secondary-text max-w-sm">
              I couldn't find anything matching "{query}". Try adjusting your search terms or checking for typos.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
