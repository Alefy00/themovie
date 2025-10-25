import { createSlice } from "@reduxjs/toolkit";

export type MovieLite = {
  id: number;
  title: string;
  vote_average: number;
  poster_path?: string | null;
};

type MoviesState = {
  popular: {
    data: MovieLite[];
    isLoading: boolean;
    error: string | null;
  };
};

const initialState: MoviesState = {
  popular: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // a gente vai trocar isso depois por thunks async (fetchPopularMovies)
    setPopularLoading(state) {
      state.popular.isLoading = true;
      state.popular.error = null;
    },
    setPopularSuccess(state, action: { payload: MovieLite[] }) {
      state.popular.isLoading = false;
      state.popular.data = action.payload;
    },
    setPopularError(state, action: { payload: string }) {
      state.popular.isLoading = false;
      state.popular.error = action.payload;
    },
  },
});

export const {
  setPopularLoading,
  setPopularSuccess,
  setPopularError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
