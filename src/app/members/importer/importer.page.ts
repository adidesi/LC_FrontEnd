import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { AuthenticationService } from '../../shared/providers/authentication.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { Router } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.page.html',
  styleUrls: ['./importer.page.scss'],
})
export class ImporterPage implements OnInit {

  private customerImporter:Customer;
  
  constructor(private restapi:RestApiService,private authService:AuthenticationService,private router: Router) { }
  LCs=new Array<LetterOfCredit>();

  ngOnInit() {
   
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customerImporter = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
         this.customerImporter = new Customer(res);
          this.restapi.getBank(this.customerImporter.getBank()).subscribe((resBank:Bank)=>{
            this.customerImporter.setBankObj(new Bank(resBank));
          });
        });
        this.restapi.getLCs().subscribe((resLCs:LetterOfCredit)=>{
          for(var i = 0;i<=LetterOfCredit.length;i++){
            //this.LCs[i]=resLCs[i];
            this.LCs.push(new LetterOfCredit(resLCs[i]))
            
            console.log("LC",this.LCs[i]);
            
          }
          console.log("LC length",this.LCs.length);
          
        });
      });
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
}
