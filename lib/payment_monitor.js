const btcpay = require('btcpay');
const BN = require('bn.js');
const models = require('../models');

const paymentMonitor = () => {
    // dotenvがうまく動かなくなり、べた書き
    var btcpay_url = 'host'
    var marc = 'matchant';
    var priv = new BN('priv', 16);
    var kp = btcpay.crypto.load_keypair(priv);
    var client = new btcpay.BTCPayClient(btcpay_url, kp, marc); 
    // var invoices = [{id: 'FCKEdzEdnFSQbNXxr4cCQJ', amt: 0.01}, {id: 'Qy5o31Hm8j6ENbqUwSCV1M', amt: 0.00015284}]
        
    var maxBit = 0;
    models.invoice.findAll({ where: { status: 1} }).then(function(invoices){
        if (invoices.length > 0) {
            maxBit = invoices[0].amount            
        }
    });
    setInterval(function(){
        models.invoice.findAll({ where: {status: 0} }).then(function(invoices){
            for ( var i = 0; i < invoices.length; i++ ) {
                var model_id = invoices[i].dataValues.id;
                var iv_id = invoices[i].dataValues.invoiceid;
                client.get_invoice(iv_id).then(function(iv){
                    if (iv.status == 'complete') {
                        if (iv.price > maxBit) {
                            maxBit = iv.price;
                            // 最高値入札レコードを返金待ちにする
                            models.invoice.findAll({ where: { status: 1} }).then(function(invoices){
                                if (invoices.length > 0) {
                                    models.invoice.update(
                                        {status: 2},
                                        // update settled time
                                        {where: {id: invoices[0].dataValues.id} }
                                    );
                                }
                            }).then( () => {
                                // レコードを最高値入札にする
                                models.invoice.update(
                                    {status: 1},
                                    // update settled time
                                    {where: {id: model_id} }
                                );
                            });
                        }　else {
                            // レコードを返金待ちする
                            models.invoice.update(
                                {status: 2},
                                {where: {id: model_id} }
                            );
                        }
                    } else if (iv.status == 'expired') {
                        // レコードを消す
                        models.invoice.update(
                            {status: 9},
                            {where: {id: model_id} }
                        );
                    }
                });
            }
        });
    }, 5000);
};

module.exports.paymentMonitor = paymentMonitor;
