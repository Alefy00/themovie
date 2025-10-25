import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPopularMovies } from "../../features/movies/thunks";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(
    (state) => state.movies.popular
  );

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchPopularMovies(1));
    }
  }, [dispatch, data.length]);

  return (
    <section className="max-w-7xl mx-auto text-white">
      <h1 className="sr-only">Filmes Populares</h1>

      {error && (
        <div className="text-red-400 text-sm bg-red-950/30 border border-red-600/40 rounded-md p-3 mb-4">
          {error}
        </div>
      )}

      {isLoading && data.length === 0 && (
        <p className="text-gray-300 text-sm">Carregando filmes...</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6">
        {data.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            poster_path={movie.poster_path}
          />
        ))}
      </div>
    </section>
  );
}
