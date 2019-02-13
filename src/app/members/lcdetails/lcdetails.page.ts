import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { Transaction } from '../../shared/models/Transaction';
import { approve, reject, matias, ella } from '../../shared/constant'
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { ToastController } from '@ionic/angular';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { TrackerService } from '../../shared/services/tracker.service';
import { RestGuardService } from '../../shared/services/rest-guard.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-lcdetails',
  templateUrl: './lcdetails.page.html',
  styleUrls: ['./lcdetails.page.scss'],
})
export class LCDetailsPage implements OnInit {
  private letterOfCredit: LetterOfCredit;
  private loc: string;//in URL Format
  private transactions = new Array<Transaction>();
  private fetchingTransactionsComplete: boolean = false;
  private createLC: boolean;
  private customer: Customer;
  private bankEmployee: boolean;
  private approvals_count: string[]=[];
  result_approves: string[] = ["LC created"];
  constructor(private restapi: RestApiService, private sessionService: SessionService, private activatedroute: ActivatedRoute,
    private authGuardService: AuthGuardService, public toastController: ToastController, private router: Router,
    private tackerAuth: TrackerService, private restGuardService: RestGuardService
  ) { }

  ngOnInit() {
    this.createLC = (this.activatedroute.snapshot.paramMap.get('letterId') != null || '' || undefined) ? false : true;
    this.sessionService.loadUser().then((resCust) => {
      this.bankEmployee = (resCust['personId'] === matias || resCust['personId'] === ella) ? true : false;
      if (this.createLC) {
        this.letterOfCredit = new LetterOfCredit({ applicant: 'x#alice', beneficiary: 'x#bob' }, 'L' + Date.now().toString() + ' AM');
        this.customer = resCust;
        this.fetchingTransactionsComplete = true;
      } else {
        this.restapi.getLC(this.activatedroute.snapshot.paramMap.get('letterId')).subscribe(LCDetailResult => {
          this.letterOfCredit = new LetterOfCredit(LCDetailResult);
          this.loc = this.letterOfCredit.getLetterId().toString().replace(' ', '%20');
          this.restGuardService.getTransactionsForId(this.loc).subscribe(resTransactions => {
            console.log('in LC details', resTransactions[0].length,resTransactions.length,resTransactions)
            for(let i=0;i<resTransactions.length;i++)
            {
              for(let j=0;j<resTransactions[i].length;j++)
              {
                if(resTransactions[i][j]['loc'].split('#')[1]===this.loc)
                {
                  //this.approvals_count.push(resTransactions[i][j]);
                  //console.log(this.approvals_count);
                  if(resTransactions[i][j]['$class'].split('.')[3]=='Approve')
                  {
                  console.log('app',i,j,resTransactions[i][j]);
                    this.transactions.push(new Transaction(resTransactions[i][j],approve));
                    console.log('tnx',i,j,resTransactions[i][j]['approvingParty']);
                  //this.result_approves.push(this.tackerAuth.getStage(this.transactions.length)+" user :"+resTransactions[i][j]['approvingParty']);
                  }
                  else{
                    this.transactions.push(new Transaction(resTransactions[i][j],reject));
                  //this.result_approves.push("Rejected");
                  }
                }
              }
            }
          });
          //   this.transactions.push(new Transaction(resTransactions[0],approve));
          //   this.result_approves.push(this.tackerAuth.getStage(this.transactions.length)+" user :"+this.transactions[0]['approvingParty']);
          //   console.log('DATUM',resTransactions[0]);
          // });
          // const ob1=of(this.restapi.getApprovedTransactions());
          // const ob2=ob1.pipe(mergeMap(res=>of(this.restapi.getRejectedTransactions())));
          // ob2.subscribe(result=>{result.subscribe(res=>{
          //   console.log("RESult",res);
          // })});
          // this.restapi.getApprovedTransactions().subscribe(approvedDetails=>{
          //   this.restapi.getRejectedTransactions().subscribe(rejectedDetails=>{
          //     for(let i=0 ; i<approvedDetails.length;i++){
          //       if(approvedDetails[i]['loc'].split('#')[1]===this.loc)
          //         this.transactions.push(new Transaction(approvedDetails[i],approve));
          //         this.result_approves.push(this.tackerAuth.getStage(this.transactions.length)+" user :"+this.transactions[i]['approvingParty']);
          //     }  
          //     for(let i=0 ; i<rejectedDetails.length;i++){
          //       if(rejectedDetails[i]['loc'].split('#')[1]===this.loc)
          //         this.transactions.push(new Transaction(rejectedDetails[i],reject));
          //         this.result_approves.push("Rejected");
          //     }
          //   });
          this.customer = resCust;
          this.fetchingTransactionsComplete = true;
        });
        // });
      }
    });
  }
  createNewLC() {
    this.restapi.postLCDetails(this.letterOfCredit).subscribe(res => {
      this.showTransactionToast(res["transactionId"]);
      this.router.navigate(['members']);
      console.log("Transaction ID:", res["transactionId"]);
    });
  }
  logout() {
    this.authGuardService.logout();
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
}
