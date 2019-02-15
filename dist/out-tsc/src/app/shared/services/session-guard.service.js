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
import { SessionService } from '../providers/session.service';
var SessionGuardService = /** @class */ (function () {
    function SessionGuardService(sessionService) {
        this.sessionService = sessionService;
    }
    SessionGuardService.prototype.invalidateSession = function () {
        this.sessionService.invalidateSession();
    };
    SessionGuardService.prototype.loadUser = function () {
        return this.sessionService.loadUser();
    };
    SessionGuardService.prototype.storeUser = function (customer) {
        return this.sessionService.storeUser(customer);
    };
    SessionGuardService.prototype.storeBank = function (bank) {
        return this.sessionService.storeBank(bank);
    };
    SessionGuardService.prototype.loadBank = function () {
        return this.sessionService.loadUser();
    };
    SessionGuardService.prototype.loadToken = function () {
        return this.sessionService.tokenState;
    };
    SessionGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [SessionService])
    ], SessionGuardService);
    return SessionGuardService;
}());
export { SessionGuardService };
//# sourceMappingURL=session-guard.service.js.map