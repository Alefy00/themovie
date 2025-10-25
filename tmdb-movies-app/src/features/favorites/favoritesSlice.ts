import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
};

type FavoritesState = {
  items: FavoriteMovie[];
};

const initialState: FavoritesState = {
  items: [],
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
