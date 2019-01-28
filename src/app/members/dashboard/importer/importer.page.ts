import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../rest-api.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Customer } from '../../../shared/models/Customer';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.page.html',
  styleUrls: ['./importer.page.scss'],
})
export class ImporterPage implements OnInit {

  private customerImporter:Customer;
  constructor(private restapi:RestApiService,private authService:AuthenticationService) { }
  users=['a1','a2','a3'];
  ngOnInit() {
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customerImporter = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
          this.customerImporter = res;
          console.log('RES',this.customerImporter);
        });
      });
    });
  }

}
