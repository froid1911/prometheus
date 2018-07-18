pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken  {

    struct DataSet {
        uint tripduration;
        uint km;
        uint vehicle_speed;
        uint engine_load;
        uint batteryLvl;
        string gps;
    }

    MintableToken token;
    mapping(address => DataSet[]) data;

    constructor(address token) {
        token = MintableToken(token); // PrometheusToken Contract is Owner (msg.sender) of Token and is therefore allowed to mint tokens
    }

    function addDataSet(
        uint _tripduration, 
        uint _km, 
        uint _vehicle_speed,
        uint _engine_load, 
        uint _batteryLvl, 
        string _gps
    ) public returns (bool) {
        data[msg.sender].push(DataSet(
            _tripduration, 
            _km, 
            _vehicle_speed, 
            _engine_load,
            _batteryLvl,
            _gps
        )); // fahrzeug schreibt daten auf blockchain
       
        token.mint(msg.sender, 1); // Prometheustoken creates 1 new Token for supplied data

        return true;
    }

    function getDataSetOf(address _user, uint id) public returns (uint, uint, uint, uint, uint, string) {
        return (
            data[_user][id].tripduration,
            data[_user][id].km,
            data[_user][id].vehicle_speed,
            data[_user][id].engine_load,
            data[_user][id].batteryLvl,
            data[_user][id].gps
        );
    }

    function getDataLength(address _user) public returns (uint) {
        return data[_user].length;
    }

    function getTokenAddress() public view returns (address) {
        return address(token);
    }

}
