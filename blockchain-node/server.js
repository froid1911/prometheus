const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// https://rinkeby.etherscan.io/address/0x765497F9E22387231e7B093Fe0b544046f58c865
const privateKey = "0xe0c1e58a302e47581190b214ba3c3e566d6c884b649133566c09b43a67226778";

//const web3 = new Web3('http://localhost:8545'); // For Local Connect
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);


const sendAndSignTx = async (data) => {

    return new Promise(async (resolve, reject) => {
        // Get Network ID
        const id = await web3.eth.net.getId();

        // Intantiate Web3 Contract Object with Address from Truffle Contract Definition File
        const contract = new web3.eth.Contract(artifact.abi);
        contract.options.address = artifact.networks[id].address;

        // Create Transaction
        const tx = {
            from: account.address,
            to: contract.options.address,
            data: contract.methods.addDataSet(
                data.timestamp,
                data.gps,
                data.tripduration,
                data.distance,
                data.avgVehicleSpeed,
                data.countPassengers,
                data.totalAcceleration,
                data.avgEngineLoad,
                data.batteryLvl,
                data.driverGender,
                data.birthYear
            ).encodeABI(), // Encodes the Method and Parameter into Hex
            gas: 800000 // Estimates Gas for Method Execution
        };

        // Sign Transaction with Web3 Account Object
        const signedTx = await account.signTransaction(tx);
        console.log(signedTx);

        // Send signed Transaction with Web3
        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .then(receipt => {
                console.log(receipt);
                resolve(receipt);
            }).catch(((error) => {
                console.log(error);
                reject(error);
            }));

    })

}

// POST API for transaction
app.post('/transaction', (req, res) => {

    const parameters = req.body
    console.log("----------------received Request-payload------------------------")
    console.log(parameters);
    console.log("----------------------------------------")

    for (var k in parameters) {
        console.log(k + " = " + parameters[k])
    }

    // initiate transaction
    sendAndSignTx(parameters).then((data) => {
        res.send(data)
    });


});

app.listen(3000, () => console.log('blockchain-node running on 3000...'))
