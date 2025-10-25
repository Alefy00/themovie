import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FavoriteMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
};

type FavoritesState = {
  items: FavoriteMovie[];
};

// carrega favoritos salvos no localStorage ao iniciar
function loadFromStorage(): FavoriteMovie[] {
  try {
    const raw = localStorage.getItem("favorites_v1");
    if (!raw) return [];
    return JSON.parse(raw) as FavoriteMovie[];
  } catch {
    return [];
  }
}

// salva no localStorage sempre que mudar
function saveToStorage(items: FavoriteMovie[]) {
  try {
    localStorage.setItem("favorites_v1", JSON.stringify(items));
  } catch {
    // silencioso, pra não quebrar app se storage falhar
  }
}

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const exists = state.items.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToStorage(state.items);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((m) => m.id !== action.payload);
      saveToStorage(state.items);
    },
    toggleFavorite(state, action: PayloadAction<FavoriteMovie>) {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((m) => m.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(state.items);
    },
    clearFavorites(state) {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
