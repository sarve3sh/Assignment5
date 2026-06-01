import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { TV_ENDPOINT } from "@/core/constants";
import { calcPrice, formatPrice } from "@/core/pricing";
import type { TvShowResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<TvShowResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const { isInCart, addToCart, removeFromCart } = useUser();

  if (!data) return <p>Loading...</p>;

  return (
    <div className="mt-4 space-y-2">
      {data.seasons.map((season) => {
        const inCart = isInCart(data.id, "tv", season.season_number);
        const price = calcPrice(season.air_date);

        return (
          <div className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3" key={season.id}>
            <span
              className="cursor-pointer transition-colors hover:text-[#4a7c59]"
              onClick={() => navigate(`/tv/${id}/seasons/${season.season_number}`)}
            >
              {season.name}
            </span>
            <button
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium text-xs transition-all ${inCart ? "bg-[#4a7c59] text-white hover:bg-[#3a6347]" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (inCart) {
                  removeFromCart(data.id, "tv", season.season_number);
                } else {
                  addToCart({
                    airDate: season.air_date,
                    id: data.id,
                    mediaType: "tv",
                    posterPath: season.poster_path,
                    price,
                    seasonName: season.name,
                    seasonNumber: season.season_number,
                    title: data.name,
                  });
                }
              }}
            >
              {inCart ? "✓ In Cart" : `🛒 ${formatPrice(price)}`}
            </button>
          </div>
        );
      })}
    </div>
  );
};
