import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { PERSON_ENDPOINT } from "@/core/constants";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  const gridData = data.cast.map((role: any) => ({
    id: role.id,
    imagePath: role.poster_path,
    primaryText: role.title,
    secondaryText: role.release_date?.slice(0, 4),
  }));

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl">Career</h2>
      <ImageGrid images={gridData} onClick={(item) => navigate(`/movies/${item.id}`)} />
    </div>
  );
};
