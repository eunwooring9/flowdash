import { todoStore, renderAll } from "./modal.js";

const STORAGE_KEY = "todoList";
const saveTodos = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

const overlay = document.getElementById("editModalOverlay");
const titleEl = document.getElementById("editTitle");
const contentEl = document.getElementById("editContent");
const statusEl = document.getElementById("editStatus");
const cancelBtn = document.getElementById("editCancelBtn");
const submitBtn = document.getElementById("editSubmitBtn");

let editingId = null;

function openModal() {
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  titleEl?.focus();
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  editingId = null;
}

function setPriority(priority) {
  const radios = document.querySelectorAll('input[name="editPriority"]');
  radios.forEach((r) => (r.checked = r.value === priority));
}

function getPriority() {
  const checked = document.querySelector('input[name="editPriority"]:checked');
  return checked?.value || "medium";
}

function fillForm(todo) {
  titleEl.value = todo.title || "";
  contentEl.value = todo.content || "";
  statusEl.value = todo.status || "todo";
  setPriority(todo.priority || "medium");
}

const board = document.querySelector(".board");

board?.addEventListener("click", (e) => {
  const card = e.target.closest(".task-card");
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  const todo = todoStore.find((t) => t.id === id);
  if (!todo) return;

  editingId = id;
  fillForm(todo);
  openModal();
});

cancelBtn?.addEventListener("click", closeModal);

overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay?.classList.contains("is-open")) closeModal();
});

submitBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (!editingId) return;

  const todo = todoStore.find((t) => t.id === editingId);
  if (!todo) return;

  const title = titleEl.value.trim();
  const content = contentEl.value.trim();

  if (!title) {
    alert("제목은 필수입니다!");
    titleEl.focus();
    return;
  }

  const nextStatus = statusEl.value;
  const nextPriority = getPriority();
  const now = Date.now();

  if (todo.status !== "done" && nextStatus === "done") {
    todo.completedAt = now;
  }
  if (todo.status === "done" && nextStatus !== "done") {
    todo.completedAt = null;
  }

  todo.title = title;
  todo.content = content;
  todo.status = nextStatus;
  todo.priority = nextPriority;
  todo.updatedAt = now;

  saveTodos(todoStore);
  renderAll();
  closeModal();
});
