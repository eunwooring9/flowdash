import { todoStore, renderAll } from "./modal.js"; // 데이터 / 렌더

// ----- 기본값 지정
const filters = {
  search: "",
  period: "전체 기간",
  priority: "전체 우선순위",
  sort: "오름차순",
};

export function setFilter(key, value) {
  filters[key] = value; // value 업데이트
  applyFilters();
}

// todoStore 카피
function applyFilters() {
  let result = [...todoStore];

  // ----- 검색 영역
  if (filters.search !== "") {
    result = result.filter((t) => t.title.includes(filters.search));
  }

  // ----- 기간 영역
  const now = new Date();
  const aDay = 24 * 60 * 60 * 1000; // 하루

  if (filters.period === "오늘") {
    result = result.filter((t) => {
      const date = new Date(t.createdAt); // modal.js
      const sameYear = date.getFullYear() === now.getFullYear();
      const sameMonth = date.getMonth() === now.getMonth();
      const sameDate = date.getDate() === now.getDate();

      if (sameYear && sameMonth && sameDate) {
        return true;
      } else {
        return false;
      }
    });
  } else if (filters.period === "최근 7일") {
    result = result.filter((t) => {
      const dif = now.getTime() - t.createdAt;
      if (dif <= 7 * aDay) {
        return true;
      } else {
        return false;
      }
    });
  }

  // ----- 우선순위
  if (filters.priority !== "전체 우선순위") {
    const target =
      filters.priority === "높음" ? "high" : filters.priority === "중간" ? "medium" : "low";
    result = result.filter((t) => t.priority === target);
  }

  // ----- 오름차순 / 내림차순
  result.sort((a, b) => {
    if (filters.sort === "오름차순") {
      return a.createdAt - b.createdAt;
    } else {
      return b.createdAt - a.createdAt;
    }
  });
  renderAll(result);
}
