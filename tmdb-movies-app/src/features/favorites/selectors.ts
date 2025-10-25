import type { RootState } from "../../app/store";


export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectIsFavoriteById = (id: number) => (state: RootState) =>
  state.favorites.items.some((m) => m.id === id);
