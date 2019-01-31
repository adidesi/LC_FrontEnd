import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { AuthenticationService } from '../../shared/providers/authentication.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { Router } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { SessionService } from '../../shared/providers/session.service';
import {token_importer} from '../../shared/constant'
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.page.html',
  styleUrls: ['./importer.page.scss'],
})
export class ImporterPage implements OnInit {

  private customerImporter:Customer;
  
  constructor(private restapi:RestApiService,private authService:AuthenticationService,private sessionService:SessionService,private router: Router,private navctrl:NavController) { }
  LCs=new Array<LetterOfCredit>();
  

  ngOnInit() {
    console.log("LCs=",this.LCs.length);
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customerImporter = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
         this.customerImporter = new Customer(res);
          this.restapi.getBank(this.customerImporter.getBank()).subscribe((resBank:Bank)=>{
            this.customerImporter.setBankObj(new Bank(resBank,'BKDOIT60','IT60 9876 5321 9090'));
            this.customerImporter.setType(token_importer);
            this.sessionService.storeCustomer(this.customerImporter);
            this.sessionService.storeBank(this.customerImporter.getBankObj());
          });
        });
      });
    });
    this.restapi.getLCs().subscribe((resLCs:LetterOfCredit[])=>{
     console.log('a',resLCs.length);
      for(var i = 0;i<resLCs.length;i++){
        this.LCs.push(new LetterOfCredit(resLCs[i]))
        console.log("LC",this.LCs[i]);
      }
      console.log("LC length",this.LCs.length);
        
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
}
