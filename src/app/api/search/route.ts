import { NextResponse } from 'next/server';
import { getProjects } from '@/data/projects';
import { getArticles } from '@/data/articles';
import { getExperiences } from '@/data/experience';
import { getTechStack } from '@/data/tech-stack';
import { getChangelogs } from '@/data/timeline';
import { getOpenSource } from '@/data/oss';
import { getProfileData } from '@/data/profile';
import { getSocialLinks } from '@/data/socials';

export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // Fetch all needed data in parallel
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

    // Flatten tech stack items from categories
    const allTechStacks = techStackCategories.flatMap((cat: any) => 
      cat.items.map((item: any) => ({
        ...item,
        categoryName: cat.category
      }))
    );

    let results = [
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
    ];

    // If there's a query parameter, filter results
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(item => 
        item.title?.toLowerCase().includes(q) || 
        item.description?.toLowerCase().includes(q) ||
        item.type?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: 'Failed to fetch search data' }, { status: 500 });
  }
}
