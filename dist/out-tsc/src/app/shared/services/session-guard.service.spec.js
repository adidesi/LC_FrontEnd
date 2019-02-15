import { TestBed } from '@angular/core/testing';
import { SessionGuardService } from './session-guard.service';
describe('SessionGuardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SessionGuardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=session-guard.service.spec.js.map