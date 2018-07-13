var PrometheusToken = artifacts.require("./PrometheusToken.sol");

module.exports = function (deployer) {
  deployer.deploy(PrometheusToken);
};
