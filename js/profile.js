const profileImg = document.querySelector("#profileImg");
const profileInput = document.querySelector("#profileInput");
const profileBtn = document.querySelector("#profileChange");

const PROFILE_KEY = "userProfileImage";

const savedImage = localStorage.getItem(PROFILE_KEY);
if (savedImage) {
  profileImg.src = savedImage;
}

profileBtn.addEventListener("click", () => {
  profileInput.click();
});

profileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    // 원본 이미지 백업
    const originalImage = profileImg.src;

    // FileReader: 파일 읽는 도구임
    const imgReader = new FileReader();

    imgReader.onload = (e) => {
      const imgUrl = e.target.result;
      profileImg.src = imgUrl;

      try {
        localStorage.setItem(PROFILE_KEY, imageDataUrl);
      } catch (error) {
        alert("이미지 용량 초과!");

        // 백업 이미지로 돌려놓기
        profileImg.src = originalImage;
        console.error(error);
      }
    };
    // readAsDateURL: 파일을 데이터 주소로 읽는 것
    imgReader.readAsDataURL(file);
  }
});
