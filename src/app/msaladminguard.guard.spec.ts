import { TestBed } from '@angular/core/testing';

import { MsaladminguardGuard } from './msaladminguard.guard';

describe('MsaladminguardGuard', () => {
  let guard: MsaladminguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MsaladminguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
