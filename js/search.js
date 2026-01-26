// ----- 검색 박스
import { setFilter } from "./filterState.js";

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", (e) => {
  const word = e.target.value.trim();

  setFilter("search", word);
});
