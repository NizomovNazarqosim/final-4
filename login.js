"use strict";

const elForm = document.querySelector(".form");
const elUsernameInput = document.querySelector(".username-input");
const elPasswordInput = document.querySelector(".password-input");
const mistake = document.querySelector(".mistake");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const usernameValue = elUsernameInput.value;
  const passwordValue = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: usernameValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("main.html");
      } else {
        const desc = document.createElement("p");
        desc.classList.add("mistake-desc")
        desc.textContent = "Username or password is wrong";
        mistake.appendChild(desc)
      }
    });
});
