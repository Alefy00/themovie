import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMovieById } from "../../features/movies/thunks";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { selectIsFavoriteById } from "../../features/favorites/selectors";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: movie, isLoading, error } = useAppSelector(
    (state) => state.movies.current
  );

  const isFavorite = useAppSelector((state) =>
    movie ? selectIsFavoriteById(movie.id)(state) : false
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(Number(id)));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Carregando detalhes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-400">
        {error}
      </div>
    );
  }

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const genres =
    movie.genres && movie.genres.length > 0
      ? movie.genres.map((g) => g.name).join(", ")
      : "Sem gênero";

  function handleToggleFavorite() {
    if (!movie) return; // garante em runtime

    dispatch(
      toggleFavorite({
        id: movie!.id,
        title: movie!.title,
        vote_average: movie!.vote_average,
        poster_path: movie!.poster_path ?? null,
      })
    );
  }


  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white flex flex-col md:flex-row gap-8">
      {/* imagem */}
      <div className="w-full md:w-1/2">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-72 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-300 text-sm">Sem imagem</span>
          </div>
        )}
      </div>

      {/* conteúdo */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

          {movie.tagline && (
            <p className="italic text-gray-400 mb-3">"{movie.tagline}"</p>
          )}

          <p className="text-sm text-gray-400 mb-4">
            {genres} • {movie.release_date?.slice(0, 4)} • ⭐{" "}
            {movie.vote_average?.toFixed(1)} • {movie.runtime} min
          </p>

          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>

        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <button
            onClick={handleToggleFavorite}
            className={`font-semibold px-5 py-2 rounded-md transition
              ${
                isFavorite
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
          >
            {isFavorite ? "Remover dos Favoritos 💔" : "Adicionar aos Favoritos ❤️"}
          </button>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              Página oficial ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
