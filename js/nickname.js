const DEFAULT_NICKNAME = "FlowDash";
const STORAGE_KEY = "flowdash-nickname";

const MAX_NICKNAME_LENGTH = 12;
const MIN_INPUT_WIDTH = 50;
const MAX_INPUT_WIDTH = 200;

// 저장된 닉네임 불러오기 (문자열 그대로)
const savedNickname = localStorage.getItem(STORAGE_KEY);
let currentName = savedNickname === null ? DEFAULT_NICKNAME : savedNickname;

// DOM
const nicknameText = document.querySelector(".nickname-text");
const nicknameInput = document.querySelector(".nickname-edit-input");
const greetingMessage = document.querySelector("#greeting-message");

// 시간대 인사말
function updateTimeGreeting() {
  const now = new Date();
  const hours = now.getHours();

  const message =
    hours >= 5 && hours < 11
      ? "좋은 아침이에요"
      : hours >= 11 && hours < 17
      ? "좋은 오후예요"
      : hours >= 17 && hours < 22
      ? "좋은 저녁이에요"
      : "안녕하세요";

  if (greetingMessage) greetingMessage.innerText = message;
}

// input 너비 자동 조절
function changeInputWidth() {
  const textLength = nicknameInput.value.length;
  let newWidth = MIN_INPUT_WIDTH + textLength * 15;
  if (newWidth > MAX_INPUT_WIDTH) newWidth = MAX_INPUT_WIDTH;
  nicknameInput.style.width = newWidth + "px";
}

// 저장 처리(공백 방지 + 길이 제한)
function saveNicknameProcess() {
  let inputValue = nicknameInput.value.trim();

  // 공백이면 기존값 유지
  if (inputValue === "") inputValue = currentName;

  // 길이 제한(12자)
  if (inputValue.length > MAX_NICKNAME_LENGTH) {
    inputValue = inputValue.slice(0, MAX_NICKNAME_LENGTH);
  }

  currentName = inputValue;
  localStorage.setItem(STORAGE_KEY, currentName);

  nicknameText.innerText = currentName;
  nicknameText.style.display = "inline";
  nicknameInput.style.display = "none";
}

// 초기 세팅(닉네임 + 날짜 + 인사)
function startName() {
  if (nicknameText) nicknameText.innerText = currentName;

  const dateElement = document.querySelector("#current-date");
  if (dateElement) {
    const now = new Date();
    dateElement.innerText = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  }

  updateTimeGreeting();
}
startName();

// 이벤트
nicknameText?.addEventListener("click", () => {
  nicknameText.style.display = "none";
  nicknameInput.style.display = "inline-block";
  nicknameInput.value = currentName;

  nicknameInput.focus();
  changeInputWidth();
});

nicknameInput?.addEventListener("blur", saveNicknameProcess);

nicknameInput?.addEventListener("input", () => {
  // 입력 중에도 12자 제한을 안전하게 적용
  if (nicknameInput.value.length > MAX_NICKNAME_LENGTH) {
    nicknameInput.value = nicknameInput.value.slice(0, MAX_NICKNAME_LENGTH);
  }
  changeInputWidth();
});

nicknameInput &&
  (nicknameInput.onkeydown = (event) => {
    if (event.key === "Enter") nicknameInput.blur();

    if (event.key === "Escape") {
      nicknameInput.value = currentName;
      nicknameText.style.display = "inline";
      nicknameInput.style.display = "none";
    }
  });
