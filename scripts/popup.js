// Btns

const signInBtn = document.querySelector(".sign-link");
const registerBtn = document.querySelector(".register-link");
const closeAdvBtn = document.querySelector(".adv__close-btn");

// Popups
const closePopupBtns = document.querySelectorAll(".popup__close-btn");
const signInPopupWindow = document.querySelector("#login-window");
const signInPopup = signInPopupWindow.querySelector(".popup");
const registerPopupWindow = document.querySelector("#register-window");
const registerPopup = registerPopupWindow.querySelector(".popup");

const adv = document.querySelector(".adv");

closeAdvBtn.addEventListener("click", () => {
  adv.classList.add("adv--hidden");
});

function openPopup(popupWindow, selector) {
  popupWindow.classList.remove(selector);
  window.addEventListener("keydown", closePopupByEsc);
  window.addEventListener("click", closeByClickOnOverlay);
}

function closePopup(popupWindow, selector) {
  popupWindow.classList.add(selector);
  window.removeEventListener("keydown", closePopupByEsc);
  window.removeEventListener("click", closeByClickOnOverlay);
}

function closePopupByEsc(e) {
  if (e.key == "Escape") {
    document.querySelectorAll(".popup-window").forEach((popupWindow) => closePopup(popupWindow, "popup-window--hidden"));
  }
}

function closeByClickOnOverlay(e) {
  if (e.target.className === "popup-window") {
    closePopup(e.target.closest(".popup-window"), "popup-window--hidden");
  }
}

closePopupBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closePopup(e.target.closest(".popup-window"), "popup-window--hidden");
  });
});

signInBtn.addEventListener("click", () => {
  openPopup(signInPopupWindow, "popup-window--hidden");
});

registerBtn.addEventListener("click", () => {
  openPopup(registerPopupWindow, "popup-window--hidden");
});
