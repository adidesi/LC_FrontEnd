import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  //stages:string[]=[];
  stages = [
    "Requested by Applicant",
    "Accepted by Issuing Bank",
    "Approved by Beneficiary Bank",
    "Acknowledged by Exporter",
    "Products Shipped by Exporter",
    "Products Received By Importer",
    "Payment Made by Issuing Bank",
    "LC closed"
  ];

  constructor() { }
  getStage(count: number) {
    return this.stages[count];
  }

}
