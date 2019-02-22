import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StageStatusService {
  private name:string;
  private count:number;
  private stageStatus:string[]=[]
  constructor() { }
  setStageName(name:string)
  {
    this.stageStatus.push(name);
    
  }
  getStageName():string[]
  {
    return this.stageStatus;
  }
  setStageCount(count:number)
  {
    this.count=count;
  }
  getStageCount()
  {
    return this.count;
  }
  print()
  {
    console.log(this.stageStatus);
  }
}
