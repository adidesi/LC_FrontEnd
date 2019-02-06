import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../shared/providers/rest-api.service';

import { SessionService } from '../../../shared/providers/session.service';
import { LetterOfCredit } from '../../../shared/models/LetterOfCredit';
import { Transaction } from '../../../shared/models/Transaction';
import { Customer } from '../../../shared/models/Customer';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { BankEmployee } from '../../../shared/models/BankEmployee';
import { Bank } from '../../../shared/models/Bank';
import { AuthGaurdService } from '../../../shared/services/authgaurd.service';
import { SessionGaurdService } from '../../../shared/services/session-gaurd.service';

@Component({
  selector: 'app-iss-bank',
  templateUrl: './iss-bank.page.html',
  styleUrls: ['./iss-bank.page.scss'],
})
export class IssBankPage implements OnInit {

  private letterOfCredit:LetterOfCredit;

  private bankEmployee:BankEmployee;
  LCs:LetterOfCredit[]=[];
  items:any[]=[];
  private isIssuingBank:boolean=false;
  constructor(private restapi:RestApiService,private sessionguardService:SessionGaurdService,
    private sessionService:SessionService,
    private authGuardService:AuthGaurdService,public toastController: ToastController,private router:Router,
    private navCtrl: NavController
    ) { }


  ngOnInit() {
    this.authGuardService.getToken().then(res=>{
      this.sessionguardService.loadToken().subscribe(result=>{
        if(res===result){
          this.bankEmployee=null;
          this.restapi.getBankEmployee(result).subscribe((resBankEmployee:BankEmployee)=>{
            this.bankEmployee=new BankEmployee(resBankEmployee);
            this.restapi.getBank(this.bankEmployee.getBank()).subscribe((resBank:Bank)=>{
              if(resBank["name"]==="Bank of Dinero"){
                this.bankEmployee.setBankObj(new Bank(resBank,'BKDOIT60','IT60 9876 5321 9090'));
                this.bankEmployee.setIsIssuingBank(true);
                this.isIssuingBank=true;
                this.sessionService.storeUser(this.bankEmployee);
                this.sessionService.storeBank(this.bankEmployee.getBankObj());
              }
              else{
                this.bankEmployee.setBankObj(new Bank(resBank,'EWBKUS22','US22 1234 5678 0101'));
                this.bankEmployee.setIsIssuingBank(false);
                this.sessionService.storeUser(this.bankEmployee);
                this.sessionService.storeBank(this.bankEmployee.getBankObj());
              }
            });
          });
        }
      });
    });
    this.restapi.getLCs().subscribe((resLCs:LetterOfCredit[])=>{
      for(var i = 0;i < resLCs.length; i++){
        this.LCs.push(new LetterOfCredit(resLCs[i]));
      }
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
  getLCDetails(letterId:string)
  {
    this.navCtrl.navigateForward(['members','lcdetails',letterId]);
  }
}
