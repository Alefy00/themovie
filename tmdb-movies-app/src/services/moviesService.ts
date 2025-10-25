import apiClient from "./apiClient";

// Tipos básicos que vamos usar (poderiam estar em types.ts)
export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
};

export type TmdbPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
};

async function getPopular(page = 1): Promise<TmdbPaginatedResponse<TmdbMovie>> {
  const { data } = await apiClient.get("/movie/popular", {
    params: { page },
  });
  return data;
}

export const moviesService = {
  getPopular,
};
