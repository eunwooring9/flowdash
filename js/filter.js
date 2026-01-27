import { setFilter } from "./filterState.js";

// 정렬(오름차순/내림차순) 관련
const sortBtn = document.querySelector(".filter-btn.sort");
const sortText = document.querySelector("#sort-text");
const priorityBtn = document.querySelector("#btn-priority");

// 필터 태그 기간 / 우선순위 영역
// 둘 다 bar-wrap으로 되어 있어서 closest로 잡음
const periodTag = document.querySelector(".period-tag").closest(".bar-wrap");
const priorityTag = document.querySelector(".sort-tag").closest(".bar-wrap");

// X (닫기) 버튼
const periodCloseBtn = periodTag.querySelector(".close-filter-btn");
const priorityCloseBtn = priorityTag.querySelector(".close-filter-btn");

// 드롭다운 버튼 텍스트 (기간, 우선순위 텍스트 변경용)
const dropdownBtn = document.querySelectorAll(".filter-btn span");
const periodText = dropdownBtn[0]; // 기간
const priorityText = dropdownBtn[1]; // 우선순위

// select = 기간: "오늘" / text = 내용 바꾸기 및 태그 보이기
function updateText(select, text) {
  const tag = document.querySelector(select);
  if (tag) {
    tag.textContent = text;
    tag.closest(".bar-wrap").classList.remove("hidden");
  }
}

// 외부 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
  // 열려 있는 드롭다운 찾아
  document.querySelectorAll(".filter-dropdown.active").forEach((item) => {
    // 드롭다운 내부가 아니면 닫아
    if (!item.contains(e.target)) {
      item.classList.remove("active");
    }
  });
});

// 드롭다운 버튼 및 리스트 클릭 이벤트
document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
  const mainText = dropdown.querySelector(".filter-btn span");
  const filterBtn = dropdown.querySelector(".filter-btn");
  const menuItems = dropdown.querySelectorAll(".dropdown-menu li");

  // filter-btn 누르면 드롭다운 열었다 / 닫았다
  filterBtn.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // 드롭다운 li 요소들 클릭할 때 기능
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      // 클릭한 거 문자 공백 제거
      const text = item.textContent.trim();
      // 클릭한 걸로 메인 텍스트 교체
      mainText.textContent = text;

      const isPeriod = text === "전체 기간" || text === "오늘" || text === "최근 7일";

      if (isPeriod) {
        updateText(".period-tag .highlight", text);
        setFilter("period", text);
      } else {
        updateText(".sort-tag .highlight", text);
        setFilter("priority", text);
      }
      dropdown.classList.remove("active");
    });
  });
});

// 오름차순 / 내림차순 버튼 클릭
sortBtn.addEventListener("click", () => {
  // 클릭했을 때 오름차순이야?
  const upDown = sortText.textContent === "오름차순";
  // 맞으면 내림차순 아니면 오름차순
  const nextText = upDown ? "내림차순" : "오름차순";

  sortText.textContent = nextText;
  priorityBtn.textContent = nextText;

  setFilter("sort", nextText);
});

// 기간 X 버튼
periodCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  periodTag.classList.add("hidden");
  periodText.textContent = "전체 기간";
  setFilter("period", "전체 기간");
});

// 우선순위 X 버튼
priorityCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  priorityTag.classList.add("hidden");
  priorityText.textContent = "우선순위";
  setFilter("priority", "전체 우선순위");
});
