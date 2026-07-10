import { NextResponse } from 'next/server';
import { getProjects } from '@/data/projects';
import { getArticles } from '@/data/articles';

export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // Fetch all needed data in parallel
    const [projects, articles] = await Promise.all([
      getProjects(),
      getArticles()
    ]);

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
    ];

    // If there's a query parameter, filter results
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(item => 
        item.title?.toLowerCase().includes(q) || 
        item.description?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: 'Failed to fetch search data' }, { status: 500 });
  }
}
