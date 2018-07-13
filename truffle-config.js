// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var PrivateKeyProvider = require("truffle-privatekey-provider");

// @TODO: Eigenen Private Key hinterlegen und vorher mit Ether befüllen
const privateKey = "d48550009e7fa0930429cfc24d8ad8f46eceea2e7cf5931671a07d566bd825f1"

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new PrivateKeyProvider(privateKey, "https://rinkeby.infura.io/fYOBVcLNxyAb5LtIAct1")
      },
      network_id: 4
    }
  }
}
