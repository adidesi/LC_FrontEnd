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
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../constant';
var RestApiService = /** @class */ (function () {
    function RestApiService(http) {
        this.http = http;
    }
    RestApiService.prototype.getCustomer = function (id) {
        return this.http.get(APIURL + 'Customer/' + id);
    };
    RestApiService.prototype.getBankEmployee = function (empid) {
        return this.http.get(APIURL + 'BankEmployee/' + empid);
    };
    RestApiService.prototype.getBank = function (bankId) {
        return this.http.get(APIURL + 'Bank/' + bankId);
    };
    RestApiService.prototype.getLCs = function () {
        return this.http.get(APIURL + 'LetterOfCredit/');
    };
    RestApiService.prototype.getLC = function (id) {
        return this.http.get(APIURL + 'LetterOfCredit/' + id);
    };
    RestApiService.prototype.getProductDetails = function () {
        return this.http.get(APIURL + 'LetterOfCredit/');
    };
    RestApiService.prototype.updateCustomerDetails = function () {
        throw new Error("Method not implemented.");
    };
    RestApiService.prototype.getApprovedTransactions = function () {
        return this.http.get(APIURL + 'Approve');
    };
    RestApiService.prototype.getRejectedTransactions = function () {
        return this.http.get(APIURL + 'Reject');
    };
    RestApiService.prototype.getInitialApplicationTransactions = function () {
        return this.http.get(APIURL + 'InitialApplication');
    };
    RestApiService.prototype.postLCDetails = function (data) {
        var result = JSON.parse(JSON.stringify(data));
        if (result['approval'] != undefined || null)
            delete result['approval'];
        if (result['issuingBank'] != undefined || null)
            delete result['issuingBank'];
        if (result['exportingBank'] != undefined || null)
            delete result['exportingBank'];
        if (result['status'] != undefined || null)
            delete result['status'];
        if (result['transactionId'] != undefined || null)
            delete result['transactionId'];
        return this.http.post(APIURL + 'InitialApplication', result);
    };
    RestApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], RestApiService);
    return RestApiService;
}());
export { RestApiService };
//# sourceMappingURL=rest-api.service.js.map