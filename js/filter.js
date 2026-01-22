"use strict";
// 전체 우선순위
const dropdown = document.querySelectorAll(".filter-dropdown");

dropdown.forEach((dropdown) => {
   const btn = dropdown.querySelector(".filter-btn");
   const mainText = dropdown.querySelector(".filter-btn span");
   const items = dropdown.querySelectorAll(".dropdown-item");

   items.forEach((item) => {
      item.addEventListener("click", () => {
         mainText.textContent = item.textContent;
         dropdown.classList.remove("active");
      });
   });

   btn.addEventListener("click", () => {
      dropdown.classList.toggle("active");
   });
});

// 오름차순 / 내림차순
const sortBtn = document.querySelector(".filter-btn.sort");
const sortText = document.querySelector("#sort-text");
const priorityBtn = document.querySelector("#btn-priority");

sortBtn.addEventListener("click", function () {
   if (sortText.textContent === "오름차순") {
      sortText.textContent = "내림차순";
      priorityBtn.textContent = "내림차순";
   } else {
      sortText.textContent = "오름차순";
      priorityBtn.textContent = "오름차순";
   }
});
