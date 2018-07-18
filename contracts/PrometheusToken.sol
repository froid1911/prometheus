pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract PrometheusToken is MintableToken {

    struct DataSet {
        uint timestamp;
        string gps;
        uint distance;
        uint avgVehicleSpeed;
        uint tripDuration;
        uint countPassengers;
        uint totalAcceleration;
        uint avgEngineLoad;
        uint batteryLvl;
        bool driverGender;
        uint birthYear;
    }

    // Token token;
    mapping(address => DataSet[]) data;

    function addDataSet(
        uint _timestamp,
        string _gps,
        uint _distance,
        uint _avgVehicleSpeed,
        uint _tripDuration,
        uint _countPassengers,
        uint _totalAcceleration,
        uint _avgEngineLoad,
        uint _batteryLvl,
        bool _driverGender,
        uint _birthYear
    ) public returns (bool) {
        DataSet memory dataset = DataSet(
            _timestamp,
            _gps,
            _distance,
            _avgVehicleSpeed,
            _tripDuration,
            _countPassengers,
            _totalAcceleration,
            _avgEngineLoad,
            _batteryLvl,
            _driverGender,
            _birthYear
        );

        data[msg.sender].push(dataset); // fahrzeug schreibt daten auf blockchain
        mint(msg.sender, 1); // Prometheustoken creates 1 new Token for supplied data

        return true;
    }

    function getDataSetOf(address _user, uint id) public returns (
        uint,
        string,
        uint,
        uint,
        uint,
        uint,
        uint,
        uint,
        uint,
        bool,
        uint
    ) {
        
        DataSet memory dataset = data[_user][id];
        return (
            dataset.timestamp,
            dataset.gps,
            dataset.distance,
            dataset.avgVehicleSpeed,
            dataset.tripDuration,
            dataset.countPassengers,
            dataset.totalAcceleration,
            dataset.avgEngineLoad,
            dataset.batteryLvl,
            dataset.driverGender,
            dataset.birthYear
        );

        
    }

    function getDataLength(address _user) public returns (uint) {
        return data[_user].length;
    }

}
