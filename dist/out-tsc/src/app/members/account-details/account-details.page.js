var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, ElementRef } from '@angular/core';
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { AuthGuardService } from '../../shared/services/authGuard.service';
var AccountDetailsPage = /** @class */ (function () {
    function AccountDetailsPage(renderer, element, authGuardService, sessionService, restApi) {
        this.renderer = renderer;
        this.element = element;
        this.authGuardService = authGuardService;
        this.sessionService = sessionService;
        this.restApi = restApi;
    }
    AccountDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.allowEdit = true;
        this.sessionService.loadUser().then(function (resCust) {
            console.log('resCust', resCust['bankObj']['IBAN']);
            _this.customer = new Customer(resCust);
            //this.customer.setBankObj(resBank);
        });
    };
    AccountDetailsPage.prototype.toggleEditOrSave = function () {
        this.allowEdit = (this.allowEdit) ? false : true;
    };
    AccountDetailsPage.prototype.logout = function () {
        this.authGuardService.logout();
    };
    AccountDetailsPage = __decorate([
        Component({
            selector: 'app-account-details',
            templateUrl: './account-details.page.html',
            styleUrls: ['./account-details.page.scss'],
        }),
        __metadata("design:paramtypes", [Renderer, ElementRef,
            AuthGuardService,
            SessionService,
            RestApiService])
    ], AccountDetailsPage);
    return AccountDetailsPage;
}());
export { AccountDetailsPage };
//# sourceMappingURL=account-details.page.js.map