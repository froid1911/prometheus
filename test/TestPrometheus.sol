pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PrometheusToken.sol";

contract TestPrometheustoken {

  function testData() {
    PrometheusToken promi = PrometheusToken(DeployedAddresses.PrometheusToken());

    promi.addData(4,3,2,"1");
    //expected = [4,3,2,"1"];
    Assert.equal(promi.getDataLength(address(this)), 1, "The added data and expected data are equal");
  }

}
