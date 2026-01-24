"use strict";

// const dropdown = document.querySelectorAll(".filter-dropdown");
// document.addEventListener("click", function (hide) {
//    dropdown.forEach((item) => {
//       // 바깥 클릭
//       if (!item.contains(hide.target)) {
//          item.classList.remove("active");
//       }
//    });
// });

// 드롭다운 밖에 클릭하면 드롭다운 없애지게 하는 기능 (위랑 아래랑 동일한거임)
document.addEventListener("click", (select) => {
  // 열려 있는 드롭다운 찾기
  document.querySelectorAll(".filter-dropdown.active").forEach((item) => {
    // 드롭다운 아니면 닫아버리기
    if (!item.contains(select.target)) item.classList.remove("active");
  });
});

// 기간: ~ / 우선순위: ~ 기능
document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
  const mainText = dropdown.querySelector(".filter-btn span");

  // filter-btn 누르면 드롭다운 열었다 / 닫았다
  dropdown.querySelector(".filter-btn").addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // 드롭다운 li요소들 클릭할 때 기능
  dropdown.querySelectorAll(".dropdown-menu li").forEach((items) => {
    items.addEventListener("click", () => {
      // 클릭한 거 문자 공백 제거
      const text = items.textContent.trim();
      // 클릭한걸로 교체
      mainText.textContent = text;

      // 기간: ~ 찾기
      const period = text === "전체 기간" || text === "오늘" || text === "최근 7일";
      // 우선순위: ~ 찾기
      const sort =
        text === "전체 우선순위" || text === "높음" || text === "중간" || text === "낮음";

      period
        ? // 기간: ~ 맞으면 이걸로
          updateText(".period-tag .highlight", text)
        : sort
          ? // 우선순위면 이거 (둘 다 아니면 null)
            updateText(".sort-tag .highlight", text)
          : null;
      dropdown.classList.remove("active");
    });
  });
});

// select = 기간: "오늘" / text = 내용 바꾸기
function updateText(select, text) {
  const tag = document.querySelector(select);
  tag.textContent = text;
  tag.closest(".bar-wrap").classList.remove("hidden");
}

// 오름차순 / 내림차순 버튼
const sortBtn = document.querySelector(".filter-btn.sort");
const sortText = document.querySelector("#sort-text");
const priorityBtn = document.querySelector("#btn-priority");

sortBtn.addEventListener("click", () => {
  // 클릭했을 때 오름차순이야?
  const ab = sortText.textContent === "오름차순";
  //  맞으면 내림차순 아니면 오름차순
  const abText = ab ? "내림차순" : "오름차순";

  sortText.textContent = abText;
  priorityBtn.textContent = abText;
});
