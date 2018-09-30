const loginId = document.querySelector("#login-id")
const loginButton = document.querySelector("#login-button")

loginButton.addEventListener("click", (e) => {
  e.preventDefault()

  Cookies.set('loginId', loginId.value);
  history.back();
})
