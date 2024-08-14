/**
 * Type for GitHub repositories.
 *
 * @interface Repository
 * @property {number} id - The unique identifier of the repository.
 * @property {string} name - The name of the repository.
 * @property {string} language - The primary programming language used in the repository.
 * @property {number} forks_count - The number of times the repository has been forked.
 * @property {number} stargazers_count - The number of stars the repository has received.
 * @property {string} updated_at - The date and time when the repository was last updated.
 * @property {string} description - A brief description of the repository.
 * @property {{ name: string } | null} license - The license under which the repository is distributed, or null if no license is specified.
 */
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

/**
 *Type for RTK store.
 *
 * @interface RepositoryState
 * @property {Repository[]} repositories - The array of repositories in the collection.
 * @property {'idle' | 'loading' | 'succeeded' | 'failed'} status - The current status of the repository collection.
 * @property {string | null} error - The error message, or null if no error occurred.
 * @property {string} searchQuery - The search query used to filter the repositories.
 */
export interface RepositoryState {
  repositories: Repository[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
}

/**
 *  *Type for header component props.
 * @param {func} onSearch - The callback function to handle search events.
 */
export interface HeaderProps {
  onSearch: (searchText: string) => void;
}

/**
 *Type for sorting order options.
 * @enum {string} 'asc' | 'desc' - The sorting order options.
 */
export type Order = 'asc' | 'desc';
