import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from "@/core/constants";
import { useTmdb } from "@/hooks";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.profiles.map((image: any) => (
        <img className="rounded-xl" key={image.file_path} src={`${IMAGE_BASE_URL}${image.file_path}`} />
      ))}
    </div>
  );
};
