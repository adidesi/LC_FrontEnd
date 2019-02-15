import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  //stages:string[]=[];
  stages = [
    "Requested by Applicant UserId: ",
    "Accepted by Issuing Bank. UserId: ",
    "Approved by Beneficiary Bank. UserId: ",
    "Acknowledged by Exporter. UserId:  ",
    "Products Shipped by Exporter. UserId: ",
    "Products Received By Importer. UserId: ",
    "Payment Made by Issuing Bank. UserId: ",
    "LC closed"
  ];

  constructor() { }
  getStage(count: number) {
    return this.stages[count];
  }

  getStages(){
    return this.stages;
  }
}
