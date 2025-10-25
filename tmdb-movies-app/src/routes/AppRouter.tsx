import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import MovieDetailsPage from "../pages/MovieDetails/MovieDetailsPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import SearchPage from "../pages/Search/SearchPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";


export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
