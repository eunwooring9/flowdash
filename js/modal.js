const STORAGE_KEY = "todoList";

function loadTodos() {
	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) return [];
	return JSON.parse(data);
}

function saveTodos(todos) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todoStore = loadTodos();

// ===== DOM 요소들 =====
const addBtn = document.querySelector(".add-btn");
const overlay = document.getElementById("modalOverlay");
const modalCancelBtn = document.querySelector(".btn-cancel");
const modalSubmitBtn = document.querySelector(".btn-submit");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

// 첫 번째 컬럼(할 일)
const todoList = document.querySelectorAll(".board .column")[0]?.querySelector(".task-list");

// "할 일이 없습니다" 문구
const todoEmptyMsg = document.querySelector(".to-do-msg");

// ===== 모달 열고 닫기 =====
function openModal() {
	if (!overlay) return;
	overlay.classList.add("is-open");
	document.body.style.overflow = "hidden";
}

function closeModal() {
	if (!overlay) return;
	overlay.classList.remove("is-open");
	document.body.style.overflow = "";
}

// 새할일 버튼 클릭시 모달 열림
addBtn?.addEventListener("click", openModal);

// 취소 버튼 클릭시 모달 닫힘
modalCancelBtn?.addEventListener("click", closeModal);

// 배경 클릭시 모달 닫힘
overlay?.addEventListener("click", (e) => {
	if (e.target === overlay) closeModal();
});

// esc키를 누르면 모달 닫힘
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && overlay?.classList.contains("is-open")) {
		closeModal();
	}
});

// ===== 시간 문자열 만들기 =====
function formatTime(ts) {
	const d = new Date(ts);
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}. ${pad(d.getMonth() + 1)}. ${pad(d.getDate())} ${pad(d.getHours())}:${pad(
		d.getMinutes()
	)}`;
}

// ===== 카드 만들기 =====
function makeTodoCard(todo) {
	const card = document.createElement("div");
	card.className = "task-card";

	const titleEl = document.createElement("div");
	titleEl.className = "task-card__title";
	titleEl.textContent = todo.title;

	card.appendChild(titleEl);

	if (todo.content) {
		const contentEl = document.createElement("div");
		contentEl.className = "task-card__content";
		contentEl.textContent = todo.content;
		card.appendChild(contentEl);
	}

	const metaEl = document.createElement("div");
	metaEl.className = "task-card__meta";

	const priorityEl = document.createElement("span");
	priorityEl.textContent = todo.priority === "high" ? "높음" : todo.priority === "mid" ? "중간" : "낮음";

	const timeEl = document.createElement("span");
	timeEl.className = "task-card__time";
	timeEl.textContent = `생성: ${formatTime(todo.createdAt)}`;

	metaEl.appendChild(priorityEl);
	metaEl.appendChild(timeEl);

	card.appendChild(metaEl);

	return card;
}

// ===== 완료 버튼 클릭 =====
modalSubmitBtn?.addEventListener("click", (e) => {
	e.preventDefault();

	const title = titleInput.value.trim();
	const content = contentInput.value.trim();

	if (!title) {
		alert("제목은 필수입니다!");
		titleInput.focus();
		return;
	}

	const now = Date.now();

	const newTodo = {
		id: crypto.randomUUID(),
		title,
		content,
		status: "todo",
		priority: getPriority(),
		createdAt: now,
		updatedAt: now,
		completedAt: null,
	};

	// 1) 메모리에 저장
	todoStore.push(newTodo);

	// 2) 로컬스토리지에 저장
	saveTodos(todoStore);

	// 3) 화면에 추가
	if (todoEmptyMsg) todoEmptyMsg.style.display = "none";
	todoList?.appendChild(makeTodoCard(newTodo));

	console.log("저장됨:", newTodo);

	// 입력 초기화
	titleInput.value = "";
	contentInput.value = "";

	closeModal();
});

function getPriority() {
	const checked = document.querySelector('input[name="bottom-actions"]:checked');
	if (!checked) return "mid";
	if (checked.value === "high") return "high";
	if (checked.value === "medium") return "mid";
	if (checked.value === "low") return "low";
	return "mid";
}

// ===== 새로고침해도 다시 그리기 =====
todoStore.forEach((todo) => {
	if (todo.status === "todo") {
		if (todoEmptyMsg) todoEmptyMsg.style.display = "none";
		todoList?.appendChild(makeTodoCard(todo));
	}
});
