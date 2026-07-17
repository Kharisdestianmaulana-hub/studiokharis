import { NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
  pushed_at: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = 'Kharisdestianmaulana-hub';

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    };

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      { headers }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.statusText}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter: only original repos (not forks), sort by pushed_at, take top 10
    const filteredRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 10);

    // Fetch commits for each repo
    const reposWithCommits = await Promise.all(
      filteredRepos.map(async (repo) => {
        try {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`,
            { headers }
          );

          if (!commitsResponse.ok) {
            return {
              ...repo,
              commits: [],
            };
          }

          const commits: GitHubCommit[] = await commitsResponse.json();

          return {
            ...repo,
            commits: commits.map(commit => ({
              sha: commit.sha.substring(0, 7),
              message: commit.commit.message,
              author: commit.author?.login || commit.commit.author.name,
              avatar: commit.author?.avatar_url,
              date: commit.commit.author.date,
            })),
          };
        } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
          return {
            ...repo,
            commits: [],
          };
        }
      })
    );

    return NextResponse.json(reposWithCommits);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
