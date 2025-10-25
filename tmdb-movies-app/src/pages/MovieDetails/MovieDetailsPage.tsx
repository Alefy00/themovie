import { useParams } from "react-router-dom";
import TagPill from "../../components/TagPill/TagPill";

export default function MovieDetailsPage() {
  // Vamos usar isso depois pra buscar dados reais via TMDB
  const { id } = useParams();

  // Mock inicial baseado no design
  const movie = {
    title: "Nome do Filme",
    genres: ["Ação", "Aventura", "Ficção"],
    releaseDate: "15 de março de 2024",
    rating: 8.5,
    overview:
      "Esta é a sinopse do filme, onde descrevemos brevemente a trama, os personagens principais e o que torna este filme especial. A sinopse deve ser envolvente e dar ao usuário uma ideia clara do que esperar sem revelar spoilers importantes.",
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna esquerda = imagem grande */}
        <div className="bg-gradient-to-b from-gray-600/40 to-gray-800/60 rounded-lg border border-black/20 shadow-md min-h-[260px] md:min-h-[320px] flex items-center justify-center text-gray-300 text-sm px-4">
          <span>Imagem Backdrop</span>
        </div>

        {/* Coluna direita = conteúdo */}
        <div className="text-white flex flex-col">
          {/* Título */}
          <h1 className="text-2xl font-semibold text-white">
            {movie.title}
          </h1>

          {/* Gêneros */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((g) => (
              <TagPill key={g} label={g} />
            ))}
          </div>

          {/* Infos (Data / Nota) */}
          <div className="mt-4 space-y-2 text-sm text-gray-200">
            <p>
              <span className="font-semibold text-white">
                Data de lançamento:
              </span>{" "}
              {movie.releaseDate}
            </p>

            <p className="flex items-center gap-2">
              <span className="font-semibold text-white">Nota TMDB:</span>
              <span className="inline-block text-xs font-semibold bg-yellow-400 text-black rounded-md px-2 py-[2px]">
                {movie.rating.toFixed(1)}
              </span>
            </p>
          </div>

          {/* Sinopse */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Sinopse
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/* Botão Favoritar */}
          <div className="mt-6">
            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-4 py-3 rounded-md transition"
              onClick={() => {
                // depois vamos disparar addFavorite(movie) via Redux
                console.log("Adicionar aos favoritos:", id);
              }}
            >
              <span className="text-base leading-none">❤️</span>
              <span>Adicionar aos Favoritos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
