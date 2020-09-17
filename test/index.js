const {Gateway, DefaultEventHandlerStrategies} = require('fabric-network');
const genWallet = require('./lib/genWallet');
const fs = require('fs');
async function main(){
    const wallet = await genWallet();
    const gateway = new Gateway();
    const ccp = JSON.parse(fs.readFileSync('./connection-org1.json','utf-8'));
    await gateway.connect(ccp , {wallet, identity: 'admin', discovery: { asLocalhost: true },
           eventHandlerOptions: { strategy: DefaultEventHandlerStrategies.NONE,
    } });
    const network = await gateway.getNetwork('myc');
    const contract = network.getContract('iovcases');
    let tx = await contract.createTransaction('init');
    let res = await tx.submit();
    console.log(res.toString());
    console.log('Transaction has been submitted');
    gateway.disconnect();
}
main()
