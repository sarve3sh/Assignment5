import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup } from "@/components";
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from "@/core/constants";
import { useTmdb } from "@/hooks";
export const PersonView = () => {
  const { id } = useParams();
  const _navigate = useNavigate();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="mx-auto max-w-[1200px] space-y-5 p-5">
      <div className="flex gap-8">
        <img alt={data.name} className="h-[330px] w-[220px] rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.profile_path}`} />
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">{data.name}</h1>
          <p className="text-gray-300">{data.biography}</p>
        </div>
      </div>
      <LinkGroup
        options={[
          { label: "Career", to: "career" },
          { label: "Images", to: "images" },
        ]}
      />
      <Outlet />
    </div>
  );
};
