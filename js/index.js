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

const modalOverlay = document.querySelector(".modal-overlay");
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.style.display !== "none") {
    modalOverlay.style.display = "none";
  }
});

const form = document.getElementById("form");
const button = document.getElementById("button");
const agreementCheckbox = document.getElementById("checkbox");
const phoneInput = document.getElementById("tel");

function updateButtonState() {
  const isPhoneValid = phoneInput.value.trim() !== "";
  const isCheckboxChecked = agreementCheckbox.checked;
  button.disabled = !(isPhoneValid && isCheckboxChecked);
}

updateButtonState();

agreementCheckbox.addEventListener("change", updateButtonState);
phoneInput.addEventListener("input", updateButtonState);

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^\d+()-]/g, "");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    modalOverlay.style.display = "flex";
    button.disabled = true;
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Произошла ошибка при отправке формы.");
  }
});
