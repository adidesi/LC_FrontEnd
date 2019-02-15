var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { SessionGuardService } from '../../shared/services/session-guard.service';
import { CreateButtonComponent } from '../../create-button/create-button.component';
import { ProcessItem } from '../../create-button/process-item';
import { RestGuardService } from '../../shared/services/rest-guard.service';
import { switchMap } from 'rxjs/operators';
var CustomerPage = /** @class */ (function () {
    function CustomerPage(authGuardService, sessionGuardService, restGuardService, router, navCtrl, resolver) {
        this.authGuardService = authGuardService;
        this.sessionGuardService = sessionGuardService;
        this.restGuardService = restGuardService;
        this.router = router;
        this.navCtrl = navCtrl;
        this.resolver = resolver;
        this.LCs = [];
    }
    CustomerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authGuardService.getToken().then(function (res) {
            _this.subscription = _this.sessionGuardService.loadToken().pipe(switchMap(function (tokenVal) { return _this.restGuardService.getCustomerWithBank(tokenVal); })).subscribe(function (resCust) {
                _this.customer = resCust;
                _this.sessionGuardService.storeUser(_this.customer);
                _this.sessionGuardService.storeBank(_this.customer.getBankObj());
                _this.bank_name = _this.customer.getBankObj().getName();
                var step = _this.getNameForButton();
                var factory = _this.resolver.resolveComponentFactory(step.component);
                var componentRef = _this.container.createComponent(factory);
                componentRef.instance.data = step.name;
                return resCust;
            });
        });
        this.restGuardService.getLCs().subscribe(function (resLCs) {
            _this.LCs = resLCs;
        });
    };
    CustomerPage.prototype.logout = function () {
        this.LCs = [];
        this.authGuardService.logout();
    };
    CustomerPage.prototype.showAccountDetails = function () {
        this.router.navigate(['members', 'accountDetails']);
    };
    CustomerPage.prototype.getLCDetails = function (letterId) {
        this.navCtrl.navigateForward(['members', 'lcdetails', letterId]);
    };
    CustomerPage.prototype.createLC = function () {
        this.router.navigate(['members', 'createLC']);
    };
    CustomerPage.prototype.getNameForButton = function () {
        var comp = this.resolveComponentsName(this.bank_name);
        var newItem = new ProcessItem(comp, this.bank_name);
        //console.log("bank in cust",this.bank_name);
        return newItem;
    };
    CustomerPage.prototype.resolveComponentsName = function (name) {
        if (name == 'Bank of Dinero')
            return CreateButtonComponent;
    };
    CustomerPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        ViewChild('processContainer', { read: ViewContainerRef }),
        __metadata("design:type", Object)
    ], CustomerPage.prototype, "container", void 0);
    CustomerPage = __decorate([
        Component({
            selector: 'app-customer',
            templateUrl: './user.page.html',
            styleUrls: ['./user.page.scss'],
        }),
        __metadata("design:paramtypes", [AuthGuardService, SessionGuardService,
            RestGuardService, Router, NavController,
            ComponentFactoryResolver])
    ], CustomerPage);
    return CustomerPage;
}());
export { CustomerPage };
//# sourceMappingURL=user.page.js.map