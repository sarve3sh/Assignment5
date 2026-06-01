export function calcPrice(dateString?: string | null): number {
  const BASE = 19.99;
  const FLOOR = 4.99;
  if (!dateString) return BASE;
  const releaseYear = new Date(dateString).getFullYear();
  if (Number.isNaN(releaseYear)) return BASE;
  const yearsOld = Math.max(0, new Date().getFullYear() - releaseYear);
  return Math.max(FLOOR, BASE - yearsOld);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
