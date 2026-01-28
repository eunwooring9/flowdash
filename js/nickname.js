// 초반 데이터 설정 로컬스토리지 활용해서 하기
// 상수는 대문자로 쓰기
const DEFAULT_NICKNAME = "FlowDash";
// flowdash-nickname 대신 똑같이 상수로 선언하기
const STORAGE_KEY = "flowdash-nickname";

// input 너비자연스럽게 하기
// 최대 글자수 넣어서 글자수 너비 제한하기
const MAX_NICKNAME_LENGTH = 12;
const MIN_INPUT_WIDTH = 50;

// 여기도 상수로 바꾸기
const savedNickname = localStorage.getItem(STORAGE_KEY);

// 로컬에 보이게 할당하기 nickname 넣어서 값 넣게 set으로
// 기존에 넣었던 key는 맨처음 선언했던 상수랑 구별을 못함? 그래서 제대로 명시하게 바꾸기
// nicknamea대신 상수로 위에처럼 선언해서 대입하기
const setNickname = (nickname) => {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(nickname));
};

// 이름이 있으면 쓰고 없으면 기본값 할당해
let currentName = "";
if (savedNickname === null) {
  currentName = DEFAULT_NICKNAME;
} else {
  currentName = savedNickname;
}

// 이름보여주는거, 수정하는거, 날짜바꾸기 이름넣어서 실행하기
const nicknameText = document.querySelector(".nickname-text");
const nicknameInput = document.querySelector(".nickname-edit-input");
const greetingMessage = document.querySelector("#greeting-message");

// 만약에 해서 05시 11시 / 11시 17시 / 17시 22시 / 나머지는 그냥 안녕하세요 넣기
function updateTimeGreeting() {
  const now = new Date();
  const hours = now.getHours();

  //삼항으로 바꿔서 한번 바꿔보기 조건이 ? 참이면 : 거짓이면
  const message =
    hours >= 5 && hours < 11
      ? "좋은 아침이에요"
      : hours >= 11 && hours < 17
        ? "좋은 오후예요"
        : hours >= 17 && hours < 22
          ? "좋은 저녁이에요"
          : // 위에 조건이 다아니면 안녕하세요로 바꾸기
            "안녕하세요";

  // 인사말 화면에 넣기
  if (greetingMessage) {
    greetingMessage.innerText = message;
  }
}

// input 길이랑 글자수 맞춰서 함수 호출
function changeInputWidth() {
  const textLength = nicknameInput.value.length;

  let newWidth = MIN_INPUT_WIDTH + textLength * 15;
  if (newWidth > 200) {
    newWidth = 200;
  }
  nicknameInput.style.width = newWidth + "px";
}

// 닉네임 클릭해서 수정했을때 원래대로
function saveNicknameProcess() {
  const inputValue = nicknameInput.value.trim();

  // 빈칸이면 원래이름으로 이름 새로 넣으면 로컬로 업데이트
  if (inputValue === "") {
    nicknameInput.value = currentName;
  } else {
    currentName = inputValue;
    localStorage.setItem(STORAGE_KEY, inputValue);
    //콘솔확인용
    // console.log('이름 저장 :', inputValue);
  }

  // 화면에 글자 바꾸고 나서 입력하는 부분 숨기기기 스타일 디스플레이 넣어서 인라인으로 바꾸고 none
  nicknameText.innerText = currentName;
  nicknameText.style.display = "inline";
  nicknameInput.style.display = "none";
}

//처음에 먼저 실행됬을때 보여줘야하는 기본 닉네임
function startName() {
  if (nicknameText) {
    nicknameText.innerText = currentName;
  }

  // 날짜 표시 기능 추가
  const dateElement = document.querySelector("#current-date");
  if (dateElement) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    dateElement.innerText = `${year}년 ${month}월 ${date}일`;
  }

  updateTimeGreeting();
}
startName();

// 이벤트 라인

// 닉네임 부분 클릭했을때 클릭 이벤트로 function실행해서 수정중에는 나타나게 하기
// input 커서 깜빡이게 해서 포인트 주기
// input 클릭하면 크기 맞추기
nicknameText.addEventListener("click", function () {
  nicknameText.style.display = "none";
  nicknameInput.style.display = "inline-block";
  nicknameInput.value = currentName;

  nicknameInput.focus();
  changeInputWidth();
});

// 입력할때 그외 밖에 만지면 blur 하면 저장하기
nicknameInput.addEventListener("blur", function () {
  saveNicknameProcess();
});

// 입력할때 실시간으로 크기 반영하기
nicknameInput.addEventListener("input", function () {
  changeInputWidth();
});

// enter 눌러도 저장되게 esc 누르면 취소되게 keydown 사용하기
nicknameInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    nicknameInput.blur();
  }

  // esc키 누르면 원래 이름이나 수정전 이름으로 돌아가고 숨기기
  // esc키  그전 닉네임 작성 하던 거 초기화해주기
  if (event.key === "Escape") {
    nicknameInput.value = currentName;
    nicknameText.style.display = "inline";
    nicknameInput.style.display = "none";
  }
};
