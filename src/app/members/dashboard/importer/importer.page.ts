import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../rest-api.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Customer } from '../../../shared/models/Customer';
import { Bank } from '../../../shared/models/Bank';
import { Router } from '@angular/router';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.page.html',
  styleUrls: ['./importer.page.scss'],
})
export class ImporterPage implements OnInit {

  private customerImporter:Customer;
  
  constructor(private restapi:RestApiService,private authService:AuthenticationService,private router: Router) { }
  users=['a1','a2','a3','a4'];
  ngOnInit() {
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customerImporter = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
         this.customerImporter = new Customer(res);
          this.restapi.getBank(this.customerImporter.getBank()).subscribe((resBank:Bank)=>{
            this.customerImporter.setBankObj(new Bank(resBank));
          });
          console.log('FINAL',this.customerImporter);
        });
      });
    });
    
  }
  logout()
  {
    this.authService.logout();
  }
  showAccountDetails()
  {
    
  }
}
