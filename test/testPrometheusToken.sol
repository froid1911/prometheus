pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PrometheusToken.sol";

contract TestPrometheusToken {

  function testData() {
    PrometheusToken promi = PrometheusToken(DeployedAddresses.PrometheusToken());
    bool resp;
    resp = promi.addData(4);
    Assert.equal(resp, true, "The added data and expected data are equal");
  }

}
