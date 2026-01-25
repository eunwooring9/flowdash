import { setFilter } from "./filterState.js";

// ----- 외부 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
  // 열려 있는 드롭다운 찾기
  document.querySelectorAll(".filter-dropdown.active").forEach((item) => {
    // 드롭다운 아니면 닫아버리기
    if (!item.contains(e.target)) {
      item.classList.remove("active");
    }
  });
});

document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
  const mainText = dropdown.querySelector(".filter-btn span");
  const filterBtn = dropdown.querySelector(".filter-btn");
  const menuItems = dropdown.querySelectorAll(".dropdown-menu li");

  // filter-btn 누르면 드롭다운 열었다 / 닫았다
  filterBtn.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // 드롭다운 li요소들 클릭할 때 기능
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      // 클릭한 거 문자 공백 제거
      const text = item.textContent.trim();
      // 클릭한걸로 교체
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

// ----- select = 기간: "오늘" / text = 내용 바꾸기
function updateText(select, text) {
  const tag = document.querySelector(select);
  if (tag) {
    tag.textContent = text;
    tag.closest(".bar-wrap").classList.remove("hidden");
  }
}

// ----- 오름차순 / 내림차순 버튼
const sortBtn = document.querySelector(".filter-btn.sort");
const sortText = document.querySelector("#sort-text");
const priorityBtn = document.querySelector("#btn-priority");

sortBtn.addEventListener("click", () => {
  // 클릭했을 때 오름차순이야?
  const upDown = sortText.textContent === "오름차순";
  //  맞으면 내림차순 아니면 오름차순
  const nextText = upDown ? "내림차순" : "오름차순";

  sortText.textContent = nextText;
  priorityBtn.textContent = nextText;

  setFilter("sort", nextText);
});

// ----- 필터에 X 버튼 클릭하면 초기화하기!
// 둘 다 bar-wrap되어 있어서 따로 잡은거임
const periodTag = document.querySelector(".period-tag").closest(".bar-wrap");
const priorityTag = document.querySelector(".sort-tag").closest(".bar-wrap");

// X 버튼 찾는 거
const periodCloseBtn = periodTag.querySelector(".close-filter-btn");
const priorityCloseBtn = priorityTag.querySelector(".close-filter-btn");
const dropdownBtn = document.querySelectorAll(".filter-btn span");
const periodText = dropdownBtn[0]; // 기간
const priorityText = dropdownBtn[1]; // 우선순위

periodCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  periodTag.classList.add("hidden");
  periodText.textContent = "전체 기간";
  setFilter("period", "전체 기간");
});

priorityCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  priorityTag.classList.add("hidden");
  priorityText.textContent = "우선순위";
  setFilter("priority", "전체 우선순위");
});
