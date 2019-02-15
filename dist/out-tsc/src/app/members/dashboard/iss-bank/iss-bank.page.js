var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { AuthGuardService } from '../../../shared/services/authGuard.service';
import { SessionGuardService } from '../../../shared/services/session-guard.service';
import { switchMap } from 'rxjs/operators';
import { RestGuardService } from '../../../shared/services/rest-guard.service';
var IssBankPage = /** @class */ (function () {
    function IssBankPage(sessionGuardService, restGuardService, authGuardService, toastController, router, navCtrl) {
        this.sessionGuardService = sessionGuardService;
        this.restGuardService = restGuardService;
        this.authGuardService = authGuardService;
        this.toastController = toastController;
        this.router = router;
        this.navCtrl = navCtrl;
        this.LCs = [];
        this.items = [];
    }
    IssBankPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authGuardService.getToken().then(function (res) {
            _this.subscription = _this.sessionGuardService.loadToken().pipe(switchMap(function (tokenVal) { return _this.restGuardService.getBankEmployee(tokenVal); })).subscribe(function (resBankEmp) {
                _this.bankEmployee = resBankEmp;
                _this.sessionGuardService.storeUser(_this.bankEmployee);
                _this.sessionGuardService.storeBank(_this.bankEmployee.getBankObj());
                return resBankEmp;
            });
        });
        this.restGuardService.getLCs().subscribe(function (resLCs) {
            _this.LCs = resLCs;
        });
    };
    IssBankPage.prototype.logout = function () {
        this.authGuardService.logout();
    };
    IssBankPage.prototype.showTransactionToast = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Transaction Success. Id :' + data,
                            showCloseButton: false,
                            position: 'bottom',
                            duration: 5000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    IssBankPage.prototype.getLCDetails = function (letterId) {
        this.navCtrl.navigateForward(['members', 'lcdetails', letterId]);
    };
    IssBankPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    IssBankPage = __decorate([
        Component({
            selector: 'app-iss-bank',
            templateUrl: './iss-bank.page.html',
            styleUrls: ['./iss-bank.page.scss'],
        }),
        __metadata("design:paramtypes", [SessionGuardService, RestGuardService,
            AuthGuardService, ToastController, Router,
            NavController])
    ], IssBankPage);
    return IssBankPage;
}());
export { IssBankPage };
//# sourceMappingURL=iss-bank.page.js.map