import { Link } from "react-router-dom";

type FavoriteCardProps = {
  id: number;
  title: string;
  rating: number;
  poster_path: string | null;
  onRemove: (id: number) => void;
};

export default function FavoriteCard({
  id,
  title,
  rating,
  poster_path,
  onRemove,
}: FavoriteCardProps) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : null;

  function handleRemoveClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    // impede que o clique na lixeira faça navegação pro detalhe
    e.stopPropagation();
    e.preventDefault();
    onRemove(id);
  }

  return (
    <div className="bg-[#2a3444] rounded-lg overflow-hidden shadow-md border border-black/20 flex flex-col w-full max-w-[220px] transition-transform hover:-translate-y-[2px]">
      {/* área da imagem vira Link pro detalhe */}
      <Link
        to={`/movie/${id}`}
        className="relative flex-1 min-h-[180px] bg-gradient-to-b from-gray-600/40 to-gray-800/60 flex items-center justify-center text-gray-300 text-sm overflow-hidden"
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster do filme ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 text-xs text-center px-2">
            Poster indisponível
          </span>
        )}

        {/* botão remover */}
        <button
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-black/80 transition"
          title="Remover dos favoritos"
        >
          🗑
        </button>
      </Link>

      {/* rodapé também vira Link pro detalhe */}
      <Link
        to={`/movie/${id}`}
        className="bg-[#1f2733] px-3 py-3 flex flex-col gap-2 hover:bg-[#253040] transition"
      >
        <p className="text-sm text-white font-semibold leading-snug line-clamp-2">
          {title}
        </p>

        <span className="inline-block text-xs font-semibold bg-yellow-400 text-black rounded-md px-2 py-[2px] w-fit">
          {rating.toFixed(1)}
        </span>
      </Link>
    </div>
  );
}
