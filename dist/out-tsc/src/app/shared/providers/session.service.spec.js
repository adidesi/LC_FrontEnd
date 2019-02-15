import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
describe('SessionService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SessionService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=session.service.spec.js.map