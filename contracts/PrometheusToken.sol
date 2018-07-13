pragma solidity 0.4.24;
pragma experimental ABIEncoderV2; // neccessary for returning of Structs

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken  {

    struct DataSet {
        uint km;
        uint batteryLvl;
        string gps;
    }

    MintableToken token;
    mapping(address => DataSet[]) data;

    constructor() {
        token = new MintableToken(); // PrometheusToken Contract is Owner (msg.sender) of Token and is therefore allowed to mint tokens
    }

    function addDataSet(uint _km, uint _batteryLvl, string _gps) public returns (bool) {
        require(_km > 0 && _batteryLvl > 0); 
        data[msg.sender].push(DataSet(_km, _batteryLvl, _gps)); // fahrzeug schreibt daten auf blockchain
        token.mint(msg.sender, 1); // Prometheustoken creates 1 new Token for supplied data

        return true;
    }

    function getDataSetOf(address _user, uint id) public returns (uint, uint, string) {
        return (data[_user][id].km,data[_user][id].batteryLvl,data[_user][id].gps);
    }

    function getDataLength(address _user) public returns (uint) {
        return data[_user].length;
    }

}
