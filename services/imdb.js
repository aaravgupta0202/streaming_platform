const BASE = "https://api.imdbapi.dev";

export async function getTrending() {
  const res = await fetch(`${BASE}/titles?sortBy=SORT_BY_POPULARITY`);
  return (await res.json()).titles;
}

export async function getMovies() {
  const res = await fetch(`${BASE}/titles?types=MOVIE`);
  return (await res.json()).titles;
}

export async function getTV() {
  const res = await fetch(`${BASE}/titles?types=TV_SERIES`);
  return (await res.json()).titles;
}

export async function searchTitles(q) {
  const res = await fetch(`${BASE}/search/titles?query=${q}`);
  return (await res.json()).titles;
}

export async function getTitle(id) {
  const res = await fetch(`${BASE}/titles/${id}`);
  return await res.json();
}

export async function getCredits(id) {
  const res = await fetch(`${BASE}/titles/${id}/credits`);
  return (await res.json()).credits;
}