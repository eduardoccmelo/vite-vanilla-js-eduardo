import { clearList } from "./lib/card.js";
import { createCards } from "./lib/card.js";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearList();
  createCards();
});
