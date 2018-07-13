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
    console.log('test');

    this.web3service.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });

    this.web3service.getNetworkId().subscribe((id) => {
      console.log('test');
      this.prometheus = new this.web3.eth.Contract(prometheusArtifact.abi);
      this.prometheus.options.address = prometheusArtifact.networks[id].address

      this.token = new this.web3.eth.Contract(tokenArtifact.abi);
      this.token.options.address = '0xf06f1f338d810c01d33246e3f04d6981e353ad0d'; // Fetched from Etherscan
    })

  }

  getDataSets(address: string): Promise<any> {
    return new Promise((resolve) => {
      const datasets = [];
      // First get DataSetLength
      this.prometheus.methods.getDataLength(address).call({ from: this.accounts[0] })
        .then(async (length) => {
          for (let i = 0; i < length.valueOf(); i++) {
            const data = await this.prometheus.methods.getDataSetOf(address, i).call();
            console.log(data);
            datasets.push(data);
          }
          resolve(datasets);
        })
    })
  }

  getBalance(address: string): Promise<number> {
    return new Promise((resolve) => {
      this.token.methods.balanceOf(address).call({ from: this.accounts[0] })
        .then(async (value) => {
          console.log(value);
          resolve(value.valueOf());
        })
    });
  }

}
