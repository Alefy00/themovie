import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FavoriteMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path?: string | null;
};

type FavoritesState = {
  items: FavoriteMovie[];
};

const initialState: FavoritesState = {
  items: [
    { id: 101, title: "Filme Favorito 1", vote_average: 9.2 },
    { id: 102, title: "Filme Favorito 2", vote_average: 8.8 },
    { id: 103, title: "Filme Favorito 3", vote_average: 9.0 },
  ],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
