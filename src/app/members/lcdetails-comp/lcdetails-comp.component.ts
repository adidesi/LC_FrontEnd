import { Component, OnInit, Input } from '@angular/core';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { Transaction } from '../../shared/models/Transaction';
import { Customer } from '../../shared/models/Customer';
import { Subscription } from 'rxjs';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { SessionGuardService } from '../../shared/services/session-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { ToastController, PopoverController } from '@ionic/angular';
import { TrackerService } from '../../shared/services/tracker.service';
import { RestGuardService } from '../../shared/services/rest-guard.service';
import { switchMap, map } from 'rxjs/operators';
import { PopoverComponent } from '../popover/popover.component';
import { TnxButtonComponent } from '../tnx-button/tnx-button.component';
import { StageStatusService } from '../../shared/services/stage-status.service';

@Component({
  selector: 'app-lcdetails-comp',
  templateUrl: './lcdetails-comp.component.html',
  styleUrls: ['./lcdetails-comp.component.scss']
})
export class LCDetailsCompComponent implements OnInit {

  private letterOfCredit: LetterOfCredit;
  private loc: string;//in URL Format
  private transactions = new Array<Transaction>();
  private fetchingTransactionsComplete: boolean = false;
  private createLC: boolean;
  private customer: Customer;
  private bankEmployee: boolean;
  private approvals_count: string[] = [];
  private subscription: Subscription;
  private countName:any;
  private count:number;
  
  
  btn2="";
  btn1 = "";
  constructor(private restapi: RestApiService, private sessionGuardService: SessionGuardService, private activatedroute: ActivatedRoute,
    private authGuardService: AuthGuardService, public toastController: ToastController, private router: Router,
    private tackerService: TrackerService, private restGuardService: RestGuardService,private popoverController:PopoverController,
    private stageStatusService:StageStatusService
      ) { }

  stages:string[]=[];
  
  ngOnInit() {
    this.createLC = (this.activatedroute.snapshot.paramMap.get('letterId') != null || '' || undefined) ? false : true;
    let obs =this.sessionGuardService.loadToken().pipe( 
      switchMap(
        tokenVal => this.sessionGuardService.loadUser()
      )
    ).pipe(
      map(rescust=>{
        this.customer = new Customer(rescust);
      })
    );
    if(this.createLC){
      this.subscription=obs.subscribe(res=>{
        this.letterOfCredit = new LetterOfCredit({ applicant: 'x#alice', beneficiary: 'x#bob' }, 'L' + Date.now().toString() + ' AM');
        this.btn1="SAVE"
        this.btn2="CANCEL";
      });
    }else{
      
      this.loc = this.activatedroute.snapshot.paramMap.get('letterId');
      this.subscription=obs.pipe(switchMap(val=>this.restGuardService.getLCbyID(this.loc))).subscribe(result => {
        this.countName=this.tackerService.getStage(result.getTransactions().length-1);
        console.log('countName',this.countName)
        this.stageStatusService.setStageName(this.countName);
        this.stages = this.tackerService.getStages();
        console.log(this.stages);
        this.count=result.getTransactions().length;
        this.stageStatusService.setStageCount(this.count);
        if(this.count<4)
        {
          this.btn1="APPROVE"
          this.btn2="REJECT";
        }
        else{
          this.btn2="CANCEL";
        } 
        if(this.count==4)
          this.btn1="SHIP PRODUCT";
        else if(this.count==5)
          this.btn1="RECEIVE";
        else if(this.count==6)
          this.btn1="PAY";
        else if(this.count==7)
          this.btn1="CLOSE";

        console.log('this.count',this.count);
        this.letterOfCredit = result;
        console.log("this.letterOfCredit",this.letterOfCredit);
      });
    }
    

  }
  getCount()
  {
    return this.count;
  }
  getLetterOfCredit():LetterOfCredit{
    return this.letterOfCredit;
  }
  getLetterId()
  {
    return this.loc;
  }
  createNewLC() {
    this.restapi.postLCDetails(this.letterOfCredit).subscribe(res => {
      this.showTransactionToast(res["transactionId"]);
      this.router.navigate(['members',this.letterOfCredit.getApplicant()]);
    });
  }
  
  async showTransactionToast(data: string) {
    const toast = await this.toastController.create({
      message: 'Transaction Success. Id :' + data,
      showCloseButton: false,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }
  showStatus()
  {
    this.router.navigate(['members', 'trackerComp']);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps:{
        count:this.letterOfCredit.getTransactions().length,
        stage:this.letterOfCredit.getTransactions()
      },
      event: ev,
      translucent: true,
      cssClass: 'custom-popover',
      
    });
    return await popover.present();
  }



}