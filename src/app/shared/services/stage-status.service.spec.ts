import { TestBed } from '@angular/core/testing';

import { StageStatusService } from './stage-status.service';

describe('StageStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StageStatusService = TestBed.get(StageStatusService);
    expect(service).toBeTruthy();
  });
});
