import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './authGuard.service';
describe('AuthGuardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AuthGuardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=authguard.service.spec.js.map