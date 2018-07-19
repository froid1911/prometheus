// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// https://rinkeby.etherscan.io/address/0x765497F9E22387231e7B093Fe0b544046f58c865
const privateKey = "0xe0c1e58a302e47581190b214ba3c3e566d6c884b649133566c09b43a67226778";
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// ganache-cli
// const privateKey = "0xe03010f58f7ae15a89f8b414522680543564a9c8174df5784d4169112cdcee76";
// const web3 = new Web3('http://localhost:8545'); // For Local Connect

// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address);
// Send and Signs Default Tx
const sendAndSignTx = async () => {

    // Get Network ID
    const id = await web3.eth.net.getId();

    // Intantiate Web3 Contract Object with Address from Truffle Contract Definition File
    const contract = new web3.eth.Contract(artifact.abi);
    contract.options.address = artifact.networks[id].address;

    const data = {
        timestamp: new Date().getTime(),
        gps: "52.101230;10.123132",
        tripduration: 1000,
        distance: 410,
        avgVehicleSpeed: 88,
        countPassengers: 2,
        totalAcceleration: 60,
        lateralAcceleration: 18,
        avgEngineLoad: 60,
        batteryLvl: 75,
        driverGender: false,
        birthYear: 50
    }
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
            process.exit(0);
        }).catch(((error) => {
            console.error(error);
            process.exit(1);
        }));

}

sendAndSignTx()


    // @TODO: Weitere Parameter
    //contract.methods.addData(5).send({ from: account.address, gas: 3000000 }).then(console.log).catch(console.error);
