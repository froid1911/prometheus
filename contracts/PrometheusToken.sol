pragma solidity 0.4.24;
pragma experimental ABIEncoderV2; // neccessary for returning of Structs

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken  {

    struct DataSet {
        string time;
        string gps;
        uint tripduration;
        uint km;
        uint vehicle_speed;
        uint acceleration;
        uint engine_load;
        uint batteryLvl;
        uint radio_volume;
        uint airconditioning_status;
        uint passenger_count;
        string driver_gender;
        uint birthyear;
    }

    MintableToken token;
    mapping(address => DataSet[]) data;

    constructor() {
        token = new MintableToken(); // PrometheusToken Contract is Owner (msg.sender) of Token and is therefore allowed to mint tokens
    }

    function addDataSet(string _time, string _gps, uint _tripduration, uint _km, uint _vehicle_speed, uint _acceleration,
        uint _engine_load, uint _batteryLvl, uint _radio_volume, uint _airconditioning_status,
        uint _passenger_count, string _driver_gender, uint _birthyear) public returns (bool) {
        require(_km > 0 && _batteryLvl > 0);
        data[msg.sender].push(DataSet(_time, _gps, _tripduration, _km, _distance, _vehicle_speed, _acceleration, _engine_load,
            _batteryLvl, _radio_volume, _airconditioning_status, _passenger_count, _driver_gender, _birthyear)); // fahrzeug schreibt daten auf blockchain
        token.mint(msg.sender, 1); // Prometheustoken creates 1 new Token for supplied data

        return true;
    }

    function getDataSetOf(address _user, uint id) public returns (string, string, uint, uint, uint, uint, uint,
        uint, uint, uint, uint, string, uint) {
        return (data[_user][id].time,data[_user][id].gps,data[_user][id].tripduration,
            data[_user][id].km,data[_user][id].vehicle_speed,data[_user][id].acceleration,
            data[_user][id].engine_load,data[_user][id].batteryLvl,data[_user][id].radio_volume,
            data[_user][id].airconditioning_status,data[_user][id].passenger_count,data[_user][id].driver_gender,data[_user][id].birthyear);
    }

    function getDataLength(address _user) public returns (uint) {
        return data[_user].length;
    }

    function getTokenAddress() public view returns (address) {
        return address(token);
    }

}
