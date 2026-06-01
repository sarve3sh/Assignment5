import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const SettingsView = () => {
  const { username, setUsername, genrePreferences, toggleGenrePreference } = useUser();
  const [nameInput, setNameInput] = useState(username);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNameInput(username);
  }, [username]);

  const handleSave = () => {
    setUsername(nameInput);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 font-bold text-3xl">Settings</h1>
      <p className="mb-8 text-gray-400">Manage your profile and preferences</p>
      <section className="mb-6 rounded-xl bg-gray-800 p-6">
        <h2 className="mb-4 font-semibold text-lg">👤 Profile</h2>
        <label className="mb-1 block text-gray-400 text-sm">Display Name</label>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Enter your name…"
            type="text"
            value={nameInput}
          />
          <button
            className="rounded-lg bg-[#4a7c59] px-4 py-2 font-medium text-sm transition-colors hover:bg-[#3a6347]"
            onClick={handleSave}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </section>
      <section className="rounded-xl bg-gray-800 p-6">
        <h2 className="mb-1 font-semibold text-lg">🎭 Genre Preferences</h2>
        <p className="mb-4 text-gray-400 text-sm">Select your favourite genres to personalize recommendations.</p>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => {
            const selected = genrePreferences.includes(genre.id);
            return (
              <button
                className={`rounded-full border px-3 py-1.5 font-medium text-sm transition-all ${selected ? "border-[#4a7c59] bg-[#4a7c59] text-white" : "border-gray-600 bg-transparent text-gray-300 hover:border-[#4a7c59] hover:text-[#4a7c59]"}`}
                key={genre.id}
                onClick={() => toggleGenrePreference(genre.id)}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
        {genrePreferences.length > 0 && (
          <p className="mt-4 text-[#4a7c59] text-xs">
            {genrePreferences.length} genre{genrePreferences.length !== 1 ? "s" : ""} selected
          </p>
        )}
      </section>
    </div>
  );
};
