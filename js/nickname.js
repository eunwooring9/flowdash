// 초반 데이터 설정 로컬스토리지 활용해서 하기
// 상수는 대문자로 쓰기
const DEFAULT_NICKNAME = "FlowDash";
const savedNickname = localStorage.getItem("userNickname");

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
  let message = "안녕하세요";

  if (hours >= 5 && hours < 11) {
    message = "좋은 아침이에요";
  } else if (hours >= 11 && hours < 17) {
    message = "좋은 오후에요";
  } else if (hours >= 17 && hours < 22) {
    message = "좋은 저녁이에요";
  } else {
    message = "안녕하세요";
  }

  // 인사말 화면에 넣기
  if (greetingMessage) {
    greetingMessage.innerText = message;
  }
}

// 닉네임 클릭해서 수정했을때 원래대로
function saveNicknameProcess() {
  const inputValue = nicknameInput.value.trim();

  //빈칸이면 원래이름으로 이름 새로 넣으면 로컬로 업데이트
  if (inputValue === "") {
    nicknameInput.value = currentName;
  } else {
    currentName = inputValue;
    localStorage.setItem("userNickname", inputValue);
    //콘솔확인용
    // console.log("이름 저장 :", inputValue);
  }

  // 화면에 글자 바꾸고 나서 입력하는 부분 숨기기기 스타일 디스플레이 넣어서 인라인으로 바꾸로 noine
  nicknameText.innerText = currentName;
  nicknameText.style.display = "inline";
  nicknameInput.style.display = "none";
}

//처음에 먼저 실행됬을때 보여줘야하는 기본 닉네임
function startName() {
  if (nicknameText) {
    nicknameText.innerText = currentName;
  }

  // 날짜 표시 기능 추가 (수정)
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
startName(); // (수정) startNameText()에서 startName()으로 명칭 통일

//이벤트

//닉네임 부분 클릭했을때 클릭 이벤트로 function실행해서 수정중에는 나타나게 하기
// 입력창에 이ㅏ,ㅇ, 입력창 커서 깜빡이게 해서 포인트 주기
nicknameText.addEventListener("click", function () {
  nicknameText.style.display = "none";
  nicknameInput.style.display = "inline-block";
  nicknameInput.value = currentName;
  nicknameInput.focus();
});

// 입력할때 그외 밖에 만지면 blur 하면 저장하기
nicknameInput.addEventListener("blur", function () {
  saveNicknameProcess();
});

// 엔터 눌러도 저장되게 esc 누르면 취소되게 keydown사용하기
nicknameInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    nicknameInput.blur();
  }
  if (event.key === "Escape") {
    nicknameText.style.display = "inline";
    nicknameInput.style.display = "none";
  }
};
