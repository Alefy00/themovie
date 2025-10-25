type MovieCardProps = {
  title: string;
  rating: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  // futuramente: poster_path
};

export default function MovieCard({
  title,
  rating,
  isFavorite = false,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <div className="bg-[#2a3444] rounded-lg overflow-hidden shadow-md border border-black/20 flex flex-col w-full max-w-[220px]">
      {/* Poster / área visual */}
      <div className="relative flex-1 min-h-[180px] bg-gradient-to-b from-gray-600/40 to-gray-800/60 flex items-center justify-center text-gray-300 text-sm">
        <span>Poster do Filme</span>

        {/* Botão favorito */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-red-400 hover:bg-black/80 transition"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      {/* Rodapé */}
      <div className="bg-[#1f2733] px-3 py-3 flex flex-col gap-2">
        <p className="text-sm text-white font-semibold leading-snug line-clamp-2">
          {title}
        </p>

        <div className="flex items-center gap-2">
          <span className="inline-block text-xs font-semibold bg-yellow-400 text-black rounded-md px-2 py-[2px]">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
