import { getTitle, getCredits } from "../services/imdb.js";
import { openPlayer } from "../services/player.js";

export async function openModal(id) {
  const modal = document.getElementById("modal");
  modal.className = "modal";

  const data = await getTitle(id);
  const credits = await getCredits(id);

  modal.innerHTML = `
    <div>
      <h1>${data.title}</h1>
      <p>${data.plot}</p>

      <h3>Cast</h3>
      ${credits.slice(0,5).map(c => `<p>${c.name?.name}</p>`).join("")}

      <button id="playBtn">Play</button>
      <button onclick="document.getElementById('modal').className=''">Close</button>
    </div>
  `;

  document.getElementById("playBtn").onclick = () => openPlayer(id);
}