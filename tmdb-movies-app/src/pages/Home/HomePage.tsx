import MovieCard from "../../components/MovieCard/MovieCard";


export default function HomePage() {
  // mock inicial de filmes. Depois vamos buscar da API popular.
  const mockMovies = [
    { id: 1, title: "Título do Filme", rating: 8.5, isFavorite: false },
    { id: 2, title: "Filme Favoritado", rating: 9.2, isFavorite: true },
    { id: 3, title: "Outro Filme Popular", rating: 7.8, isFavorite: false },
    { id: 4, title: "Mais um Filme", rating: 8.1, isFavorite: false },
    { id: 5, title: "Filme Interessante", rating: 7.9, isFavorite: false },
    { id: 6, title: "Último Filme", rating: 8.7, isFavorite: false },
  ];

  return (
    <section className="max-w-7xl mx-auto">
      {/* título da página (não aparece no header visual do mock, mas bom pra acessibilidade/dev) */}
      <h1 className="sr-only">Filmes Populares</h1>

      {/* grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6">
        {mockMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.rating}
            isFavorite={movie.isFavorite}
            onToggleFavorite={() => {
              // no próximo passo isso vai disparar redux add/removeFavorite
              console.log("toggle fav", movie.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}
