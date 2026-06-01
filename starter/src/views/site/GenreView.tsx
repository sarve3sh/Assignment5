import { ImageGrid } from "@/components/ImageGrid";
import { useTmdb } from "@/hooks/useTmdb";
import { useNavigate, useParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType = "movie", genre = "28" } = useParams();

  // Dynamically hits discover endpoints depending on layout settings
  const endpoint = `https://api.themoviedb.org/3/discover/${mediaType}`;
  const { data } = useTmdb<any>(endpoint, { with_genres: genre }, [mediaType, genre]);

  if (!data || !data.results) {
    return <p className="text-center text-gray-400 py-10">Loading genre content...</p>;
  }

  const gridData = data.results.map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path || result.backdrop_path || null,
    primaryText: result.title || result.name || 'Untitled',
    secondaryText: "$19.99"
  }));

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <h1 className="text-3xl font-bold text-white capitalize">Genre Results</h1>
      <ImageGrid 
        results={gridData} 
        onclick={(id) => {
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