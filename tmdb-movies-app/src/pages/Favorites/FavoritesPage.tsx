import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeFavorite,
  clearFavorites,
} from "../../features/favorites/favoritesSlice";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  // opções de ordenação
  type SortOption = "title-asc" | "title-desc" | "rating-desc" | "rating-asc";
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");

  const sortedFavorites = useMemo(() => {
    const arr = [...favorites];
    switch (sortBy) {
      case "title-asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        arr.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "rating-asc":
        arr.sort((a, b) => a.vote_average - b.vote_average);
        break;
    }
    return arr;
  }, [favorites, sortBy]);

  function handleRemove(id: number) {
    dispatch(removeFavorite(id));
  }

  function handleClearAll() {
    dispatch(clearFavorites());
  }

  // estado vazio
  if (favorites.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 text-white text-center py-20">
        <div className="text-6xl mb-6">🎬</div>
        <h2 className="text-lg font-semibold text-white">
          Nenhum filme favorito ainda
        </h2>
        <p className="text-sm text-gray-400 mt-2 mb-6">
          Comece explorando filmes populares e adicione seus favoritos!
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-md transition"
        >
          Explorar Filmes
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Meus Filmes Favoritos</h1>

          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-200 md:flex-row md:items-center md:gap-4">
            <span className="font-medium text-white">Ordenar por:</span>

            <select
              className="bg-[#2a3444] text-gray-100 border border-black/30 rounded-md px-3 py-2 text-sm max-w-[180px] outline-none focus:border-blue-500"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
            >
              <option value="title-asc">Título (A-Z)</option>
              <option value="title-desc">Título (Z-A)</option>
              <option value="rating-desc">Nota (maior-menor)</option>
              <option value="rating-asc">Nota (menor-maior)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleClearAll}
          className="self-start md:self-auto bg-red-500 hover:bg-red-400 text-white text-sm font-medium px-4 py-2 rounded-md transition"
        >
          Limpar todos
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {sortedFavorites.map((movie) => (
          <FavoriteCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            rating={movie.vote_average}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}
