import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeFavorite } from "../../features/favorites/favoritesSlice";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  // opções de ordenação
  type SortOption = "title-asc" | "title-desc" | "rating-desc" | "rating-asc";
  const [sortBy, setSortBy] = useState<SortOption>("title-asc");

  // aplica ordenação visual
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
      default:
        break;
    }

    return arr;
  }, [favorites, sortBy]);

  function handleRemove(id: number) {
    dispatch(removeFavorite(id));
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-white">
        Meus Filmes Favoritos
      </h1>

      {/* Linha de ordenação */}
      <div className="mt-6 flex flex-col gap-2 text-sm text-gray-200 md:flex-row md:items-center md:gap-4">
        <span className="text-white font-medium">Ordenar por:</span>

        <select
          className="bg-[#2a3444] text-gray-100 border border-black/30 rounded-md px-3 py-2 text-sm max-w-[180px] outline-none focus:border-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="title-asc">Título (A-Z)</option>
          <option value="title-desc">Título (Z-A)</option>
          <option value="rating-desc">Nota (maior-menor)</option>
          <option value="rating-asc">Nota (menor-maior)</option>
        </select>
      </div>

      {/* Grid de favoritos */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {sortedFavorites.map((movie) => (
          <FavoriteCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
}
