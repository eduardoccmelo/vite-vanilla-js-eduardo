const all = "https://rickandmortyapi.com/api/character";
const alive = "https://rickandmortyapi.com/api/character?status=alive";
const dead = "https://rickandmortyapi.com/api/character?status=dead";
const unknown = "https://rickandmortyapi.com/api/character?status=unknown";
const select = document.querySelector(".select");
const input = document.querySelector(".input");
const form = document.querySelector(".form");
function apiFetch(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      data.results.forEach((character) => {
        const cards = document.querySelector(".cards");

        const card = document.createElement("div");
        card.classList.add("card");
        if (character.status === "Alive") {
          card.classList.add("alive");
        } else if (character.status === "Dead") {
          card.classList.add("dead");
        } else if (character.status === "unknown") {
          card.classList.add("unknown");
        }
        cards.append(card);

        const img = document.createElement("img");
        img.classList.add("cardImg");
        card.append(img);
        img.src = `${character.image}`;

        const name = document.createElement("div");
        name.classList.add("name");
        card.append(name);

        const text = document.createElement("p");
        text.textContent = `${character.name} (${character.status})`;
        name.append(text);
      });
    })
    .catch((error) => {
      alert("No results for your search");
      console.log(error);
    });
}

export function clearList() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}

export function createCards() {
  const optionValue = select[select.selectedIndex].value;
  const fullSearch = `${all}?name=${input.value}&status=${optionValue}`;
  if (
    (input.value && optionValue === "Alive") ||
    optionValue === "Dead" ||
    optionValue === "Unknown"
  ) {
    apiFetch(fullSearch);
  } else if (input.value && optionValue === "All") {
    apiFetch(`${all}?name=${input.value}`);
  } else if (optionValue === "All") {
    apiFetch(all);
  } else if (optionValue === "Alive") {
    apiFetch(alive);
  } else if (optionValue === "Dead") {
    apiFetch(dead);
  } else if (optionValue === "Unknown") {
    apiFetch(unknown);
  } else if (input.value) {
    apiFetch(`${all}?name=${input.value}`);
  } else if (optionValue === "Category" && !input.value) {
    alert("Select a Category or type the Character's name");
  }
  form.reset();
}
