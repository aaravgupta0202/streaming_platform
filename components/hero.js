import { openPlayer } from "../services/player.js";

export function renderHero(item) {
  const hero = document.getElementById("hero");

  hero.className = "hero";
  hero.style.backgroundImage = `url(${item.primaryImage?.url})`;

  hero.innerHTML = `
    <div class="hero-content">
      <h1>${item.title}</h1>
      <button id="playHero">Play</button>
    </div>
  `;

  document.getElementById("playHero").onclick = () => openPlayer(item.id);
}