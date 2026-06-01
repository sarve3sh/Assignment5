interface ImageGridItem {
  id: number;
  imagePath: string | null;
  primaryText: string;
  secondaryText?: string;
}

interface ImageGridProps {
  onclick: (id: number) => void;
  results: ImageGridItem[];
}

export const ImageGrid = ({ results = [], onclick }: ImageGridProps) => {
  if (!results || results.length === 0) {
    return <div className="py-10 text-center text-gray-500">No items found.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {results.map((item) => (
        <div
          className="cursor-pointer overflow-hidden rounded-xl bg-gray-800 p-2 transition hover:scale-105"
          key={item.id}
          onClick={() => onclick(item.id)}
        >
          {item.imagePath && (
            <img
              alt={item.primaryText}
              className="aspect-[2/3] h-auto w-full rounded-lg object-cover"
              src={`https://image.tmdb.org/t/p/w500${item.imagePath}`}
            />
          )}
          <h3 className="mt-2 truncate font-semibold text-sm text-white">{item.primaryText}</h3>
          {item.secondaryText && <p className="text-gray-400 text-xs">{item.secondaryText}</p>}
        </div>
      ))}
    </div>
  );
};
