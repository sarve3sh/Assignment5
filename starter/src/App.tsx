import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavoritesView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  TelevisionView,
  TrailersView,
  TrendingView,
  TvView,
} from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}>
        <Route element={<MoviesView />} path="/movies" />
        <Route element={<MoviesView />} path="/movies/category/:category" />
        <Route element={<TelevisionView />} path="/tv" />
        <Route element={<TelevisionView />} path="/tv/category/:category" />
        <Route element={<TvView />} path="/tv/:id">
          <Route element={<SeasonsView />} path="seasons" />
          <Route element={<EpisodeView />} path="seasons/:episodeNumber" />
        </Route>
        <Route element={<GenreView />} path="/genre/:genreId" />
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
        <Route element={<TrendingView />} path="/trending" />
        <Route element={<TrendingView />} path="trending/:id" />
        <Route element={<SearchView />} path="/search" />
        <Route element={<MovieView />} path="/movies/:id">
          <Route element={<TrailersView />} path="trailers" />
          <Route element={<CreditsView />} path="credits" />
          <Route element={<ReviewsView />} path="reviews" />
        </Route>
        <Route element={<CartView />} path="/cart" />
        <Route element={<FavoritesView />} path="/favorites" />
        <Route element={<SettingsView />} path="/settings" />
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
