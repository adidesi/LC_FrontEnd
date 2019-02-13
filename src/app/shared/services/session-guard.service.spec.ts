import { TestBed } from '@angular/core/testing';

import { SessionGuardService } from './session-Guard.service';

describe('SessionGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionGuardService = TestBed.get(SessionGuardService);
    expect(service).toBeTruthy();
  });
});
