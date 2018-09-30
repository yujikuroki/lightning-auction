$(window).on("load", () => {
  if (Cookies.get("loginId") != undefined && Cookies.get("loginId") != "") {
    document.querySelector("#sessionView").style.display = "inline"
  }
})
