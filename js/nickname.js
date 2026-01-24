// 기본 닉네임 값
const userInfo = {
  nickname: "guestUser",
};

const nicknameText = document.querySelector(".nickname-text");
const nicknameInput = document.querySelector(".nickname-edit-input");
const editBtn = document.querySelector(".edit-btn");
const actionGroup = document.querySelector(".edit-action-group");
const cancelBtn = document.querySelector(".edit-cancel-btn");
const saveBtn = document.querySelector(".edit-save-btn");

// 닉네임이랑 초기 세팅해서 guesUser 이름 나오게
function init() {
  if (nicknameText) {
    nicknameText.innerText = userInfo.nickname;
  }
}

// 이미지눌러서 수정할수있게 실행(if문 사용해서
function toggleEditMode(isEditing) {
  if (isEditing) {
    // 수정할때는 게스트 가리고 이미지도 가려야함
    nicknameText.style.display = "none";
    editBtn.style.display = "none";
    //수정때는 입력창 보이게 하고 취소랑 완료버튼 빼놓기
    nicknameInput.style.display = "inline-block";
    actionGroup.style.display = "inline-flex";
    //입력창에 이름쓰고 글 쓸수있게
    nicknameInput.value = userInfo.nickname;
    nicknameInput.focus();
  } else {
    nicknameText.style.display = "inline";
    editBtn.style.display = "flex";

    nicknameInput.style.display = "none";
    actionGroup.style.display = "none";
  }
}

init();

// 수정 버튼
editBtn.onclick = () => {
  toggleEditMode(true);
};

// 취소 버튼
cancelBtn.onclick = () => {
  toggleEditMode(false);
};

// 완료 버튼
saveBtn.onclick = () => {
  const newName = nicknameInput.value.trim();
  // 내뇽이 비었지 않고 있으면 저장하고 화면 글자 바꾸고 수정끝내기
  // 만약 아무것도 안했으면 경고창 띄우게 하기
  if (newName !== "") {
    userInfo.nickname = newName;
    nicknameText.innerText = newName;
    toggleEditMode(false);
  } else {
    alert("닉네임을 입력해주세요!");
    nicknameInput.focus();
  }
};

// 마우스 대신 키보드로도 할수있게 keydown쓰는거하기 키다운 엔더 - esc 완료 - 취소
nicknameInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    saveBtn.onclick();
  }
  if (event.key === "Escape") {
    cancelBtn.onclick();
  }
};
