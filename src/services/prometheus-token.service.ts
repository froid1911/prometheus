import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

const prometheusArtifact = require('../../build/contracts/PrometheusToken.json');
const tokenArtifact = require('../../build/contracts/MintableToken.json');
@Injectable()
export class PrometheusTokenService {

  web3;
  prometheus;
  token;
  accounts;

  constructor(private web3service: Web3Service) {

    // Set Web3 Instance
    this.web3 = this.web3service.web3;

    // Load Metamask Accounts
    this.web3service.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });

    // Instantiate Web3 Contract Objects with ABI and Contract Address from Contract Definition Files in Build Dir
    this.web3service.getNetworkId().subscribe((id) => {
      this.prometheus = new this.web3.eth.Contract(prometheusArtifact.abi);
      this.prometheus.options.address = prometheusArtifact.networks[id].address

      this.prometheus.methods.getTokenAddress().call().then((address: string) => {
        this.token = new this.web3.eth.Contract(tokenArtifact.abi);
        this.token.options.address = address; // Fetched from Etherscan
      })

    })

  }

  /**
   * Returns Promise with the Result
   * @param address the Address of the IoT Device
   */
  getDataSets(address: string): Promise<any> {
    return new Promise((resolve) => {
      const datasets = [];
      // First get DataSetLength as Call (read)
      this.prometheus.methods.getDataLength(address).call({ from: this.accounts[0] })
        .then(async (length) => {
          for (let i = 0; i < length.valueOf(); i++) {
            // Then interate over each Dataset and Fetch Result as Call (read)
            const data = await this.prometheus.methods.getDataSetOf(address, i).call();
            datasets.push(data);
          }

          // Resolve Promise
          resolve(datasets);
        })
    })
  }

  /**
   * Returns the Promise with the Promi Balance of IoT Device
   * @param address Address of the IoT Device
   */
  getBalance(address: string): Promise<number> {
    return new Promise((resolve) => {

      // Get Balance from Contract as Call (read)
      this.token.methods.balanceOf(address).call({ from: this.accounts[0] })
        .then(async (value) => {
          resolve(value.valueOf());
        })
    });
  }

}
