import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { StageStatusService } from '../../shared/services/stage-status.service';
import { TrackerService } from '../../shared/services/tracker.service';


@Component({
  selector: 'app-tracker-comp',
  templateUrl: './tracker-comp.component.html',
  styleUrls: ['./tracker-comp.component.scss']
})
export class TrackerCompComponent implements OnInit {
str:any
str1:number
stages:string[]=[]
private customer: Customer;
  constructor(private sessionService:SessionService,private stageStatusService:StageStatusService,
    private trackerService:TrackerService) { }

  ngOnInit() {
    this.sessionService.loadUser().then(resCust => {
      this.customer = new Customer(resCust);
    });
    this.str="stepComplete";
    this.stages=this.stageStatusService.getStageName()
   //console.log(this.stageStatusService.getStegeName(),this.stageStatusService.getStageCount());
   console.log(this.stageStatusService.getStageName())
   
    
  }

}
