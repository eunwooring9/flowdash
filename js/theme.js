const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const ICON_SUN = "./assets/img/icons8-sun.svg";
const ICON_MOON = "./assets/img/icons8-moon.png";

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (themeIcon) {
    themeIcon.src = isDark ? ICON_SUN : ICON_MOON;
    themeIcon.alt = isDark ? "라이트 모드로 전환" : "다크 모드로 전환";
  }
}

// 초기 로드
const saved = localStorage.getItem("flowdash-theme");
applyTheme(saved === "dark");

// 클릭 시 토글
themeToggleBtn?.addEventListener("click", () => {
  const isDarkNow = document.body.classList.contains("dark");
  applyTheme(!isDarkNow);
});
