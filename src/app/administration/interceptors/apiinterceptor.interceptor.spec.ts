import { TestBed } from '@angular/core/testing';

import { APIinterceptorInterceptor } from './apiinterceptor.interceptor';

describe('APIinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      APIinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: APIinterceptorInterceptor = TestBed.inject(APIinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
