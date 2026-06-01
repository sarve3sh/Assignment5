import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { useUser } from "@/context/UserContext";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from "@/core/constants";
import { calcPrice, formatPrice } from "@/core/pricing";
import type { MovieRepsonse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, {}, [id]);
  const { isFavorite, addFavorite, removeFavorite, isInCart, addToCart, removeFromCart } = useUser();

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const favorited = isFavorite(data.id, "movie");
  const inCart = isInCart(data.id, "movie");
  const price = calcPrice(data.release_date);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(data.id, "movie");
    } else {
      addFavorite({ id: data.id, mediaType: "movie", posterPath: data.poster_path, title: data.title });
    }
  };

  const toggleCart = () => {
    if (inCart) {
      removeFromCart(data.id, "movie");
    } else {
      addToCart({ id: data.id, mediaType: "movie", posterPath: data.poster_path, price, title: data.title });
    }
  };

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="space-y-6 p-6">
        <div
          className="h-[420px] rounded-2xl bg-center bg-cover"
          style={{ backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})` }}
        />
        <div className="flex gap-8">
          <img alt={data.title} className="h-[330px] w-[220px] rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.poster_path}`} />
          <div className="flex-1 space-y-4">
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {data.release_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            <div className="flex gap-3">
              <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-all ${favorited ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
                onClick={toggleFavorite}
              >
                {favorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
              </button>
              <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-all ${inCart ? "bg-[#4a7c59] text-white hover:bg-[#3a6347]" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
                onClick={toggleCart}
              >
                {inCart ? "✓ In Cart" : `🛒 Add to Cart · ${formatPrice(price)}`}
              </button>
            </div>
            <LinkGroup
              options={[
                { label: "Credits", to: "credits" },
                { label: "Reviews", to: "reviews" },
                { label: "Trailers", to: "trailers" },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
