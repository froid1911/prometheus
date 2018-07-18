// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// https://rinkeby.etherscan.io/address/0xe1b01597924979d001d4d9f6dd784fbb9306e099
const privateKey = "0xd48550009e7fa0930429cfc24d8ad8f46eceea2e7cf5931671a07d566bd825f1";
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// ganache-cli 
// const privateKey = "0xe03010f58f7ae15a89f8b414522680543564a9c8174df5784d4169112cdcee76";
// const web3 = new Web3('http://localhost:8545'); // For Local Connect


// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Send and Signs Default Tx
const sendAndSignTx = async () => {

    // Get Network ID
    const id = await web3.eth.net.getId();

    // Intantiate Web3 Contract Object with Address from Truffle Contract Definition File
    const contract = new web3.eth.Contract(artifact.abi);
    contract.options.address = artifact.networks[id].address;

    contract.methods.getDataSetOf("0xe1b01597924979d001d4d9f6dd784fbb9306e099", 0).call().then(console.log).catch(console.error)
    const data = {
        timestamp: new Date().getTime(),
        gps: "52.101230;10.123132",
        tripduration: 10,
        distance: 10,
        avgVehicleSpeed: 10,
        totalAcceleration: 10,
        lateralAcceleration: 10,
        avgEngineLoad: 10,
        batteryLvl: 10,
        driverGender: true,
        birthYear: 1976,
        countPassengers: 4
    }
    // Create Transaction
    const tx = {
        from: account.address,
        to: contract.options.address,
        data: contract.methods.addDataSet(926, 10, 89, 4, 5, 4878784711379489).encodeABI(), // Encodes the Method and Parameter into Hex
        gas: await contract.methods.addDataSet(926, 10, 89, 4, 5, 4878784711379489).estimateGas(), // Estimates Gas for Method Execution
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
