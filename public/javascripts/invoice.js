const bidButton = document.querySelector("#bid-button")
const bidPrice = document.querySelector("#bid-price");

bidButton.addEventListener("click", (e) => {
  e.preventDefault();

  superagent
    .post(`${location.pathname}/invoice_addresses`)
    .send({ invoicePrice: bidPrice.value })
    .end((errres, response) => {
      location.href = response.body.invoiceUrl;
    })
});
