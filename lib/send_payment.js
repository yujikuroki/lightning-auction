const grpc = require('grpc');
const fs = require("fs"); 
const lnrpc = grpc.load('rpc.proto').lnrpc; //original file
const macaroon = "0201036c6e6402bb01030a102f6099ba56669585de4e1d3c17fa440a1201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a0570656572731204726561641205777269746500000620e500e330d51fe3689ce61c17cabfc9461c7e92410cf687643bc4a2151239514b";

const sslCreds = grpc.credentials.createSsl();
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
    var metadata = new grpc.Metadata();

    metadata.add('macaroon', macaroon);
    callback(null, metadata);
});

const creds = grpc.credentials.combineChannelCredentials(sslCreds , macaroonCreds);

const sendPayment = (payReq) => {
    var request = { payment_request: payReq, }
    console.log(request)

    var lightning = new lnrpc.Lightning('btcpaytest4.indiesquare.net:443', creds);
    call = lightning.sendPaymentSync(request, function(err, response) {
        if(err != undefined){ 
            console.error('error:' + err);
        }
        console.log(': ', response);
    })
}
module.exports.sendPayment = sendPayment;
