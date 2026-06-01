import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface FavoriteItem {
  id: number;
  mediaType: "movie" | "tv";
  posterPath: string | null;
  title: string;
  voteAverage?: number;
}

export interface CartItem {
  airDate?: string;
  id: number;
  mediaType: "movie" | "tv";
  posterPath: string | null;
  price: number;
  seasonName?: string;
  seasonNumber?: number;
  title: string;
}

interface UserContextValue {
  addFavorite: (item: FavoriteItem) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
  cartTotal: number;
  clearCart: () => void;
  favorites: FavoriteItem[];
  genrePreferences: number[];
  isFavorite: (id: number, mediaType: "movie" | "tv") => boolean;
  isInCart: (id: number, mediaType: "movie" | "tv", seasonNumber?: number) => boolean;
  removeFavorite: (id: number, mediaType: "movie" | "tv") => void;
  removeFromCart: (id: number, mediaType: "movie" | "tv", seasonNumber?: number) => void;
  setUsername: (name: string) => void;
  toggleGenrePreference: (genreId: number) => void;
  username: string;
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const useUserState = (): UserContextValue => {
  const [username, setUsernameState] = useState<string>(() => load("tmdb_username", ""));
  const [genrePreferences, setGenrePreferences] = useState<number[]>(() => load("tmdb_genre_prefs", []));
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => load("tmdb_favorites", []));
  const [cart, setCart] = useState<CartItem[]>(() => load("tmdb_cart", []));

  useEffect(() => save("tmdb_username", username), [username]);
  useEffect(() => save("tmdb_genre_prefs", genrePreferences), [genrePreferences]);
  useEffect(() => save("tmdb_favorites", favorites), [favorites]);
  useEffect(() => save("tmdb_cart", cart), [cart]);

  const setUsername = useCallback((name: string) => setUsernameState(name.trim()), []);

  const toggleGenrePreference = useCallback((genreId: number) => {
    setGenrePreferences((prev) => (prev.includes(genreId) ? prev.filter((g) => g !== genreId) : [...prev, genreId]));
  }, []);

  const isFavorite = useCallback(
    (id: number, mediaType: "movie" | "tv") => favorites.some((f) => f.id === id && f.mediaType === mediaType),
    [favorites],
  );

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => (prev.some((f) => f.id === item.id && f.mediaType === item.mediaType) ? prev : [...prev, item]));
  }, []);

  const removeFavorite = useCallback((id: number, mediaType: "movie" | "tv") => {
    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.mediaType === mediaType)));
  }, []);

  const isInCart = useCallback(
    (id: number, mediaType: "movie" | "tv", seasonNumber?: number) =>
      cart.some((c) => c.id === id && c.mediaType === mediaType && (mediaType === "movie" || c.seasonNumber === seasonNumber)),
    [cart],
  );

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) =>
      prev.some(
        (c) => c.id === item.id && c.mediaType === item.mediaType && (item.mediaType === "movie" || c.seasonNumber === item.seasonNumber),
      )
        ? prev
        : [...prev, item],
    );
  }, []);

  const removeFromCart = useCallback((id: number, mediaType: "movie" | "tv", seasonNumber?: number) => {
    setCart((prev) =>
      prev.filter((c) => !(c.id === id && c.mediaType === mediaType && (mediaType === "movie" || c.seasonNumber === seasonNumber))),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return {
    addFavorite,
    addToCart,
    cart,
    cartTotal,
    clearCart,
    favorites,
    genrePreferences,
    isFavorite,
    isInCart,
    removeFavorite,
    removeFromCart,
    setUsername,
    toggleGenrePreference,
    username,
  };
};
