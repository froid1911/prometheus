import { TestBed, inject } from '@angular/core/testing';

import { PrometheusTokenService } from './prometheus-token.service';

describe('PrometheusTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrometheusTokenService]
    });
  });

  it('should be created', inject([PrometheusTokenService], (service: PrometheusTokenService) => {
    expect(service).toBeTruthy();
  }));
});
