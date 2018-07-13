pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PrometheusToken.sol";

contract TestPrometheusToken {

    function testData() public  {
        // Get Token Instance
        PrometheusToken promi = PrometheusToken(DeployedAddresses.PrometheusToken());

        // Add DataSet
        promi.addDataSet(5, 4, "gps");
        
        // Get DataSet
        (uint km, uint batteryLvl, string memory gps) = promi.getDataSetOf(address(this), 0);

        // Check Values
        Assert.equal(km, 5, "expected KM to be 5");
        Assert.equal(gps, "gps", "expected GPS to be 'gps'");
        Assert.equal(batteryLvl, 4, "expected BatteryLevel to be 4");
    }

}
