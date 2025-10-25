import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMovieById } from "../../features/movies/thunks";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { selectIsFavoriteById } from "../../features/favorites/selectors";
import { Heart } from "lucide-react";

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

  // chips de gênero (Ação / Aventura / Ficção)
  const genreChips = movie.genres?.map((g) => (
    <span
      key={g.id}
      className="bg-blue-600 text-white text-xs font-medium rounded-4xl px-4 py-[8px] leading-none"
    >
      {g.name}
    </span>
  ));

  function handleToggleFavorite() {
    if (!movie) return;

    dispatch(
      toggleFavorite({
        id: movie.id,
        title: movie.title,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path ?? null,
      })
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 pt-24 pb-12 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* BLOCO DA IMAGEM (lado esquerdo) */}
        <div className="w-full md:w-1/2">
          <div className="rounded-lg bg-gradient-to-b from-slate-500/40 to-slate-700/60 border border-black/20 shadow-md overflow-hidden min-h-[260px] flex items-center justify-center text-gray-300 text-sm">
            {backdropUrl ? (
              <img
                src={backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-gray-300 text-sm">Imagem Backdrop</span>
            )}
          </div>
        </div>

        {/* BLOCO DE TEXTO (lado direito) */}
        <div className="flex-1 flex flex-col">
          {/* TÍTULO */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          {/* GÊNEROS COMO CHIPS */}
          <div className="flex flex-wrap gap-2 mb-4">{genreChips}</div>

          {/* META: Data de lançamento / Nota TMDB */}
          <div className="text-sm text-gray-300 space-y-1 mb-6">
            <div>
              <span className="font-semibold text-gray-200">
                Data de lançamento:{" "}
              </span>
              <span className="text-gray-100">
                {formatReleaseDate(movie.release_date)}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-semibold text-gray-200">
                Nota TMDB:
              </span>
              <span className="inline-block text-xs font-semibold bg-yellow-400 text-black rounded-md px-2 py-[2px] leading-none shadow-sm">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>

          {/* SINOPSE */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Sinopse
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              {movie.overview || "Sem sinopse disponível."}
            </p>
          </div>

          {/* AÇÕES (botão favoritos + página oficial) */}
          <div className="mt-auto flex flex-wrap gap-4">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-white text-sm transition
                ${
                  isFavorite
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              {/* ícone coração */}
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-white text-white" : "text-white"
                }`}
              />
              <span>
                {isFavorite
                  ? "Remover dos Favoritos"
                  : "Adicionar aos Favoritos"}
              </span>
            </button>

            {movie.homepage && movie.homepage.trim() !== "" && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium underline-offset-2 hover:underline"
              >
                Página oficial ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


function formatReleaseDate(isoDate: string | undefined) {
  if (!isoDate) return "-";
  const [yyyy, mm, dd] = isoDate.split("-");
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}
