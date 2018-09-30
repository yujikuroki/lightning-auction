const bidButton = document.querySelector("#bid-button")
const bidPrice = document.querySelector("#bid-price");

bidButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (Cookies.get("loginId") == undefined) {
    location.href = "/users/login"
    return
  }

  if (!bidPrice.value.match(/^[\d]+\.[\d]+$/)) {
    bidPrice.classList.add("is-invalid")
    return;
  }
  bidPrice.classList.remove("is-invalid")
  superagent
    .post(`${location.pathname}/invoice_addresses`)
    .send({ invoicePrice: bidPrice.value })
    .end((errres, response) => {
      location.href = response.body.invoiceUrl;
    })
});
