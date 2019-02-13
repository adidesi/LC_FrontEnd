import { TestBed } from '@angular/core/testing';

import { RestGuardService } from './rest-guard.service';

describe('RestGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestGuardService = TestBed.get(RestGuardService);
    expect(service).toBeTruthy();
  });
});
