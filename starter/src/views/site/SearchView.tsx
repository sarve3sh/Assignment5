import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { useDebounce, useTmdb } from "@/hooks";

const SEARCH_ENDPOINTS: Record<string, string> = {
  movie: "https://api.themoviedb.org/3/search/movie",
  person: "https://api.themoviedb.org/3/search/person",
  tv: "https://api.themoviedb.org/3/search/tv",
};

export const SearchView = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState("movie");
  const location = useLocation();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useTmdb<any>(SEARCH_ENDPOINTS[searchType], { page, query: debouncedQuery }, [debouncedQuery, page, searchType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    const type = params.get("type");
    if (q) setQuery(q);
    if (type) setSearchType(type);
  }, [location.search]);

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.profile_path || result.poster_path,
    primaryText: result.name || result.title,
  }));

  return (
    <section className="mx-auto max-w-[1200px] space-y-5 p-10">
      <ImageGrid
        onClick={(id) => navigate(searchType === "person" ? `/person/${id}` : searchType === "movie" ? `/movies/${id}` : `/tv/${id}`)}
        results={gridData}
      />
      {data?.results?.length ? (
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      ) : (
        <p className="text-center text-[#4a7c59]">No search results found</p>
      )}
    </section>
  );
};
