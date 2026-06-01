import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { MOVIE_ENDPOINT } from "@/core/constants";
import type { CreditsResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, []);

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <ImageGrid onClick={(id) => navigate(`/person/${id}`)} results={gridData} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
