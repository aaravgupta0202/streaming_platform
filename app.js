const API = "https://api.imdbapi.dev";

// ---------- FETCH ----------
async function fetchTitles(params="") {
  const res = await fetch(`${API}/titles?${params}`);
  const data = await res.json();
  return data.titles || [];
}

async function searchTitles(q) {
  const res = await fetch(`${API}/search/titles?query=${q}`);
  const data = await res.json();
  return data.titles || [];
}

async function getTitle(id) {
  const res = await fetch(`${API}/titles/${id}`);
  return await res.json();
}

async function getCredits(id) {
  const res = await fetch(`${API}/titles/${id}/credits`);
  const data = await res.json();
  return data.credits || [];
}

// ---------- UI ----------
function renderHero(item) {
  const hero = document.getElementById("hero");

  hero.style.backgroundImage = `url(${item.primaryImage?.url || ""})`;

  hero.innerHTML = `
    <div class="hero-content">
      <h1>${item.title}</h1>
      <button onclick="play('${item.id}','${item.type}')">▶ Play</button>
    </div>
  `;
}

function renderRow(id, items) {
  const row = document.getElementById(id);
  row.innerHTML = "";

  items.slice(0,20).forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.primaryImage?.url || ''}">
      <p>${item.title}</p>
    `;

    div.onclick = () => openModal(item.id, item.type);

    row.appendChild(div);
  });
}

// ---------- MODAL ----------
async function openModal(id, type) {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  const data = await getTitle(id);
  const credits = await getCredits(id);

  modal.innerHTML = `
    <div class="modal-box">
      <h1>${data.title}</h1>
      <p>${data.plot || "No description"}</p>

      <h3>Cast</h3>
      ${credits.slice(0,5).map(c => `<p>${c.name?.name}</p>`).join("")}

      <button onclick="play('${id}','${type}')">▶ Play</button>
      <button onclick="closeModal()">Close</button>
    </div>
  `;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// ---------- PLAYER ----------
function play(id, type) {
  const player = document.getElementById("player");
  player.classList.remove("hidden");

  let url = "";

  if(type === "MOVIE") {
    url = `https://vidapi.qzz.io/movie/${id}`;
  } else {
    url = `https://vidapi.qzz.io/tv/${id}/1/1`;
  }

  player.innerHTML = `
    <button onclick="closePlayer()">← Back</button>
    <iframe src="${url}" allowfullscreen style="width:100%;height:100%"></iframe>
  `;
}

function closePlayer() {
  document.getElementById("player").classList.add("hidden");
}

// ---------- INIT ----------
async function init() {
  const trending = await fetchTitles("sortBy=SORT_BY_POPULARITY");
  const movies = await fetchTitles("types=MOVIE");
  const tv = await fetchTitles("types=TV_SERIES");

  renderHero(trending[0]);
  renderRow("trending", trending);
  renderRow("movies", movies);
  renderRow("tv", tv);
}

init();

// ---------- SEARCH ----------
document.getElementById("search").addEventListener("input", async (e)=>{
  if(!e.target.value) return init();
  const results = await searchTitles(e.target.value);
  renderRow("trending", results);
});