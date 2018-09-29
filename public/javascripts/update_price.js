const socket = io.connect("http://localhost:8000");
socket.on('broadcast', (data) => {
  document.querySelector("#current-price").innerText = Math.floor(data.currentPrice * 100000000) / 100000000 + " BTC"
});
