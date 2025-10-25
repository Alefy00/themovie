
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

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbMovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: TmdbGenre[];
  tagline: string;
  runtime: number;
  homepage: string | null;
};

export type TmdbSearchMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbSearchMovie[];
  total_results: number;
  total_pages: number;
};

async function searchMovies(query: string, page = 1): Promise<TmdbSearchResponse> {
  const { data } = await apiClient.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return data;
}

async function getPopular(page = 1): Promise<TmdbPaginatedResponse<TmdbMovie>> {
  const { data } = await apiClient.get("/movie/popular", {
    params: { page },
  });
  return data;
}


async function getById(id: number): Promise<TmdbMovieDetail> {
  const { data } = await apiClient.get(`/movie/${id}`);
  return data;
}


export const moviesService = {
  getPopular,
  getById,
  searchMovies,
};