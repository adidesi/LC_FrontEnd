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
var TrackerService = /** @class */ (function () {
    function TrackerService() {
        //stages:string[]=[];
        this.stages = [
            "Requested by Applicant UserId: ",
            "Accepted by Issuing Bank. UserId: ",
            "Approved by Beneficiary Bank. UserId: ",
            "Acknowledged by Exporter. UserId:  ",
            "Products Shipped by Exporter. UserId: ",
            "Products Received By Importer. UserId: ",
            "Payment Made by Issuing Bank. UserId: ",
            "LC closed"
        ];
    }
    TrackerService.prototype.getStage = function (count) {
        return this.stages[count];
    };
    TrackerService.prototype.getStages = function () {
        return this.stages;
    };
    TrackerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TrackerService);
    return TrackerService;
}());
export { TrackerService };
//# sourceMappingURL=tracker.service.js.map