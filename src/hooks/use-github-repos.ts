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
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data: GitHubRepo[] = await response.json();
        
        // List of repository names to hide from the portfolio
        const excludedRepos = [
          'jthiadi',
          'portfolio',
          'verilog-basics',
          'computer-vision-basics',
          'machine-learning-basics',
          'applications-of-data-structures',
          'mips-assembly-programming',
          'application-of-linear-algebra',
          'dart-flutter-firebase-basics'
        ];

        // Filter and sort
        const filteredRepos = data
          .filter(repo => {
            const name = repo.name.toLowerCase();
            return (
              !name.includes('.github.io') && 
              !excludedRepos.includes(name)
            );
          })
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
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