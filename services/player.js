import { getProgress } from "./storage.js";

export function openPlayer(id) {
  const overlay = document.getElementById("playerOverlay");
  overlay.classList.remove("hidden");

  overlay.innerHTML = `
    <button onclick="location.reload()">Back</button>
    <iframe 
      src="https://vidapi.qzz.io/movie/${id}?progress=${getProgress(id)}"
      allowfullscreen
      style="width:100%;height:100%">
    </iframe>
  `;
}