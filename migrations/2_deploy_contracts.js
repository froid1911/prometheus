var Token = artifacts.require("./Token.sol");
var PrometheusToken = artifacts.require("./PrometheusToken.sol")
var MintableToken = artifacts.require('openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol');
module.exports = function (deployer) {
  deployer.deploy(MintableToken).then((address) => {
    deployer.deploy(PrometheusToken, MintableToken.address)
  });
};
