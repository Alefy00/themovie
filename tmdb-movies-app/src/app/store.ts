import { configureStore } from "@reduxjs/toolkit";


import favoritesReducer from "../features/favorites/favoritesSlice";
import moviesReducer from "../features/movies/moviesSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    ui: uiReducer,
  },
});

// Tipos inferidos pra usar no projeto todo
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
