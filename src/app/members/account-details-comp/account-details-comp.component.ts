import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/models/Customer';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { SessionService } from '../../shared/providers/session.service';
import { AuthGuardService } from '../../shared/services/authGuard.service';

@Component({
  selector: 'app-account-details-comp',
  templateUrl: './account-details-comp.component.html',
  styleUrls: ['./account-details-comp.component.scss']
})
export class AccountDetailsCompComponent implements OnInit {

  allowEdit: boolean;
  private customer: Customer;
  constructor(private authGuardService: AuthGuardService,
    private sessionService: SessionService,
    private restApi: RestApiService) { }

  ngOnInit() {
    this.allowEdit = true;
    
      this.sessionService.loadUser().then(resCust => {
        this.customer = new Customer(resCust);
        //this.customer.setBankObj(resBank);
      });
   
  }
  toggleEditOrSave() {
    this.allowEdit = (this.allowEdit) ? false : true;
  }

}
