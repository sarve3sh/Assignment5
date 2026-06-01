import { ImageGrid } from "@/components/ImageGrid";
import { Pagination } from "@/components/Pagination";
import { NOW_PLAYING_ENDPOINT, POPULAR_ENDPOINT, TOP_RATED_ENDPOINT, UPCOMING_ENDPOINT } from '@/core/constants';
import { useTmdb } from "@/hooks/useTmdb";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORY_ENDPOINTS: Record<string, string> = {
  now_playing: NOW_PLAYING_ENDPOINT,
  popular: POPULAR_ENDPOINT,
  top_rated: TOP_RATED_ENDPOINT,
  upcoming: UPCOMING_ENDPOINT,
};

const CATEGORY_TITLES: Record<string, string> = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
};

export const MoviesView = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const endpoint = CATEGORY_ENDPOINTS[category ?? 'now_playing'];
  const { data } = useTmdb<any>(endpoint, { page }, [page, category]);

  if (!data || !data.results) {
    return <p className="text-center text-[#4a7c59]">Loading...</p>;
  }

  const gridData = data.results.map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title || result.original_title || '',
  }));

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(CATEGORY_TITLES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setPage(1);
              navigate(`/movies/category/${key}`);
            }}
            className={`px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_#4a7c59] ${
              category === key
                ? 'bg-[#4a7c59] text-white'
                : 'bg-white text-[#4a7c59] border border-[#4a7c59]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/movies/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages || 1} onClick={setPage} />
    </section>
  );
};