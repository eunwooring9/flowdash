const searchInput = document.querySelector(".search-box input");

// 글자 input 할 때마다 실행
import { todoStore, renderAll } from "./modal.js";
searchInput.addEventListener("input", (e) => {
  const word = e.target.value.trim();

  // 없으면 전체 데이터 보여주기
  if (word === "") {
    renderAll(todoStore);
    return;
  }

  // 있으면 검색만 골라내서 보여주기
  const filteredList = todoStore.filter((task) => task.title.includes(word));

  renderAll(filteredList);
});
