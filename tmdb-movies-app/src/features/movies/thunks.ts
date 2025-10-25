import { createAsyncThunk } from "@reduxjs/toolkit";
import { moviesService } from "../../services/moviesService";
import type { TmdbMovie } from "../../services/moviesService";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page: number = 1) => {
    const data = await moviesService.getPopular(page);

    // aqui já podemos normalizar pra UI
    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results.map((m: TmdbMovie) => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster_path: m.poster_path,
      })),
    };
  }
);


export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id: number) => {
    const movie = await moviesService.getById(id);
    return movie;
  }
);