pragma solidity 0.4.24;
pragma experimental ABIEncoderV2; // neccessary for returning of Structs

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken  {

    struct DataSet {
        string time;
        uint year;
        uint month;
        uint day;
        string gps;
        uint tripduration;
        uint km;
        uint distance;
        uint avg_vehicle_speed;
        uint total_acceleration;
        uint lateral_acceleration;
        uint avg_engine_load;
        uint avg_window_opening;
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

    function addDataSet(string _time, uint _year, uint _month, uint _day, string _gps, uint _tripduration,
        uint _km, uint _distance, uint _avg_vehicle_speed, uint _total_acceleration, uint _lateral_acceleration,
        uint _avg_engine_load, uint _avg_window_opening, uint _batteryLvl, uint _radio_volume, uint _airconditioning_status,
        uint _passenger_count, string _driver_gender, uint _birthyear) public returns (bool) {
        require(_km > 0 && _batteryLvl > 0);
        data[msg.sender].push(DataSet(_time, _year, _month, _day, _gps, _tripduration, _km, _distance,
            _avg_vehicle_speed, _total_acceleration, _lateral_acceleration, _avg_engine_load, _avg_window_opening,
            _batteryLvl, _radio_volume, _airconditioning_status, _passenger_count, _driver_gender, _birthyear)); // fahrzeug schreibt daten auf blockchain
        token.mint(msg.sender, 1); // Prometheustoken creates 1 new Token for supplied data

        return true;
    }

    function getDataSetOf(address _user, uint id) public returns (string, uint, uint, uint, string, uint, uint, uint,
        uint, uint, uint, uint, uint, uint, uint, uint, uint, string, uint) {
        return (data[_user][id].time,data[_user][id].year,data[_user][id].month,data[_user][id].day,data[_user][id].gps,data[_user][id].tripduration,
            data[_user][id].km,data[_user][id].distance,data[_user][id].avg_vehicle_speed,data[_user][id].total_acceleration,data[_user][id].lateral_acceleration,
            data[_user][id].avg_engine_load,data[_user][id].avg_window_opening,data[_user][id].batteryLvl,data[_user][id].radio_volume,
            data[_user][id].airconditioning_status,data[_user][id].passenger_count,data[_user][id].driver_gender,data[_user][id].birthyear);
    }

    function getDataLength(address _user) public returns (uint) {
        return data[_user].length;
    }

    function getTokenAddress() public view returns (address) {
        return address(token);
    }

}
