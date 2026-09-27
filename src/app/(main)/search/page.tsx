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
import NextLink from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, SearchX, Grid, List } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const view = typeof params.view === 'string' ? params.view : 'list';

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-[3px] border-foreground pb-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
            Search Results
          </h3>
          {query ? (
            <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
              Found <span className="font-black bg-foreground text-background px-2 mx-1 py-0.5">{results.length}</span> results for "<span className="italic">{query}</span>"
            </p>
          ) : (
            <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm mt-2">
              ENTER A SEARCH TERM IN THE NAVIGATION BAR TO BEGIN.
            </p>
          )}
        </div>
        
        {results.length > 0 && (
          <div className="hidden md:flex items-center border-[3px] border-foreground self-start md:self-auto shadow-[4px_4px_0_0_var(--foreground)]">
            <NextLink 
              href={`/search?q=${query}&view=list`} 
              className={`px-3 py-2 transition-none ${view === 'list' ? 'bg-foreground text-background' : 'bg-surface text-foreground hover:bg-secondary/10'}`}
              scroll={false}
            >
              <List className="w-5 h-5" />
            </NextLink>
            <div className="w-[3px] bg-foreground self-stretch" />
            <NextLink 
              href={`/search?q=${query}&view=grid`} 
              className={`px-3 py-2 transition-none ${view === 'grid' ? 'bg-foreground text-background' : 'bg-surface text-foreground hover:bg-secondary/10'}`}
              scroll={false}
            >
              <Grid className="w-5 h-5" />
            </NextLink>
          </div>
        )}
      </div>

      <div key={view} className={`animate-in fade-in duration-500 ${view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}`}>
        {results.length > 0 ? (
          results.map((result) => (
            <Link 
              key={`${result.type}-${result.id}`} 
              href={result.url}
              className={`flex ${view === 'grid' ? 'flex-col' : 'flex-col md:flex-row'} gap-4 p-5 rounded-none bg-surface border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group animate-in fade-in slide-in-from-bottom-4`}
            >
              {result.imageUrl && (
                <div className={`relative w-full ${view === 'grid' ? 'h-48' : 'md:w-48 h-32 md:h-auto'} rounded-none overflow-hidden shrink-0 border-[3px] border-foreground bg-muted`}>
                  <Image src={result.imageUrl} alt={result.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <div className="flex items-center gap-2">
                  <span className="bg-foreground text-background font-black uppercase tracking-widest text-[10px] px-2 py-1">
                    {result.type}
                  </span>
                </div>
                <h4 className="text-lg font-black text-foreground uppercase tracking-wider mt-1 w-fit">
                  <Highlighter text={result.title} query={query} />
                </h4>
                <p className="text-sm font-bold text-foreground leading-snug line-clamp-2">
                  <Highlighter text={result.description || ""} query={query} />
                </p>
                <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  READ MORE <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            </Link>
          ))
        ) : query ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center animate-in fade-in zoom-in-95 border-[3px] border-foreground shadow-[8px_8px_0_0_var(--foreground)] bg-surface p-8">
            <div className="w-16 h-16 rounded-none border-[3px] border-foreground flex items-center justify-center bg-foreground text-background">
              <SearchX className="w-8 h-8" />
            </div>
            <h4 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-foreground">NO RESULTS FOUND</h4>
            <p className="text-foreground font-bold tracking-widest uppercase text-xs md:text-sm max-w-sm">
              I COULDN'T FIND ANYTHING MATCHING "<span className="bg-[#DFFF00] text-black px-1 mx-1 border-[2px] border-black inline-block">{query}</span>". TRY ADJUSTING YOUR SEARCH TERMS.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
