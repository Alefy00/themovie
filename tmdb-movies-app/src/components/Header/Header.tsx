import { useState } from "react";
import type { FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const [term, setTerm] = useState(initialQ);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = term.trim();
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  const isHome = location.pathname === "/";
  const isFav = location.pathname === "/favorites";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1f2733] border-b border-black/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4 gap-3">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-yellow-50">
          <span className="text-xl">🎬</span>
          <span className="text-xl font-semibold text-[#facc15]">
            MovieDB
          </span>
        </Link>

        {/* CAMPO DE BUSCA CENTRALIZADO */}
        <div className="flex-1 flex justify-center order-last md:order-none">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <input
              name="q"
              type="search"
              autoComplete="off"
              className="w-full bg-[#2a3444] text-sm text-gray-200 placeholder-gray-400 rounded-full px-4 py-2 outline-none border border-transparent focus:border-blue-500 transition"
              placeholder="Buscar filmes..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </form>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="flex items-center gap-3 text-sm font-medium text-gray-200">
          <Link
            to="/"
            className={
              "px-3 py-2 rounded-md " +
              (isHome
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10")
            }
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className={
              "px-3 py-2 rounded-md " +
              (isFav
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-white/10")
            }
          >
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  );
}
