/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendAPIService } from './backendAPI.service';

describe('Service: BackendAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendAPIService]
    });
  });

  it('should ...', inject([BackendAPIService], (service: BackendAPIService) => {
    expect(service).toBeTruthy();
  }));
});
