const DEFAULT_NICKNAME = "FlowDash";
const STORAGE_KEY = "flowdash-nickname";

const MAX_NICKNAME_LENGTH = 12;
const MIN_INPUT_WIDTH = 50;

const savedNickname = localStorage.getItem(STORAGE_KEY);

const setNickname = (nickname) => {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(nickname));
};

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

// 만약에 해서 05시 11시 / 11시 17시 / 17시 22시 / 나머지는 안녕하세요 넣기
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
      : "안녕하세요";

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
  }

  nicknameText.innerText = currentName;
  nicknameText.style.display = "inline";
  nicknameInput.style.display = "none";
}

//처음에 먼저 실행 되었을 때 보이는 닉네임 기본값
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

// enter 눌러도 저장되게 esc 누르면 취소되게
nicknameInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    nicknameInput.blur();
  }

  if (event.key === "Escape") {
    nicknameInput.value = currentName;
    nicknameText.style.display = "inline";
    nicknameInput.style.display = "none";
  }
};
