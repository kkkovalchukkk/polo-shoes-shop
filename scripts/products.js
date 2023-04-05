const productWindow = document.querySelector("#product-window");
const popupHeading = productWindow.querySelector("h3");
const popupPrice = productWindow.querySelector(".popup__price");
const popupImg = productWindow.querySelector("img");
const popupBtn = productWindow.querySelector("a");

const catalogItems = document.querySelectorAll(".catalog-item");

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

catalogItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const heading = item.querySelector("h3");
    const price = item.querySelector(".catalog-item__price");
    const img = item.querySelector("img");
    popupHeading.textContent = heading.textContent;
    popupPrice.textContent = price.textContent;
    popupImg.src = img.src;
    openPopup(productWindow, "popup-window--hidden");
  });
});

popupBtn.addEventListener("click", () => {
  closePopup(productWindow, "popup-window--hidden");
  window.location.reload();
});
