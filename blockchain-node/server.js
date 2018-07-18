const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// https://rinkeby.etherscan.io/address/0xe1b01597924979d001d4d9f6dd784fbb9306e099
const privateKey = "0xd48550009e7fa0930429cfc24d8ad8f46eceea2e7cf5931671a07d566bd825f1"

//const web3 = new Web3('http://localhost:8545'); // For Local Connect
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// TODO Parameter eintragen
const sendAndSignTx = async (parameters) => {

    /*this is the data we want to transfer. However smart contract seems to be
    broken. Hence, this transData is not used currently */
    var transData = [
      parameters["tripduration"],
      parameters["km"],
      parameters["speed"],
      parameters["engine_load"],
      parameters["battery"],
      parameters["gps"]
    ];

    console.log("transData " + transData);
    // Get Network ID
    const id = await web3.eth.net.getId();

    // Intantiate Web3 Contract Object with Address from Truffle Contract Definition File
    const contract = new web3.eth.Contract(artifact.abi);
    contract.options.address = artifact.networks[id].address;

    // Create Transaction
    const tx = {
        from: account.address,
        to: contract.options.address,
        data: contract.methods.addDataSet(926, 10, 89, 4, 5, 4878784711379489).encodeABI(), // Encodes the Method and Parameter into Hex
        gas: await contract.methods.addDataSet(926, 10, 89, 4, 5, 4878784711379489).estimateGas(), // Estimates Gas for Method Execution
    };

    // Sign Transaction with Web3 Account Object
    // const signedTx = await account.signTransaction(tx);
    // console.log("Signed Tx: " + signedTx.rawTransaction);

    // Send signed Transaction with Web3
    // web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(receipt => {
    //     console.log(receipt);
    //     process.exit(0);
    // })

}

app.get('/', (req, res) => res.send('transaction works!'));

app.get('/test', (req, res) => res.send('transaction!'));

// POST API for transaction
app.post('/transaction', (req, res) => {

  // TODO aus POST Request vom Frontend auslesen
  const parameters = req.body
  console.log("Typeof req.body" + typeof(req.body))
  //var json = '{"result":true,"count":1}',
  //parObj = JSON.parse(parameters);
  console.log("----------------Request-payload------------------------")
  console.log(parameters);
  console.log("----------------------------------------")

  for(var k in parameters) {
    console.log(k + " = " + parameters[k])
  }

  // TODO parameter übergeben
  sendAndSignTx(parameters);

  res.send('success!')
});

app.listen(3000, () => console.log('blockchain-node running on 3000...'))
