pragma solidity 0.4.24;
import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken is StandardToken, MintableToken {

    mapping(address => uint[]) data;

    function addData(uint _km) public returns (bool) {
        data[msg.sender].push(_km); // fahrzeug schreibt daten auf blockchain
        mint(msg.sender, 1); // sendet einen token an ID (Fahrzeug)

        return true;
    }

    function getData(address _user, uint id) public returns (uint[]) {
        return data[_user];
    }

    function getDataLength(address _user) public returns (uint) {
        return data[msg.sender].length;
    }



}
