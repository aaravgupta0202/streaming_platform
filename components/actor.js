export async function openActor(id) {
  const res = await fetch(`https://api.imdbapi.dev/names/${id}`);
  const data = await res.json();

  alert(data.name + "\n" + data.bio);
}