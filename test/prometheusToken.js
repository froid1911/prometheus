var PrometheusToken = artifacts.require("./PrometheusToken.sol");

let promiInstance;

contract('PrometheusToken', (accounts) => {

    // Some dummy data
    beforeEach(() => {
        return PrometheusToken.deployed().then((instance) => {
            promiInstance = instance;
            promiInstance.addDataSet(5, 4, "gps1", { from: accounts[0] });
            promiInstance.addDataSet(6, 5, "gps2", { from: accounts[1] });
            promiInstance.addDataSet(7, 6, "gps3", { from: accounts[2] });

            promiInstance.addDataSet(5, 4, "gps1", { from: accounts[1] });
            promiInstance.addDataSet(6, 5, "gps2", { from: accounts[2] });
            promiInstance.addDataSet(7, 6, "gps3", { from: accounts[0] });

            promiInstance.addDataSet(5, 4, "gps1", { from: accounts[2] });
            promiInstance.addDataSet(6, 5, "gps2", { from: accounts[0] });
            promiInstance.addDataSet(7, 6, "gps3", { from: accounts[1] });
        });
    })

    it("should be possible to get DataLength of specific Account", () => {
        promiInstance.getDataLength.call(accounts[0]).then((length) => {
            assert.equal(3, length.valueOf(), 'km not set properly'); // km
        });
    });

    it("should be possible to get DataSet with specific Index and Account", () => {
        promiInstance.getDataSetOf.call(accounts[1], 1).then((dataset) => {
            assert.equal(5, dataset[0].valueOf(), 'km not set properly'); // km
            assert.equal(4, dataset[1].valueOf(), 'batteryLvl not set properly'); // batteryLvl
            assert.equal("gps1", dataset[2], 'gps not set proper'); // batteryLvl
        });
    });

});