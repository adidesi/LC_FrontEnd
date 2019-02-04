import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../shared/providers/rest-api.service';
import { AuthenticationService } from '../../../shared/providers/authentication.service';

import { SessionService } from '../../../shared/providers/session.service';
import { LetterOfCredit } from '../../../shared/models/LetterOfCredit';
import { Transaction } from '../../../shared/models/Transaction';
import { Customer } from '../../../shared/models/Customer';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-iss-bank',
  templateUrl: './iss-bank.page.html',
  styleUrls: ['./iss-bank.page.scss'],
})
export class IssBankPage implements OnInit {

  private letterOfCredit:LetterOfCredit;
  private loc:string;//in URL Format
  private transactions=new Array<Transaction>();
  private fetchingTransactionsComplete:boolean=false;
  private createLC:boolean;
  private customer:Customer;

  constructor(private restapi:RestApiService,private sessionService:SessionService,
    private authService:AuthenticationService,public toastController: ToastController,private router:Router
    ) { }

  ngOnInit() {
  }
  createNewLC(){
    this.restapi.putLCDetails(this.letterOfCredit).subscribe(res=>{
          this.showTransactionToast(res["transactionId"]);
          this.router.navigate(['members', this.customer.getPersonId()]);
    });
  }
  logout()
  {
    this.authService.logout();
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
