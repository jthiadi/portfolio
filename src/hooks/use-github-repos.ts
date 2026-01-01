import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      try {
        setLoading(true);
        // 1. Increased per_page to 100 to get all projects
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data: GitHubRepo[] = await response.json();
        
        // 2. Filter out specific repos: .github.io, jthiadi, and portfolio
        const filteredRepos = data.filter(repo => {
          const name = repo.name.toLowerCase();
          return (
            !name.includes('.github.io') && 
            name !== 'jthiadi' && 
            name !== 'portfolio'
          );
        });

        // 3. Sort by stars and REMOVED .slice(0, 4) to show everything
        const sortedRepos = filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(sortedRepos);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
}