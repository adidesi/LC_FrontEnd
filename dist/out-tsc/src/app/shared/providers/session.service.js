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
var SessionService = /** @class */ (function () {
    function SessionService(storage) {
        this.storage = storage;
        this.tokenState = new BehaviorSubject(null);
        this.CUSTOMER_KEY = "customer";
        this.BANK_KEY = "bank";
    }
    SessionService.prototype.storeUser = function (customer) {
        return this.storage.set(this.CUSTOMER_KEY, customer);
    };
    SessionService.prototype.loadUser = function () {
        return this.storage.get(this.CUSTOMER_KEY);
    };
    SessionService.prototype.storeBank = function (bank) {
        return this.storage.set(this.BANK_KEY, bank);
    };
    SessionService.prototype.loadBank = function () {
        return this.storage.get(this.BANK_KEY);
    };
    SessionService.prototype.invalidateSession = function () {
        this.storage.remove(this.CUSTOMER_KEY);
        this.storage.remove(this.BANK_KEY);
        // this.tokenState.next('');
    };
    SessionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage])
    ], SessionService);
    return SessionService;
}());
export { SessionService };
//# sourceMappingURL=session.service.js.map