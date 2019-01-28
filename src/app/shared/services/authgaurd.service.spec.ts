import { TestBed } from '@angular/core/testing';

import { AuthGaurdService } from './authgaurd.service';

describe('AuthgaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGaurdService = TestBed.get(AuthGaurdService);
    expect(service).toBeTruthy();
  });
});
