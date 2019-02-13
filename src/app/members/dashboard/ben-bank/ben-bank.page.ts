import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../shared/services/authGuard.service';
import { SessionGuardService } from '../../../shared/services/session-gaurd.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RestGuardService } from '../../../shared/services/rest-guard.service';

@Component({
  selector: 'app-ben-bank',
  templateUrl: './ben-bank.page.html',
  styleUrls: ['./ben-bank.page.scss'],
})
export class BenBankPage implements OnInit {

  public subscription: Subscription;
  constructor(private authGuardService:AuthGuardService,private sessionGuardService: SessionGuardService,private restGuardService:RestGuardService) { }

  ngOnInit() {
    this.authGuardService.getToken().then(res => {
      this.subscription = this.sessionGuardService.loadToken().pipe(switchMap(val => this.restGuardService.getCustomerWithBank(val))).subscribe(result => {
        console.log(result);
        return result;
      });
    });
  }
  logout() {
    this.authGuardService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // <-------
  }
}
