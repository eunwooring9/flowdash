import { todoStore, renderAll } from "./modal.js";

// 필터 기본값 지정
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

// 필터링 로직
function applyFilters() {
  // todoStore 카피
  let result = [...todoStore];

  // 검색 영역
  if (filters.search !== "") {
    result = result.filter((t) => t.title.includes(filters.search));
  }

  // 기간 영역
  const now = new Date();
  const aDay = 24 * 60 * 60 * 1000; // 하루

  if (filters.period === "오늘") {
    result = result.filter((t) => {
      const date = new Date(t.createdAt);
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

  // 우선순위 영역
  if (filters.priority !== "전체 우선순위") {
    let target = "";

    if (filters.priority === "높음") {
      target = "high";
    } else if (filters.priority === "중간") {
      target = "medium";
    } else {
      target = "low";
    }
    result = result.filter((t) => t.priority === target);
  }

  // 정렬 (오름차순 / 내림차순)
  result.sort((a, b) => {
    const korean = (text) => /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const aKorean = korean(a.title);
    const bKorean = korean(b.title);

    if (filters.sort === "오름차순") {
      if (aKorean && !bKorean) return -1;
      if (!aKorean && bKorean) return 1;

      return a.title.localeCompare(b.title);
    } else {
      if (aKorean && !bKorean) return 1;
      if (!aKorean && bKorean) return -1;
      return b.title.localeCompare(a.title);
    }
  });

  // 최종 렌더링
  renderAll(result);
}
