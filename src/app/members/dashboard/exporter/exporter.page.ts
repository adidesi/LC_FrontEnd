import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/models/Customer';
import { RestApiService } from '../../../shared/providers/rest-api.service';
import { AuthenticationService } from '../../../shared/providers/authentication.service';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.page.html',
  styleUrls: ['./exporter.page.scss'],
})
export class ExporterPage implements OnInit {

  private customerExporter:Customer;
  constructor(private restapi:RestApiService,private authService:AuthenticationService) { }
  users=['a1','a2','a3','a4'];
  ngOnInit() {
    this.authService.checkToken().then(res=>{
      this.authService.tokenState.subscribe(result=>{
        this.customerExporter = null;
        this.restapi.getCustomer(result).subscribe((res:Customer)=>{
          this.customerExporter = res;
        });
      });
    });
  }
  logout()
  {
    this.authService.logout();
  }

}
