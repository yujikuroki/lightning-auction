const socket = io.connect("http://localhost:8000");
socket.on('broadcast', (data) => {
  document.querySelector("#current-price").innerText = Math.floor(data.currentPrice * 100000000) / 100000000 + " BTC"
});

const end_at = moment(document.querySelector("#end-at").innerText);
setInterval(() => {
  if (moment().unix() >= end_at.unix()) {
    socket.close()
    document.querySelector("#status").innerText = "終了"
    document.querySelector("#bid-form").textContent = null
  }
}, 1000)
