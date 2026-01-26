import { todoStore, renderAll } from "./modal.js";

const STORAGE_KEY = "todoList";
const saveTodos = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

const resetBtn = document.querySelector(".reset-btn");

resetBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const ok = confirm("전체 데이터를 삭제할까요? (되돌릴 수 없습니다)");
  if (!ok) return;

  todoStore.length = 0;

  saveTodos(todoStore);

  renderAll();
});
