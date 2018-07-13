var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var PrometheusToken = artifacts.require("./PrometheusToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PrometheusToken);
};
