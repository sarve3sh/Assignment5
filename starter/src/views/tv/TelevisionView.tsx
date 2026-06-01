import { ImageGrid } from "@/components/ImageGrid";
import { Pagination } from "@/components/Pagination";
import { TV_AIRING_TODAY_ENDPOINT, TV_ON_THE_AIR_ENDPOINT, TV_POPULAR_ENDPOINT, TV_TOP_RATED_ENDPOINT } from '@/core/constants';
import { useTmdb } from "@/hooks/useTmdb";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORY_ENDPOINTS: Record<string, string> = {
  airing_today: TV_AIRING_TODAY_ENDPOINT,
  popular: TV_POPULAR_ENDPOINT,
  top_rated: TV_TOP_RATED_ENDPOINT,
  on_the_air: TV_ON_THE_AIR_ENDPOINT,
};

const CATEGORY_TITLES: Record<string, string> = {
  airing_today: 'Airing Today',
  popular: 'Popular',
  top_rated: 'Top Rated',
  on_the_air: 'On The Air',
};

export const TelevisionView = () => {
  const { category = 'airing_today' } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const endpoint = CATEGORY_ENDPOINTS[category];
  const { data } = useTmdb<any>(endpoint, { page }, [page, category]);

  if (!data || !data.results) {
    return <p className="text-center text-gray-400 py-10">Loading...</p>;
  }

  const gridData = data.results.map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path || result.backdrop_path || null,
    primaryText: result.name || result.original_name || 'Untitled TV Show',
    secondaryText: "$19.99"
  }));

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(CATEGORY_TITLES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setPage(1);
              navigate(`/tv/${key}`);
            }}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              category === key ? 'bg-[#4a7c59] text-white' : 'bg-zinc-800 text-white border border-zinc-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ImageGrid results={gridData} onclick={(id) => navigate(`/tv-show/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages || 1} onClick={setPage} />
    </section>
  );
};