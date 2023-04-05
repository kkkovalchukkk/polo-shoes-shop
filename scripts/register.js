if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

const profile = document.querySelector(".profile");
const profileName = profile.querySelector("span");
const profileExitBtn = profile.querySelector(".profile__exit-btn");
const loginMenu = document.querySelector(".cabinet");

if (localStorage.getItem("isAuth") == "true") {
  loginMenu.classList.add("cabinet--hidden");
  profile.classList.remove("profile--hidden");
  profileName.textContent = localStorage.getItem("currentUser");
} else {
  loginMenu.classList.remove("cabinet--hidden");
  profile.classList.add("profile--hidden");
}

profileExitBtn.addEventListener("click", () => {
  localStorage.setItem("isAuth", false);
  localStorage.setItem("currentUser", "");
  window.location.reload();
});

// Regiser

const registerForm = document.querySelector("#register-form");
const registerLoginInput = registerForm.querySelector('input[name="login"]');
const registerPassInput = registerForm.querySelector('input[name="pass"]');
const registerRepeatPassInput = registerForm.querySelector('input[name="repeat-pass"]');

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = registerLoginInput.value;
  const pass = registerPassInput.value;
  const repeatPass = registerRepeatPassInput.value;

  if (!userName || !pass || !repeatPass) {
    alert("Вы что-то пропустили");
    return;
  }

  if (pass !== repeatPass) {
    alert("Неверное повторение пароля, попробуйте еще раз");
    return;
  }

  if (JSON.parse(localStorage.getItem("users")).some((user) => user.name.toLowerCase().trim() == userName.toLowerCase().trim())) {
    alert("Такое имя уже занято");
    registerForm.reset();
    return;
  }

  if (JSON.parse(localStorage.getItem("users")).length) {
    const users = JSON.parse(localStorage.getItem("users"));
    users.push({ name: userName, pass: pass });
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.setItem("users", JSON.stringify([{ name: userName, pass: pass }]));
  }

  localStorage.setItem("isAuth", true);
  localStorage.setItem("currentUser", userName);
  window.location.reload();
});

// Login

const loginForm = document.querySelector("#login-form");
const loginNameInput = loginForm.querySelector('input[name="login"]');
const loginPassInput = loginForm.querySelector('input[name="pass"]');

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = loginNameInput.value;
  const pass = loginPassInput.value;

  if (!userName || !pass) {
    alert("Вы ввели что-то неверное");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users"));
  if (users.some((user) => user.name === userName && user.pass === pass)) {
    localStorage.setItem("isAuth", true);
    localStorage.setItem("currentUser", userName);
    window.location.reload();
  } else {
    alert("Вы ввели неверный логин или пароль");
    return;
  }
});
