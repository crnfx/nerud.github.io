const menu = document.querySelector(".nav__mobile");
const burger = document.querySelector(".header__burger");
const links = document.querySelectorAll(".nav__mobile .nav__link");

burger.addEventListener("click", () => {
  menu.classList.toggle("nav__mobile--active");
  burger.classList.toggle("header__burger--active");

  if (menu.classList.contains("nav__mobile--active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("nav__mobile--active");
    burger.classList.remove("header__burger--active");
    document.body.style.overflow = "visible";
  });
});

const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 30,
});
