var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../providers/authentication.service';
import { SessionGuardService } from './session-guard.service';
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, sessionGuardService) {
        this.authService = authService;
        this.sessionGuardService = sessionGuardService;
    }
    AuthGuardService.prototype.login = function (param) {
        return this.authService.login(param);
    };
    AuthGuardService.prototype.canActivate = function () {
        return this.authService.isAuthenticate();
    };
    AuthGuardService.prototype.getToken = function () {
        return this.authService.getToken();
    };
    AuthGuardService.prototype.logout = function () {
        this.authService.logout();
        this.sessionGuardService.invalidateSession();
    };
    AuthGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AuthenticationService, SessionGuardService])
    ], AuthGuardService);
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=authGuard.service.js.map