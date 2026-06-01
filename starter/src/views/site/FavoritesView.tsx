import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { IMAGE_BASE_URL } from "@/core/constants";

export const FavoritesView = () => {
  const { favorites, removeFavorite } = useUser();

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">❤️</div>
        <h2 className="font-semibold text-2xl text-gray-300">No favorites yet</h2>
        <Link className="rounded-lg bg-[#4a7c59] px-5 py-2 transition-colors hover:bg-[#3a6347]" to="/">
          Discover Something
        </Link>
      </div>
    );
  }

  const movies = favorites.filter((f) => f.mediaType === "movie");
  const tvShows = favorites.filter((f) => f.mediaType === "tv");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-1 font-bold text-3xl">Your Favorites</h1>
      <p className="mb-8 text-gray-400">
        {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
      </p>
      {movies.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-semibold text-xl">
            🎬 Movies <span className="font-normal text-gray-400 text-sm">({movies.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((item) => (
              <div className="group relative overflow-hidden rounded-xl bg-gray-800" key={`movie-${item.id}`}>
                <button
                  className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white text-xs opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                  onClick={() => removeFavorite(item.id, "movie")}
                >
                  ✕
                </button>
                <Link to={`/movies/${item.id}`}>
                  {item.posterPath ? (
                    <img alt={item.title} className="aspect-[2/3] w-full object-cover" src={`${IMAGE_BASE_URL}${item.posterPath}`} />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-700 p-2 text-center text-gray-400 text-sm">
                      {item.title}
                    </div>
                  )}
                  <div className="p-2">
                    <p className="line-clamp-2 font-semibold text-xs">{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      {tvShows.length > 0 && (
        <section>
          <h2 className="mb-4 font-semibold text-xl">
            📺 TV Shows <span className="font-normal text-gray-400 text-sm">({tvShows.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {tvShows.map((item) => (
              <div className="group relative overflow-hidden rounded-xl bg-gray-800" key={`tv-${item.id}`}>
                <button
                  className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white text-xs opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                  onClick={() => removeFavorite(item.id, "tv")}
                >
                  ✕
                </button>
                <Link to={`/tv/${item.id}`}>
                  {item.posterPath ? (
                    <img alt={item.title} className="aspect-[2/3] w-full object-cover" src={`${IMAGE_BASE_URL}${item.posterPath}`} />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-700 p-2 text-center text-gray-400 text-sm">
                      {item.title}
                    </div>
                  )}
                  <div className="p-2">
                    <p className="line-clamp-2 font-semibold text-xs">{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
