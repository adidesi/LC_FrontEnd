import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { AuthenticationService } from '../../shared/providers/authentication.service';
import { Transaction } from '../../shared/models/Transaction';
import {approve,reject} from '../../shared/constant'
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';

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

  constructor(private restapi:RestApiService,private sessionService:SessionService,private router:ActivatedRoute,private authService:AuthenticationService) { }

  ngOnInit() {
    this.createLC=(this.router.snapshot.paramMap.get('letterId')!=null||''||undefined)?false:true;
    if(this.createLC){
      this.sessionService.loadCustomer().then((resMe:Customer)=>{
        this.letterOfCredit=new LetterOfCredit();
        this.fetchingTransactionsComplete=true;
      });
    }else{
      this.restapi.getLC(this.router.snapshot.paramMap.get('letterId')).subscribe(LCDetailResult=>{
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
          this.fetchingTransactionsComplete=true;
        });
      });
  }
  }

  logout()
  {
    this.authService.logout();
  }

}
