import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./thunks";

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

type MoviesState = {
  popular: PopularState;
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
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending -> loading
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.isLoading = true;
        state.popular.error = null;
      })
      // fulfilled -> sucesso
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

          // primeira página sobrescreve, próximas páginas acumulam (infinite scroll)
          if (action.payload.page === 1) {
            state.popular.data = action.payload.movies;
          } else {
            state.popular.data.push(...action.payload.movies);
          }
        }
      )
      // rejected -> erro
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.isLoading = false;
        state.popular.error =
          action.error.message ?? "Erro ao carregar filmes populares.";
      });
  },
});

export default moviesSlice.reducer;
