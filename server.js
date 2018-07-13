// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// @TODO: Eigenen Private Key hinterlegen und vorher mit Ether befüllen
const privateKey = "0xd48550009e7fa0930429cfc24d8ad8f46eceea2e7cf5931671a07d566bd825f1"

//const web3 = new Web3('http://localhost:8545'); // For Local Connect
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const sendAndSignTx = async () => {
    const id = await web3.eth.net.getId();
    const txCount = await web3.eth.getTransactionCount(account.address);
    const contract = new web3.eth.Contract(artifact.abi);
    contract.options.address = artifact.networks[id].address;

    const tx = {
        from: account.address,
        to: contract.options.address,
        data: contract.methods.addDataSet(5, 4, "50.1;14.10").encodeABI(), // Encodes the Method and Parameter into Hex 
        gas: 3000000,
    };

    account.signTransaction(tx).then((signedTx) => {
        console.log(signedTx);
        return web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', console.log).on('error', console.error);;
    })

}

sendAndSignTx();


    // @TODO: Weitere Parameter
    //contract.methods.addData(5).send({ from: account.address, gas: 3000000 }).then(console.log).catch(console.error);


