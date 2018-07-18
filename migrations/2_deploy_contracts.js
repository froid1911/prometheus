var PrometheusToken = artifacts.require("./PrometheusToken.sol")
module.exports = function (deployer) {
  return deployer.deploy(PrometheusToken);
};
