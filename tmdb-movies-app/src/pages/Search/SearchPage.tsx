import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { highlightTextWithBadge } from "../../utils/highlightText";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("q")?.trim() ?? "";

  // mock de resultado de busca
  const totalResults = 156;
  const results = [
    { id: 201, title: "Grande Aventura", rating: 8.3, isFavorite: false },
    { id: 202, title: "Aventura no Espaço", rating: 7.9, isFavorite: false },
    { id: 203, title: "Épica Aventura", rating: 9.1, isFavorite: true },
    { id: 204, title: "Aventura Submarina", rating: 8.0, isFavorite: false },
    { id: 205, title: "Última Aventura", rating: 8.7, isFavorite: false },
    { id: 206, title: "Nova Aventura", rating: 7.5, isFavorite: false },
  ];

  return (
    <section className="max-w-7xl mx-auto text-white">
      {/* Título linha 1 */}
      <h1 className="text-xl font-semibold text-white">
        Resultados para:{" "}
        <span className="text-yellow-400">"{term || "..." }"</span>
      </h1>

      {/* Subtítulo linha 2 */}
      <p className="text-sm text-gray-300 mt-1">
        Encontrados {totalResults} filmes
      </p>

      {/* Grid dos resultados */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            isFavorite={movie.isFavorite}
            onToggleFavorite={() => {
              console.log("toggle fav from search", movie.id);
            }}
            customTitle={highlightTextWithBadge(movie.title, term)}
          />
        ))}
      </div>
    </section>
  );
}
