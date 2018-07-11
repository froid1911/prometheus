const Web3 = require('web3');
const contract = require('truffle-contract');
const artifact = require('./build/contracts/PrometheusToken.json');
const privateKey = "0xA9CEA3ABABE2C5F61EB137B2518D886C156140409D685144C2A74D41A273ED56"

const prometheusToken = contract(artifact);
const web3 = new Web3('http://localhost:8545');
web3.eth.net.getId().then(id => {
    const contract = new web3.eth.Contract(prometheusToken.abi);
    contract.options.address = prometheusToken.networks[id].address;

    prometheusToken.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    contract.methods.addData(5).send({ from: account.address, gas: 3000000 }).then(console.log).catch(console.error);
})
