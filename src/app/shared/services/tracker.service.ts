import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  //stages:string[]=[];
  stages = [
    "Requested by Applicant ",
    "Accepted by IssuingBank ",
    "Approved by BeneficiaryBank ",
    "Acknowledged by Exporter ",
    "Products Shipped by Exporter",
    "Products Received By Importer",
    "Payment Made by Issuing Bank ",
    "LC closed"
  ];

  btnDisplayArray={"alice":["1","6"],"bob":["4","5"],"ella":["3","8"],"matias":["2","7"]};

  constructor() { 
    //for(let i=0;i<this.stages.length;i++)
    //console.log("count",i,"stage",this.stages[i])
  }
  getStage(count: number) {
    return this.stages[count];
  }

  getStages(){
    return this.stages;
  }

  getbtnDisplayForUser(username:string):string[]{
    return this.btnDisplayArray[username];
  }
}
