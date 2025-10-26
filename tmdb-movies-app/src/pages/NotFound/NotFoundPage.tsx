import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#1f2733] text-center px-6 text-white">
      <AlertTriangle className="w-16 h-16 text-yellow-400 mb-6" />
      <h1 className="text-5xl font-bold text-white mb-2">404</h1>
      <p className="text-lg text-gray-300 mb-6">
        Oops! A página que você tentou acessar não existe.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md font-medium transition"
        >
          Voltar para Home
        </Link>
        <Link
          to="/favorites"
          className="bg-[#2a3444] hover:bg-[#374151] text-gray-200 px-5 py-2 rounded-md font-medium transition"
        >
          Ver Favoritos
        </Link>
      </div>

      <p className="text-xs text-gray-500 mt-8">
        MovieDB © {new Date().getFullYear()} — Todos os direitos reservados.
      </p>
    </section>
  );
}
