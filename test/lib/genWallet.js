const { Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
async function genWallet(){
    const wallet = await Wallets.newInMemoryWallet();
    const keypath = path.resolve(__dirname,'..','..','msp','Org1MSP','keystore','priv_sk');
    const certpath = path.resolve(__dirname,'..','..','msp','Org1MSP','signcerts','Admin@org1-cert.pem');
    const key = fs.readFileSync(keypath).toString();
    const cert = fs.readFileSync(certpath).toString();
    const x509Identity = {
        credentials: {
            certificate: cert,
            privateKey: key.replace(/\n/g, '\r\n'),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
    await wallet.put('admin', x509Identity);
    return wallet
}
//genWallet()
module.exports =  genWallet ;
