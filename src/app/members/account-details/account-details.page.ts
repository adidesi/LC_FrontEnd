import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { AuthGuardService } from '../../shared/services/authGuard.service';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  fabToHide: HTMLElement;
  save: HTMLElement;
  allowEdit: boolean;
  private customer: Customer;
  constructor(private renderer: Renderer, private element: ElementRef,
    private authGuardService: AuthGuardService,
    private sessionService: SessionService,
    private restApi: RestApiService) { }

  ngOnInit() {
    this.allowEdit = true;
    this.sessionService.loadBank().then(resBank => {
      this.sessionService.loadUser().then(resCust => {
        this.customer = new Customer(resCust);
        this.customer.setBankObj(resBank);
      });
    });
  }
  toggleEditOrSave() {
    this.allowEdit = (this.allowEdit) ? false : true;
  }
  logout() {
    this.authGuardService.logout();
  }

}
