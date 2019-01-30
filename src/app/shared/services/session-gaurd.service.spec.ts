import { TestBed } from '@angular/core/testing';

import { SessionGaurdService } from './session-gaurd.service';

describe('SessionGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionGaurdService = TestBed.get(SessionGaurdService);
    expect(service).toBeTruthy();
  });
});
