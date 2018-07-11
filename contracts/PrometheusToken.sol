pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract PrometheusToken is StandardToken {

    struct Data {
        uint km;
    }

    mapping(address => Data[]) data;

    function addData(uint _km) public {
        data[msg.sender].push(Data({km: _km}));
    }

    function getData(address _user, uint id) public returns (Data) {
        return data[_user][id];
    }

    function getDataLength(address _user) private returns (uint) {
        return 1;
    }
}