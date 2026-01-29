import { todoStore, renderAll } from "./modal.js";

const STORAGE_KEY = "flowdash-todos";
const saveTodos = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

const resetBtn = document.querySelector(".reset-btn");

resetBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const ok = confirm("정말 삭제하시겠습니까? 초기화 후엔 되돌릴 수 없습니다.");
  if (!ok) return;

  todoStore.length = 0;

  saveTodos(todoStore);

  renderAll();
});
