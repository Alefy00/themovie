import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchSearchResults } from "../../features/movies/thunks";
import MovieCard from "../../components/MovieCard/MovieCard";
import { highlightTextWithBadge } from "../../utils/highlightText";

export default function SearchPage() {
  const [params] = useSearchParams();
  const term = (params.get("q") ?? "").trim();

  const dispatch = useAppDispatch();

  const {
    data: results,
    totalResults,
    isLoading,
    error,
    query: currentQuery,
  } = useAppSelector((state) => state.movies.search);

  // dispara a busca sempre que o "term" mudar
  useEffect(() => {
    if (term.length > 0) {
      dispatch(fetchSearchResults({ query: term, page: 1 }));
    }
  }, [term, dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-4 text-white">
      {/* header de info */}
      <h1 className="text-xl font-semibold text-white">
        Resultados para:{" "}
        <span className="text-yellow-400">
          "{term || "..."}"
        </span>
      </h1>

      {totalResults > 0 && !isLoading && !error && (
        <p className="text-sm text-gray-300 mt-1">
          Encontrados {totalResults} filmes
        </p>
      )}

      {isLoading && (
        <p className="text-sm text-gray-400 mt-2">Buscando filmes...</p>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-2">
          Erro ao buscar filmes: {error}
        </p>
      )}

      {/* se não está carregando, não deu erro, já buscou, e não voltou nada */}
      {!isLoading &&
        !error &&
        term &&
        currentQuery === term &&
        results.length === 0 && (
          <p className="text-sm text-gray-400 mt-6">
            Nenhum resultado encontrado.
          </p>
        )}

      {/* grid de resultados */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8">
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            poster_path={movie.poster_path}
            isFavorite={false} // depois ligamos no favoritesSlice
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
