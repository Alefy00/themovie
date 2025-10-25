import { Link } from "react-router-dom";

type MovieCardProps = {
  id: number;
  title: string;
  rating: number;
  poster_path?: string | null;
  isFavorite?: boolean;
  customTitle?: React.ReactNode;
  onToggleFavorite?: () => void;
};

export default function MovieCard({
  id,
  title,
  rating,
  poster_path,
  isFavorite = false,
  customTitle,
  onToggleFavorite,
}: MovieCardProps) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : null;

  return (
    <div className="bg-[#2a3444] rounded-lg overflow-hidden shadow-md border border-black/20 flex flex-col w-full max-w-[220px] transition-transform hover:-translate-y-[2px]">
      <div className="relative flex-1 min-h-[180px] bg-gradient-to-b from-gray-600/40 to-gray-800/60 flex items-center justify-center text-gray-300 text-sm overflow-hidden">
        <Link
          to={`/movie/${id}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Poster do filme ${title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-gray-400">Poster indisponível</span>
          )}
        </Link>

        {/* botão de favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleFavorite?.();
          }}
          className="absolute top-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-red-400 hover:bg-black/80 transition"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <Link
        to={`/movie/${id}`}
        className="bg-[#1f2733] px-3 py-3 flex flex-col gap-2 hover:bg-[#253040] transition"
      >
        <p className="text-sm text-white font-semibold leading-snug line-clamp-2">
          {customTitle ?? title}
        </p>

        <div className="flex items-center gap-2">
          <span className="inline-block text-xs font-semibold bg-yellow-400 text-black rounded-md px-2 py-[2px]">
            {rating.toFixed(1)}
          </span>
        </div>
      </Link>
    </div>
  );
}
