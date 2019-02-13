import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  //stages:string[]=[];
  stages = ["Approved by issuing bank",
    "Approved by beneficiary bank",
    "Approved by exporter",
    "products shipped by exporter",
    "received By importer",
    "Payment by issuing bank",
    "LC closed"];

  constructor() { }
  getStage(count: number) {
    return this.stages[count];
  }

}
