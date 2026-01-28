// [임포트]
// todoStore: 전체 할 일 목록 데이터 (modal.js에서 가져옴)
// renderAll: 화면을 다시 그리는 함수 (modal.js에서 가져옴)
import { todoStore, renderAll } from "./modal.js";

// [객체(변수)] 현재 필터 상태 저장소
// 기능: 지금 사용자가 어떤 필터를 걸었는지 기억하는 설정판입니다.
const filters = {
  search: "", // 검색어
  period: "전체 기간", // 기간 설정
  priority: "전체 우선순위", // 우선순위 설정
  sort: "오름차순", // 정렬 설정
};

// [함수 + 내보내기] 필터 설정 변경 함수
// 기능: 외부(filter.js, search.js)에서 이 함수를 호출해서 설정을 바꿉니다.
// key: 무엇을 바꿀지 ("period", "sort" 등)
// value: 무슨 값으로 바꿀지 ("오늘", "내림차순" 등)
export function setFilter(key, value) {
  filters[key] = value; // 설정판(filters)의 값을 업데이트
  applyFilters(); // 설정이 바꼈으니 필터링 로직 실행!
}

// [함수] 필터링 적용 및 화면 그리기 (핵심 엔진)
function applyFilters() {
  // 1. 전체 데이터 복사 ([...todoStore])
  // 왜 복사하나요? 원본(todoStore)을 직접 건드려서 지워버리면, 나중에 "전체 보기" 했을 때 데이터가 날아가있기 때문입니다.
  // result라는 임시 목록을 만들어서 여기서 지지고 볶습니다.
  let result = [...todoStore];

  // 2. 검색어 필터링
  if (filters.search !== "") {
    // .filter(): 조건에 맞는 것만 남김
    // t.title.includes(...): 제목에 검색어가 포함되어 있으면 합격!
    result = result.filter((t) => t.title.includes(filters.search));
  }

  // 3. 기간 필터링
  const now = new Date(); // 현재 시간
  const aDay = 24 * 60 * 60 * 1000; // 하루를 밀리초(ms)로 환산한 값 (계산용)

  if (filters.period === "오늘") {
    // 하나씩 꺼내서 오늘 날짜인지 확인
    result = result.filter((t) => {
      const date = new Date(t.createdAt); // 할 일이 만들어진 시간
      // 연도, 월, 일 3개가 모두 똑같아야 "오늘"임
      const sameYear = date.getFullYear() === now.getFullYear();
      const sameMonth = date.getMonth() === now.getMonth();
      const sameDate = date.getDate() === now.getDate();

      if (sameYear && sameMonth && sameDate) {
        return true; // 합격 (남김)
      } else {
        return false; // 탈락 (숨김)
      }
    });
  } else if (filters.period === "최근 7일") {
    result = result.filter((t) => {
      // 현재시간 - 만든시간 = 흐른 시간
      const dif = now.getTime() - t.createdAt;
      // 흐른 시간이 7일치(7 * aDay) 보다 작거나 같으면 합격
      if (dif <= 7 * aDay) {
        return true;
      } else {
        return false;
      }
    });
  }

  // 4. 우선순위 필터링
  if (filters.priority !== "전체 우선순위") {
    let target = "";

    // 화면의 한글("높음")을 데이터의 영어("high")로 변환
    if (filters.priority === "높음") {
      target = "high";
    } else if (filters.priority === "중간") {
      target = "medium";
    } else {
      target = "low";
    }
    // 우선순위가 같은 것만 남김
    result = result.filter((t) => t.priority === target);
  }

  // 5. 정렬 (오름차순 / 내림차순)
  // .sort((a, b) => ...): a와 b 두 개를 비교해서 자리를 바꿈
  result.sort((a, b) => {
    if (filters.sort === "오름차순") {
      // 작은 숫자(옛날) -> 큰 숫자(최신) 순서
      return a.createdAt - b.createdAt;
    } else {
      // 큰 숫자(최신) -> 작은 숫자(옛날) 순서
      return b.createdAt - a.createdAt;
    }
  });

  // 6. 최종 렌더링
  // 지지고 볶아서 완성된 result(최종 목록)를 가지고 화면을 다시 그리라고 modal.js에게 시킴
  renderAll(result);
}
