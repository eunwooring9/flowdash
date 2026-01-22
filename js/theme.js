const toggle = document.getElementById("themeToggle");

// 저장된 테마 적용
const saved = localStorage.getItem("theme");
if (saved === "dark") document.body.classList.add("dark");

// 테마 버튼 아이콘(해/달)만 확실히 바꾸기
function updateThemeIcon(isDark) {
   const img = toggle?.querySelector("img");
   if (!img) return;

   img.src = isDark ? "./assets/img/moon-dark.svg" : "./assets/img/sun-light.svg";
}

updateThemeIcon(document.body.classList.contains("dark"));

toggle?.addEventListener("click", () => {
   const isDark = document.body.classList.toggle("dark");
   localStorage.setItem("theme", isDark ? "dark" : "light");
   updateThemeIcon(isDark);
});
