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

// guestUser 넣는 부분
function init() {
  if (nicknameText) {
    nicknameText.innerText = userInfo.nickname;
  } else {
    console.error(".nickname-text를 찾을 수 없습니다. HTML을 확인하세요.");
  }
}
// 닉네임 수정 완료 부분
function toggleEditMode(isEditing) {
  const view = isEditing ? "none" : "inline";
  const edit = isEditing ? "inline-block" : "none";

  nicknameText.style.display = view;
  editBtn.style.display = isEditing ? "none" : "flex";

  nicknameInput.style.display = edit;
  actionGroup.style.display = isEditing ? "inline-flex" : "none";

  if (isEditing) {
    nicknameInput.value = userInfo.nickname;
    nicknameInput.focus();
  }
}

// function init() {
//   nicknameText.innerText = userInfo.nickname;
// }

init();

// 수정 버튼 이벤트
editBtn.onclick = () => toggleEditMode(true);
cancelBtn.onclick = () => toggleEditMode(false);

saveBtn.onclick = () => {
  const newName = nicknameInput.value.trim();
  if (newName) {
    userInfo.nickname = newName;
    nicknameText.innerText = newName;
    toggleEditMode(false);
  } else {
    alert("닉네임을 입력해주세요!");
  }
};

// 키보드 이벤트
nicknameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveBtn.click();
  } else if (event.key === "Escape") {
    toggleEditMode(false);
  }
});
