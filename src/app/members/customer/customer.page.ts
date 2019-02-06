import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { Router } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { SessionService } from '../../shared/providers/session.service';
import {token_importer, token_exporter} from '../../shared/constant'
import { NavController } from '@ionic/angular';
import { AuthGaurdService } from '../../shared/services/authgaurd.service';
import { SessionGaurdService } from '../../shared/services/session-gaurd.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  private customer:Customer;
  private isImporter:boolean=false;
  
  constructor(private restapi:RestApiService,private authGuardService:AuthGaurdService,
    private sessionGuardService:SessionGaurdService,private router: Router,private navCtrl:NavController) { }
  LCs:LetterOfCredit[]=[];
  

  ngOnInit() {
    this.authGuardService.getToken().then(res=>{
      this.sessionGuardService.loadToken().subscribe(result=>{
        if(res===result){
          this.customer = null;
          this.restapi.getCustomer(result).subscribe((res:Customer)=>{
          this.customer = new Customer(res);
            this.restapi.getBank(this.customer.getBank()).subscribe((resBank:Bank)=>{
              if(resBank["name"]==="Bank of Dinero"){
                this.customer.setBankObj(new Bank(resBank,'BKDOIT60','IT60 9876 5321 9090'));
                this.customer.setIsImporter(true);
                this.isImporter=true;
                this.sessionGuardService.storeUser(this.customer);
                this.sessionGuardService.storeBank(this.customer.getBankObj());
              }
              else{
                  this.customer.setBankObj(new Bank(resBank,'EWBKUS22','US22 1234 5678 0101'));
                  this.customer.setIsImporter(false);
                  this.sessionGuardService.storeUser(this.customer);
                  this.sessionGuardService.storeBank(this.customer.getBankObj());
              }
            });
          });
        }
      });
    });
    this.restapi.getLCs().subscribe((resLCs:LetterOfCredit[])=>{
      for(var i = 0;i < resLCs.length; i++){
        this.LCs.push(new LetterOfCredit(resLCs[i]))
      }
    });
    
  }
  logout()
  {
    this.LCs=[];
    this.authGuardService.logout();
  }
  showAccountDetails()
  {
    this.router.navigate(['members','accountDetails']);
  }

  getLCDetails(letterId:string)
  {
    this.navCtrl.navigateForward(['members','lcdetails',letterId]);
  }

  createLC(){
    this.router.navigate(['members','createLC']);
  }
}
