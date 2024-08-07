export interface Repository {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    description: string;
    license: {
        name: string;
    } | null;
}

export interface RepositoryState {
    repositories: Repository[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export type Order = 'asc' | 'desc';
