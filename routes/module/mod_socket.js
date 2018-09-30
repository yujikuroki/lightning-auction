var http = require('http');
var { getMaxInvoice } = require('../../lib/invoices')

var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('server connected');
});
var io = require('socket.io').listen(server);

server.listen(8000);

io.sockets.on('connection', function (socket) {
  console.log('connected');
});

setInterval(() => {
  const maxInvoice = getMaxInvoice()
  if (maxInvoice == null) {
    io.emit('broadcast', { currentPrice: 0, currentBidder: null })
  } else {
    io.emit('broadcast', { currentPrice: maxInvoice.price, currentBidder: "hira" })
  }
}, 1000);

