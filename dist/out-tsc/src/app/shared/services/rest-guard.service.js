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
import { RestApiService } from '../providers/rest-api.service';
import { Observable, forkJoin, } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Transaction } from '../models/Transaction';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../models/Bank';
import { approve, reject, CREATE, InitialApplicationClass } from '../constant';
import { Customer } from '../models/Customer';
import { SessionGuardService } from './session-guard.service';
import { BankEmployee } from '../models/BankEmployee';
import { LetterOfCredit } from '../models/LetterOfCredit';
var RestGuardService = /** @class */ (function () {
    function RestGuardService(restApiService, http, sessionGuardService) {
        this.restApiService = restApiService;
        this.http = http;
        this.sessionGuardService = sessionGuardService;
    }
    RestGuardService.prototype.getTransactions = function () {
        var initTnxObs = this.restApiService.getInitialApplicationTransactions();
        var approveTnxObs = this.restApiService.getApprovedTransactions();
        var rejectTnxObs = this.restApiService.getRejectedTransactions();
        return forkJoin([initTnxObs, approveTnxObs, rejectTnxObs]);
    };
    RestGuardService.prototype.getTransactionsForId = function (id) {
        return this.getTransactions().pipe(map(function (resAllTnx) {
            var urlId = id.replace(' ', '%20');
            var LCTnxforId = [];
            for (var i = 0; i < resAllTnx.length; i++) {
                for (var j = 0; j < resAllTnx[i].length; j++) {
                    if (resAllTnx[i][j]['$class'].split('.')[3] == InitialApplicationClass) {
                        if (resAllTnx[i][j]['letterId'] == id) {
                            LCTnxforId.push(new Transaction(resAllTnx[i][j], CREATE));
                        }
                    }
                    else {
                        if (resAllTnx[i][j]['loc'].split('#')[1] == urlId) {
                            if (resAllTnx[i][j]['$class'].split('.')[3] == 'Approve')
                                LCTnxforId.push(new Transaction(resAllTnx[i][j], approve));
                            else
                                LCTnxforId.push(new Transaction(resAllTnx[i][j], reject));
                        }
                    }
                }
            }
            return LCTnxforId;
        }));
    };
    RestGuardService.prototype.getCustomerDetails = function (id) {
        var _this = this;
        var customerObservable = new Observable(function (observer) {
            observer.next(_this.restApiService.getCustomer('alice'));
            console.log(observer);
            //return observer;
        });
        return customerObservable;
    };
    RestGuardService.prototype.getCustomerWithBank = function (id) {
        var _this = this;
        if (id !== null && id !== undefined) {
            return this.restApiService.getCustomer(id)
                .pipe(switchMap(function (resCust) {
                if (resCust) {
                    return _this.restApiService.getBank(resCust['bank'].split('#')[1])
                        .pipe(map(function (resBank) {
                        var bank = new Bank(resBank);
                        var customer = new Customer(resCust);
                        if (resBank["name"] === "Bank of Dinero") {
                            customer.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
                            customer.setIsImporter(true);
                        }
                        else {
                            customer.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
                            customer.setIsImporter(false);
                        }
                        return customer;
                    }));
                }
                else {
                    return null;
                }
            }));
        }
    };
    RestGuardService.prototype.getBankEmployee = function (id) {
        var _this = this;
        if (id != null || id != undefined) {
            return this.restApiService.getBankEmployee(id).pipe(switchMap(function (resBankEmp) {
                if (resBankEmp) {
                    return _this.restApiService.getBank(resBankEmp['bank'].split('#')[1])
                        .pipe(map(function (resBank) {
                        var bank = new Bank(resBank);
                        var bankEmp = new BankEmployee(resBankEmp);
                        if (resBank["name"] === "Bank of Dinero") {
                            bankEmp.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
                            bankEmp.setIsIssuingBank(true);
                        }
                        else {
                            bankEmp.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
                            bankEmp.setIsIssuingBank(false);
                        }
                        return bankEmp;
                    }));
                }
                else {
                    return null;
                }
            }));
        }
    };
    RestGuardService.prototype.getLCs = function () {
        return this.restApiService.getLCs().pipe(map(function (resLCs) {
            var LCs = [];
            for (var i = 0; i < resLCs.length; i++) {
                LCs.push(new LetterOfCredit(resLCs[i]));
            }
            return LCs;
        }));
    };
    RestGuardService.prototype.getLCbyID = function (id) {
        var _this = this;
        var urlId = id.replace(' ', '%20');
        return this.restApiService.getLC(urlId).pipe(mergeMap(function (resLC) {
            return _this.getTransactionsForId(id).pipe(map(function (resTnx) {
                var LC = new LetterOfCredit(resLC);
                LC.setTransactions(resTnx);
                return LC;
            }));
        }));
    };
    RestGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [RestApiService, HttpClient,
            SessionGuardService])
    ], RestGuardService);
    return RestGuardService;
}());
export { RestGuardService };
//# sourceMappingURL=rest-guard.service.js.map