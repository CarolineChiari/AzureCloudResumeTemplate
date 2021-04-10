/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminAPIService } from './adminAPI.service';

describe('Service: AdminAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAPIService]
    });
  });

  it('should ...', inject([AdminAPIService], (service: AdminAPIService) => {
    expect(service).toBeTruthy();
  }));
});
