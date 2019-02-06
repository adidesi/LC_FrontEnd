import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { Transaction } from '../../shared/models/Transaction';
import {approve,reject,matias,ella} from '../../shared/constant'
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { ToastController } from '@ionic/angular';
import { AuthGaurdService } from '../../shared/services/authgaurd.service';

@Component({
  selector: 'app-lcdetails',
  templateUrl: './lcdetails.page.html',
  styleUrls: ['./lcdetails.page.scss'],
})
export class LCDetailsPage implements OnInit {
  private letterOfCredit:LetterOfCredit;
  private loc:string;//in URL Format
  private transactions=new Array<Transaction>();
  private fetchingTransactionsComplete:boolean=false;
  private createLC:boolean;
  private customer:Customer;
  private bankEmployee:boolean;

  constructor(private restapi:RestApiService,private sessionService:SessionService,private activatedroute:ActivatedRoute,
    private authGuardService:AuthGaurdService,public toastController: ToastController,private router:Router
    ) { }

  ngOnInit() {
    this.createLC=(this.activatedroute.snapshot.paramMap.get('letterId')!=null||''||undefined)?false:true;
    this.sessionService.loadUser().then((resCust)=>{
    this.bankEmployee=(resCust['personId']===matias||resCust['personId']===ella)?true:false;
    if(this.createLC){
        this.letterOfCredit=new LetterOfCredit({applicant:'x#alice',beneficiary:'x#bob'},'L'+Date.now().toString()+' AM');
        this.customer=resCust;
        this.fetchingTransactionsComplete=true;
    }else{
      this.restapi.getLC(this.activatedroute.snapshot.paramMap.get('letterId')).subscribe(LCDetailResult=>{
        this.letterOfCredit=new LetterOfCredit(LCDetailResult);
        this.loc=this.letterOfCredit.getLetterId().toString().replace(' ','%20');
        this.restapi.getApprovedTransactions().subscribe(approvedDetails=>{
          this.restapi.getRejectedTransactions().subscribe(rejectedDetails=>{
            for(let i=0 ; i<approvedDetails.length;i++){
              if(approvedDetails[i]['loc'].split('#')[1]===this.loc)
                this.transactions.push(new Transaction(approvedDetails[i],approve));
            }  
            for(let i=0 ; i<rejectedDetails.length;i++){
              if(rejectedDetails[i]['loc'].split('#')[1]===this.loc)
                this.transactions.push(new Transaction(rejectedDetails[i],reject));
            }
          });
          this.customer=resCust;
          this.fetchingTransactionsComplete=true;
        });
      });
    }
  });
  }
  createNewLC(){
    this.restapi.postLCDetails(this.letterOfCredit).subscribe(res=>{
      this.showTransactionToast(res["transactionId"]);
      this.router.navigate(['members', this.customer.getPersonId()]);
    });
  }
  logout()
  {
    this.authGuardService.logout();
  }
  async showTransactionToast(data:string){
    const toast = await this.toastController.create({
      message: 'Transaction Success. Id :'+data,
      showCloseButton: false,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

}
