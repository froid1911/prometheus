// Web3.js Lib und Artifact einbinden
const Web3 = require('web3');
const artifact = require('./build/contracts/PrometheusToken.json');

// https://rinkeby.etherscan.io/address/0xe1b01597924979d001d4d9f6dd784fbb9306e099
const privateKey = "0xd48550009e7fa0930429cfc24d8ad8f46eceea2e7cf5931671a07d566bd825f1"

//const web3 = new Web3('http://localhost:8545'); // For Local Connect
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')); // Websocket to Infura Geth API

// Load Private Key and create Web3 JavaScript Account Object
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Send and Signs Default Tx
const sendAndSignTx = async () => {

    // Get Network ID
    const id = await web3.eth.net.getId();

    // Intantiate Web3 Contract Object with Address from Truffle Contract Definition File
    const contract = new web3.eth.Contract(artifact.abi);
    contract.options.address = artifact.networks[id].address;

    // Create Transaction
    const tx = {
        from: account.address,
        to: contract.options.address,
        data: contract.methods.addDataSet("23:30:00", 2018, 7, 17, "48.787847, 11.379489", 926, 10, 10, 89, 4, 1, 5, 7, 4, 10, 5, 3, "Male", 1990).encodeABI(), // Encodes the Method and Parameter into Hex
        gas: await contract.methods.addDataSet("23:30:00", 2018, 7, 17, "48.787847, 11.379489", 926, 10, 10, 89, 4, 1, 5, 7, 4, 10, 5, 3, "Male", 1990).estimateGas(), // Estimates Gas for Method Execution
    };

    // Sign Transaction with Web3 Account Object
    const signedTx = await account.signTransaction(tx);
    console.log("Signed Tx: " + signedTx.rawTransaction);

    // Send signed Transaction with Web3
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(receipt => {
        console.log(receipt);
        process.exit(0);
    })

}

sendAndSignTx()


    // @TODO: Weitere Parameter
    //contract.methods.addData(5).send({ from: account.address, gas: 3000000 }).then(console.log).catch(console.error);
