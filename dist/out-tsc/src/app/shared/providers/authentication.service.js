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
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SessionService } from './session.service';
var TOKEN_KEY = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    //tokenState = new BehaviorSubject(null);
    function AuthenticationService(storage, plt, sessionService) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.sessionService = sessionService;
        this.authenticationState = new BehaviorSubject(false);
        this.plt.ready().then(function () {
            _this.getToken();
        });
    }
    AuthenticationService.prototype.login = function (id) {
        var _this = this;
        return this.storage.set(TOKEN_KEY, id).then(function (res) {
            _this.sessionService.tokenState.next(id);
            _this.authenticationState.next(true);
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.isAuthenticate = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.getToken = function () {
        return this.storage.get(TOKEN_KEY).then(function (res) {
            if (res) {
                return res.toString();
            }
        });
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage, Platform, SessionService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map