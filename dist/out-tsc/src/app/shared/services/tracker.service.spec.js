import { TestBed } from '@angular/core/testing';
import { TrackerService } from './tracker.service';
describe('TrackerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TrackerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=tracker.service.spec.js.map