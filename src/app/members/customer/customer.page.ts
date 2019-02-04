import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { AuthenticationService } from '../../shared/providers/authentication.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { Router } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { SessionService } from '../../shared/providers/session.service';
import {token_importer, token_exporter} from '../../shared/constant'
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  private customer:Customer;
  private isImporter:boolean=false;
  
  constructor(private restapi:RestApiService,private authService:AuthenticationService,private sessionService:SessionService,private router: Router,private navctrl:NavController) { }
  LCs:LetterOfCredit[]=[];
  

  ngOnInit() {
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customer = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
         this.customer = new Customer(res);
          this.restapi.getBank(this.customer.getBank()).subscribe((resBank:Bank)=>{
            if(resBank["name"]==="Bank of Dinero"){
              this.customer.setBankObj(new Bank(resBank,'BKDOIT60','IT60 9876 5321 9090'));
              this.customer.setIsImporter(true);
              this.isImporter=true;
              this.sessionService.storeCustomer(this.customer);
              this.sessionService.storeBank(this.customer.getBankObj());
            }
            else{
                this.customer.setBankObj(new Bank(resBank,'EWBKUS22','US22 1234 5678 0101'));
                this.customer.setIsImporter(false);
                this.sessionService.storeCustomer(this.customer);
                this.sessionService.storeBank(this.customer.getBankObj());
            }
          });
        });
      });
    });
    this.restapi.getLCs().subscribe((resLCs:LetterOfCredit[])=>{
      for(var i = 0;i < resLCs.length; i++){
        this.LCs.push(new LetterOfCredit(resLCs[i]))
      }
      console.log("LCs=",this.LCs.length);
      console.log(this.LCs)
    });
    
  }
  logout()
  {
    this.LCs=[];
    this.authService.logout();
  }
  showAccountDetails()
  {
    this.router.navigate(['members','accountDetails']);
  }

  getLCDetails(letterId:string)
  {
    console.log("LC",letterId);
    //this.router.navigate(['members','lcdetails/:',letterId]);
    this.navctrl.navigateForward(['members','lcdetails',letterId]);
  }

  createLC(){
    this.router.navigate(['members','createLC']);
  }
}
