import { ImageGrid } from '@/components';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const { mediaType = 'movie' } = useParams();

  // Fetches from the correct TMDB trending route using the active parameter
  const endpoint = `https://api.themoviedb.org/3/trending/${mediaType}/day`;
  const { data } = useTmdb<any>(endpoint, {}, [mediaType]);

  const calculatePrice = (dateString?: string) => {
    if (!dateString) return "$19.99";
    const releaseYear = new Date(dateString).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - releaseYear);
    const price = Math.max(4.99, 19.99 - age);
    return `$${price.toFixed(2)}`;
  };

  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path || result.backdrop_path,
    primaryText: result.title || result.name || result.original_title || 'Untitled',
    secondaryText: calculatePrice(result.release_date || result.first_air_date),
  }));

  if (!data) return <p className="text-center text-[#4a7c59]">Loading...</p>;

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <h1 className="text-3xl font-bold text-white capitalize">Trending {mediaType}</h1>
      <ImageGrid 
        data={gridData} 
        onClick={(id) => {
          if (mediaType === 'tv') {
            navigate(`/tv-show/${id}`);
          } else {
            navigate(`/movie/${id}`);
          }
        }} 
      />
    </section>
  );
};