function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Storageƒ
const STORAGE_KEY = "todoList";

// 데이터 꺼내오는 부분
function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    // 텍스트 -> 객체로 변환
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTodos(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// filter, search에서 사용
export let todoStore = loadTodos();

// DOM
const addBtn = document.querySelector(".add-btn");
const overlay = document.getElementById("modalOverlay");
const modalCancelBtn = document.querySelector(".btn-cancel");
const modalSubmitBtn = document.querySelector(".btn-submit");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

// status select (너 HTML id가 select-wraps)
const statusSelect = document.getElementById("select-wraps");

// 3개 컬럼 task-list 잡기 (순서: 할일/진행중/완료)
const columns = document.querySelectorAll(".board .column");
const todoListEl = columns[0]?.querySelector(".task-list");
const doingListEl = columns[1]?.querySelector(".task-list");
const doneListEl = columns[2]?.querySelector(".task-list");

// 빈 문구(p)
const todoEmptyMsg = document.querySelector(".to-do-msg");
const doingEmptyMsg = document.querySelector(".ing-msg");
const doneEmptyMsg = document.querySelector(".finish-msg");

// 각 컬럼 카운트(span.count)
const todoCountEl = columns[0]?.querySelector(".count");
const doingCountEl = columns[1]?.querySelector(".count");
const doneCountEl = columns[2]?.querySelector(".count");

// 상단 카드 카운트
const totalCardEl = document.querySelector(".card.total .total-number");
const todoCardEl = document.querySelector(".card.todo .total-number");
const doingCardEl = document.querySelector(".card.ing .total-number");
const doneCardEl = document.querySelector(".card.done .total-number");

// Modal Open/Close
function openModal() {
  if (!overlay) return;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  titleInput?.focus();
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

addBtn?.addEventListener("click", openModal);
modalCancelBtn?.addEventListener("click", closeModal);

overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay?.classList.contains("is-open")) closeModal();
});

// Utils
function formatTime(ts) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}. ${pad(d.getMonth() + 1)}. ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// priority 라디오 값 가져오기 (high / medium / low -> high / medium / low)
function getPriority() {
  const checked = document.querySelector('input[name="bottom-actions"]:checked');
  if (!checked) return "medium";
  if (checked.value === "high") return "high";
  if (checked.value === "medium") return "medium";
  if (checked.value === "low") return "low";
  return "medium";
}

// status select 값 가져오기 (todo/done만 있으면 doing은 추후 옵션 추가 가능)
function getStatus() {
  const v = statusSelect?.value;
  if (v === "done") return "done";
  if (v === "doing") return "doing"; // 옵션 추가하면 자동 지원
  return "todo";
}

// status에 맞는 리스트 element
function getListElByStatus(status) {
  if (status === "doing") return doingListEl;
  if (status === "done") return doneListEl;
  return todoListEl;
}

// status에 맞는 empty msg
function getEmptyMsgByStatus(status) {
  if (status === "doing") return doingEmptyMsg;
  if (status === "done") return doneEmptyMsg;
  return todoEmptyMsg;
}

// Card 만들기 (DOM API 방식)
function makeTodoCard(todo) {
  const card = document.createElement("div");
  card.className = `task-card priority-${todo.priority}`;
  card.dataset.id = todo.id;

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
  priorityEl.textContent =
    todo.priority === "high" ? "높음" : todo.priority === "medium" ? "중간" : "낮음";

  const timeEl = document.createElement("span");
  timeEl.className = "task-card__time";
  timeEl.textContent = `생성: ${formatTime(todo.createdAt)}`;

  metaEl.appendChild(priorityEl);
  metaEl.appendChild(timeEl);

  // 완료면 완료시간도 표시
  if (todo.status === "done" && todo.completedAt) {
    const doneEl = document.createElement("span");
    doneEl.className = "task-card__time";
    doneEl.textContent = `완료: ${formatTime(todo.completedAt)}`;
    metaEl.appendChild(doneEl);
  }

  // task-card 안에 삭제 이미지 넣고 삭제할 수 있게 하기
  // 이미지에 flex넣으려고 card에 줬을때 기존코드 문제가 생겨 새로운 감싸줄 div만들기
  const deletes = document.createElement("div");
  deletes.className = "task-card-deletes";

  // 이미지를 카드 안에 넣어야 하니깐 부모인 metaEL에 이미지 넣기
  // 테스트나 우선순위 보다 제일 위로 넣기

  // img태그만들기
  const deleteImg = document.createElement("img");
  //내가 넣은 이미지불러오기 ""안에 넣기
  deleteImg.src = "./assets/img/minus.svg";
  //이미지 위치랑 크기 맞춰야 하기 때문에 class 넣기
  deleteImg.className = "task-card-delete";

  // 삭제 버튼
  deleteImg.addEventListener("click", (e) => {
    // 삭제 클릭시 수정모달이벤트가 같이 발생하는 버블링 현상 막기
    e.stopPropagation();
    // 삭제 경고창
    if (!confirm("정말 삭제하시겠습니까? 삭제 후엔 되돌릴 수 없습니다.")) return;
    // 카드 자체를 삭제하하는거 카드 id선언하기
    const id = card.dataset.id;
    // 저된 여러 리스트 중에 클릭한것만 삭제 되게
    todoStore = todoStore.filter((todo) => {
      return todo.id !== id;
    });
    // 삭제되고 다시 저장하게 하고 렌더링에 다시 그리기
    saveTodos(todoStore);
    renderAll();
  });

  // 만들어 놓은 deletes는 카드에 넣기
  card.prepend(deletes);
  // 새로 만든 div 에 이미지 넣기
  deletes.prepend(deleteImg);

  card.appendChild(metaEl);

  return card;
}

// Render (3칸 전체 다시 그리기)
function clearLists() {
  // task-card만 지우고, 빈 문구 p는 유지
  [todoListEl, doingListEl, doneListEl].forEach((listEl) => {
    if (!listEl) return;
    listEl.querySelectorAll(".task-card").forEach((el) => el.remove());
  });
}

function updateEmptyMsgs(list) {
  // const todoCount = todoStore.filter((t) => t.status === "todo").length;
  // const doingCount = todoStore.filter((t) => t.status === "doing").length;
  // const doneCount = todoStore.filter((t) => t.status === "done").length;
  // filter용 (list 들어오면 좌측 없으면 우측 적용)
  const targetList = list || todoStore;
  const todoCount = targetList.filter((t) => t.status === "todo").length;
  const doingCount = targetList.filter((t) => t.status === "doing").length;
  const doneCount = targetList.filter((t) => t.status === "done").length;

  if (todoEmptyMsg) todoEmptyMsg.style.display = todoCount === 0 ? "" : "none";
  if (doingEmptyMsg) doingEmptyMsg.style.display = doingCount === 0 ? "" : "none";
  if (doneEmptyMsg) doneEmptyMsg.style.display = doneCount === 0 ? "" : "none";
}

function updateCounts(list) {
  // filter용 (list 들어오면 좌측 없으면 우측 적용)
  const targetList = list || todoStore;
  const todoCount = targetList.filter((t) => t.status === "todo").length;
  const doingCount = targetList.filter((t) => t.status === "doing").length;
  const doneCount = targetList.filter((t) => t.status === "done").length;
  const total = targetList.length;

  if (todoCountEl) todoCountEl.textContent = String(todoCount);
  if (doingCountEl) doingCountEl.textContent = String(doingCount);
  if (doneCountEl) doneCountEl.textContent = String(doneCount);

  if (totalCardEl) totalCardEl.textContent = String(total);
  if (todoCardEl) todoCardEl.textContent = String(todoCount);
  if (doingCardEl) doingCardEl.textContent = String(doingCount);
  if (doneCardEl) doneCardEl.textContent = String(doneCount);
}

// 달성률
// 전체 할 일이 몇개인지
function updatePercent() {
  const total = todoStore.length;

  // 전체에서 완료된 걸 새리스트로 만들고 그 개수를 뽑기
  const done = todoStore.filter((todo) => todo.status === "done").length;

  // 내가 넣을 화면 가져오는거 먼저
  const ratebox = document.querySelector(".card.achieve .total-number");
  if (!ratebox) return;

  // 완료된게 하나도 없으면 0이면 0%라고 적기
  if (total === 0) {
    ratebox.textContent = "-";
  } else {
    // (DONE / 전체) * 100 적고 확률숫자랑 + % ratebox에 나오게하기
    const rate = Math.floor((done / total) * 100);
    ratebox.textContent = rate + "%";
  }
}

// function renderAll() {
// list 호출하면 검색된 것만 그리기
export function renderAll(list) {
  clearLists();

  // filter용 남은 것만 그림
  const searchList = list || todoStore;

  searchList.forEach((todo) => {
    const listEl = getListElByStatus(todo.status);
    listEl?.appendChild(makeTodoCard(todo));
  });

  // todoStore.forEach((todo) => {
  //   const listEl = getListElByStatus(todo.status);
  //   listEl?.appendChild(makeTodoCard(todo));
  // });

  updateEmptyMsgs(searchList);
  updateCounts(searchList);
  updatePercent();
}

// Submit (모달 완료)
modalSubmitBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title) {
    alert("제목은 필수입니다!");
    titleInput.focus();
    return;
  }

  // if (!content) {
  //   alert("내용은 필수입니다!");
  //   contentInput.focus();
  //   return;
  // }

  const now = Date.now();
  const status = getStatus();
  const priority = getPriority();

  const newTodo = {
    id: generateId(),
    title,
    content,
    status, // todo/doing/done 저장
    priority, // high/mid/low 저장
    createdAt: now,
    updatedAt: now,
    completedAt: status === "done" ? now : null, // 완료면 완료시간
  };

  todoStore.push(newTodo);
  saveTodos(todoStore);

  // 화면 갱신
  renderAll();

  // 입력 초기화
  titleInput.value = "";
  contentInput.value = "";
  document.querySelectorAll('input[name="bottom-actions"]').forEach((el) => (el.checked = false));
  if (statusSelect) statusSelect.value = "todo";

  closeModal();
});

// 최초 로드 시 렌더
renderAll();
