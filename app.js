import { getTrending, getMovies, getTV, searchTitles } from "./services/imdb.js";
import { renderHero } from "./components/hero.js";
import { renderRow } from "./components/row.js";

async function init() {
  const trending = await getTrending();
  const movies = await getMovies();
  const tv = await getTV();

  renderHero(trending[0]);
  renderRow("trendingRow", trending);
  renderRow("movieRow", movies);
  renderRow("tvRow", tv);
}

init();

// Search
document.getElementById("search").addEventListener("input", async (e) => {
  const results = await searchTitles(e.target.value);
  renderRow("trendingRow", results);
});