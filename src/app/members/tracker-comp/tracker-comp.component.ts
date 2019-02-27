import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { TrackerService } from '../../shared/services/tracker.service';
import { Transaction } from '../../shared/models/Transaction';

import { SessionGuardService } from '../../shared/services/session-guard.service';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { reject, CLOSE } from '../../shared/constant';


@Component({
  selector: 'app-tracker-comp',
  templateUrl: './tracker-comp.component.html',
  styleUrls: ['./tracker-comp.component.scss']
})
export class TrackerCompComponent implements OnInit {
  stages: any[] = []
  private customer: Customer;
  //private toDisplayOrNot:boolean=true;
  constructor(private sessionService: SessionService,
    private trackerService: TrackerService, private sessionGuardService: SessionGuardService) { }
  private letterOfCredit: LetterOfCredit;
  private tnx: Transaction[] = []

  ngOnInit() {
    this.sessionService.loadUser().then(resCust => {
      this.customer = new Customer(resCust);
    });
    this.sessionGuardService.loadLC().then(resultLC => {
      this.letterOfCredit = new LetterOfCredit(resultLC);
      //console.log("LC",this.letterOfCredit)
      this.tnx = this.letterOfCredit.getTransactions();
      let tnxCount = this.tnx.length;
      //console.log(this.tnx[tnxCount - 1]["status"]);
      for (let i = 0; i < tnxCount; i++) {
        if ((this.tnx[i]["status"] != reject))
          this.stages.push({ "stage": this.trackerService.stages[i], "status": "stepComplete" });
        else {
          this.stages.push({ "stage": "Rejected by " + this.trackerService.stages[i].split(" ")[2], "status": "stepFinished" });
        }
      }
      if ((this.tnx[tnxCount- 1]["status"] != reject) && (this.tnx[tnxCount - 1]["status"] != CLOSE)) {
        this.stages.push({ "stage": "Pending : " + this.trackerService.stages[tnxCount], "status": "stepIncomplete","time":"" });
        this.tnx.push(new Transaction({date: "",status: "Pending Transaction",time: ""},"Pending Transaction"))
      }
      //console.log("stages", this.tnx)
    });

  }


}
