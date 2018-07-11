import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { MetaCoinService, Web3Service } from '../services/services'
import { PrometheusTokenService } from 'services/prometheus-token.service';

const SERVICES = [
  MetaCoinService,
  Web3Service,
  PrometheusTokenService
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
