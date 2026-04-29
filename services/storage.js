export function saveProgress(id, time) {
  let data = JSON.parse(localStorage.getItem("progress") || "{}");
  data[id] = time;
  localStorage.setItem("progress", JSON.stringify(data));
}

export function getProgress(id) {
  let data = JSON.parse(localStorage.getItem("progress") || "{}");
  return data[id] || 0;
}

export function toggleSave(item) {
  let list = JSON.parse(localStorage.getItem("saved") || "[]");

  if(list.find(x => x.id === item.id)) {
    list = list.filter(x => x.id !== item.id);
  } else {
    list.push(item);
  }

  localStorage.setItem("saved", JSON.stringify(list));
}

export function getContinue() {
  return JSON.parse(localStorage.getItem("progress") || "{}");
}