import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById, fetchPopularMovies, fetchSearchResults } from "./thunks";
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
  search: SearchState;
};

type SearchState = {
  query: string;
  data: MovieLite[];
  page: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
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
  search: {
    query: "",
    data: [],
    page: 0,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
    error: null,
  },
}

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

    // BUSCA
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.search.isLoading = true;
        state.search.error = null;

        // se a query mudou, vamos resetar os resultados (novo termo de busca)
        const incomingQuery = action.meta.arg.query;
        if (incomingQuery !== state.search.query) {
          state.search.query = incomingQuery;
          state.search.data = [];
          state.search.page = 0;
          state.search.totalPages = 0;
          state.search.totalResults = 0;
        }
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (
          state,
          action: PayloadAction<{
            query: string;
            page: number;
            totalPages: number;
            totalResults: number;
            movies: MovieLite[];
          }>
        ) => {
          state.search.isLoading = false;
          state.search.error = null;

          state.search.query = action.payload.query;
          state.search.page = action.payload.page;
          state.search.totalPages = action.payload.totalPages;
          state.search.totalResults = action.payload.totalResults;

          if (action.payload.page === 1) {
            state.search.data = action.payload.movies;
          } else {
            state.search.data.push(...action.payload.movies);
          }
        }
      )
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.search.isLoading = false;
        state.search.error =
          action.error.message ?? "Erro ao buscar filmes.";
      });
  },
});

export default moviesSlice.reducer;