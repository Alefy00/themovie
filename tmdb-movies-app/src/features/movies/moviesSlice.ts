import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById, fetchPopularMovies } from "./thunks";
import type { TmdbMovieDetail } from "../../services/moviesService";

export type MovieLite = {
  id: number;
  title: string;
  rating: number;
  poster_path?: string | null;
};

type PopularState = {
  data: MovieLite[];
  page: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
};

type CurrentMovieState = {
  data: TmdbMovieDetail | null;
  isLoading: boolean;
  error: string | null;
};

type MoviesState = {
  popular: PopularState;
  current: CurrentMovieState;
};

const initialState: MoviesState = {
  popular: {
    data: [],
    page: 0,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
    error: null,
  },
  current: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // POPULARES
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.isLoading = true;
        state.popular.error = null;
      })
      .addCase(
        fetchPopularMovies.fulfilled,
        (
          state,
          action: PayloadAction<{
            page: number;
            totalPages: number;
            totalResults: number;
            movies: MovieLite[];
          }>
        ) => {
          state.popular.isLoading = false;
          state.popular.page = action.payload.page;
          state.popular.totalPages = action.payload.totalPages;
          state.popular.totalResults = action.payload.totalResults;

          if (action.payload.page === 1) {
            state.popular.data = action.payload.movies;
          } else {
            state.popular.data.push(...action.payload.movies);
          }
        }
      )
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.isLoading = false;
        state.popular.error =
          action.error.message ?? "Erro ao carregar filmes.";
      });

    // DETALHE
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.current.isLoading = true;
        state.current.error = null;
      })
      .addCase(
        fetchMovieById.fulfilled,
        (state, action: PayloadAction<TmdbMovieDetail>) => {
          state.current.isLoading = false;
          state.current.data = action.payload;
        }
      )
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.current.isLoading = false;
        state.current.error =
          action.error.message ?? "Erro ao carregar detalhes.";
      });
  },
});

export default moviesSlice.reducer;
