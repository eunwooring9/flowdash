const profileImg = document.querySelector("#profileImg");
const profileInput = document.querySelector("#profileInput");
const profileBtn = document.querySelector("#profileChange");

profileBtn.addEventListener("click", () => {
  profileInput.click();
});

profileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    // FileReader: 파일 읽는 도구임
    const imgReader = new FileReader();
    imgReader.onload = (e) => {
      profileImg.src = e.target.result;
    };
    // readAsDateURL: 파일을 데이터 주소로 읽는 것
    imgReader.readAsDataURL(file);
  }
});
