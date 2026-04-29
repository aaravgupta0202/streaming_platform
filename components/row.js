import { openModal } from "./modal.js";

export function renderRow(containerId, items) {
  const row = document.getElementById(containerId);
  row.innerHTML = "";

  items.slice(0,20).forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${item.primaryImage?.url || ''}">
      <p>${item.title}</p>
    `;

    div.onclick = () => openModal(item.id);

    row.appendChild(div);
  });
}