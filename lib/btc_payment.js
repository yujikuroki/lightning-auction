const btcpay = require('btcpay');
const BN = require('bn.js');
const url = process.env.BTCPAY_HOST;

marc = {marchant: process.env.BTCPAY_MARCHANT};
const priv = new BN(process.env.BTCPAY_PRIV, 16);
const kp = btcpay.crypto.load_keypair(priv);
const client = new btcpay.BTCPayClient(url, kp, marc);

const createInvoice = (price, cb) => {
  client.create_invoice({"price": price, "currency": "USD"}).then((invoice) => {
    client.get_invoice(invoice.id).then(invoice => {
      cb(invoice.url);
    });
  });
};

module.exports.createInvoice = createInvoice;
