import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../shared/providers/authentication.service';
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { RestApiService } from '../../shared/providers/rest-api.service';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  fabToHide: HTMLElement;
  save: HTMLElement;
  allowEdit:boolean;
  private customer:Customer;
  constructor(private renderer: Renderer, private element: ElementRef,
    private authService:AuthenticationService,
    private sessionService:SessionService,
    private restApi:RestApiService) { }

  ngOnInit() {
    //this.save = this.element.nativeElement.getElementsById("fab1");
    //this.renderer.setElementStyle(this.save,'hidden','true');
    this.allowEdit=true;
    this.sessionService.loadBank().then(resBank=>{
      this.sessionService.loadCustomer().then(resCust=>{
        this.customer = new Customer(resCust);
        this.customer.setBankObj(resBank);
        });
    });    
  }
  toggleEditOrSave() {
    if(!this.allowEdit){//Save Button is Clicked. And We have to Save the Bank Details
      //this.restApi.updateCustomerDetails();
      console.log('data saved');
    } 
    console.log('before',this.allowEdit);
    this.allowEdit=(this.allowEdit)?false:true;
    console.log('after',this.allowEdit);
    
          
  }
  logout()
  {
    this.authService.logout();
  }

}
