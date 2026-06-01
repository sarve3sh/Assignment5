import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup } from "@/components/LinkGroup";
import { Modal } from "@/components/Modal";
import { useUser } from "@/context/UserContext";
import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT } from "@/core/constants";
import { useTmdb } from "@/hooks/useTmdb";

export const TvView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<any>(`${TV_ENDPOINT}/${id}`, { append_to_response: "videos" }, [id]);
  const { isFavorite, addFavorite, removeFavorite } = useUser();

  if (!data || !data.id) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const favorited = isFavorite(data.id, "tv");

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(data.id, "tv");
    } else {
      addFavorite({ id: data.id, mediaType: "tv", posterPath: data.poster_path, title: data.name });
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
          <img alt={data.name} className="h-[330px] w-[220px] rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.poster_path}`} />
          <div className="flex-1 space-y-4">
            <h1 className="font-bold text-3xl">{data.name}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {data.first_air_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            <button
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-all ${favorited ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              onClick={toggleFavorite}
            >
              {favorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
            </button>
            <LinkGroup
              options={[
                { label: "Seasons", to: "seasons" },
                { label: "Credits", to: "credits" },
                { label: "Reviews", to: "reviews" },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};