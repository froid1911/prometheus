pragma solidity 0.4.24;
import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken is StandardToken, MintableToken {

    struct Data {
        uint km;
        uint speed;
        uint batteryLvl;
        string gps;
    }

    mapping(address => Data[]) data;

    function addData(uint _km, uint _speed, uint _batteryLvl, string _gps) public {
        data[msg.sender].push(Data({km: _km, speed: _speed, batteryLvl: _batteryLvl, gps: _gps})); // fahrzeug schreibt daten auf blockchain
        mint(msg.sender, 1); // sendet einen token an ID (Fahrzeug)
    }

    function getData(address _user, uint id) public returns (uint, uint, uint, string) {
        return (data[_user][id-1].km, data[_user][id-1].speed, data[_user][id-1].batteryLvl, data[_user][id-1].gps);
    }

    function getDataLength(address _user) public returns (uint) {
        return data[msg.sender].length;
    }



}
