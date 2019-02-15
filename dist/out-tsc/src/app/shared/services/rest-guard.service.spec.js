import { TestBed } from '@angular/core/testing';
import { RestGuardService } from './rest-guard.service';
describe('RestGuardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RestGuardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=rest-guard.service.spec.js.map