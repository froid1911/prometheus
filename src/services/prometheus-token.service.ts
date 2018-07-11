import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

const prometheusArtifact = require('../../build/contracts/PrometheusToken.json');
@Injectable()
export class PrometheusTokenService {

  web3;
  prometheus;
  accounts;

  constructor(private web3service: Web3Service) {

    this.web3 = this.web3service.web3;
    this.prometheus = new this.web3.eth.Contract(prometheusArtifact.abi);
    this.web3.eth.net.getId().then((id) => {
      this.prometheus.options.address = prometheusArtifact.networks[id].address
    });

    this.web3service.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });

  }

  getData(address: string, id: number): Promise<any> {
    console.log(address, id);
    return this.prometheus.methods.getData(address, id).call({ from: this.accounts[0] }).then((data) => {
      return Promise.resolve(data);
    })
  }

}
