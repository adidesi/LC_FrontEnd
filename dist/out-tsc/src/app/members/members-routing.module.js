var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as Roles from '../shared/constant';
export var routes = [
    { path: Roles.token_importer, loadChildren: './user/user.module#UserPageModule' },
    // { path: Roles.token_exporter, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
    // { path: Roles.token_beneficiary, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
    { path: Roles.matias, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
    { path: Roles.alice, loadChildren: './user/user.module#UserPageModule' },
    { path: Roles.bob, loadChildren: './user/user.module#UserPageModule' },
    { path: Roles.ella, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
    { path: 'accountDetails', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
    { path: 'lcdetails/:letterId', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
    { path: 'createLC', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
];
var MemberRoutingModule = /** @class */ (function () {
    function MemberRoutingModule() {
        console.log('MEMROUT');
    }
    MemberRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        }),
        __metadata("design:paramtypes", [])
    ], MemberRoutingModule);
    return MemberRoutingModule;
}());
export { MemberRoutingModule };
//# sourceMappingURL=members-routing.module.js.map