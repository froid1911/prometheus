import { Component, HostListener, NgZone } from '@angular/core';

import { Web3Service, PrometheusTokenService } from '../services/services'
import { canBeNumber } from '../util/validation';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;
  carAddress = '0xe1b01597924979d001d4d9f6dd784fbb9306e099';

  datasets: any[];

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private prometheusTokenService: PrometheusTokenService
  ) {
    this.onReady();
  }

  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
    }, err => alert(err))
  };

  setStatus = message => {
    this.status = message;
  };

  getDataSets = () => {
    this.datasets = [];
    this.setStatus('Fetching Datasets... (please wait)');

    // Fetch Balance of Account
    this.prometheusTokenService.getBalance(this.carAddress).then(result => {
      this.balance = result;
    })

    // Fetch Datasets
    this.prometheusTokenService.getDataSets(this.carAddress).then(results => {
      this.datasets = results;
      this.setStatus('');
    });
  }
}
