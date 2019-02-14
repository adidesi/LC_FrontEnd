import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../shared/providers/rest-api.service';

import { SessionService } from '../../../shared/providers/session.service';
import { LetterOfCredit } from '../../../shared/models/LetterOfCredit';
import { Transaction } from '../../../shared/models/Transaction';
import { Customer } from '../../../shared/models/Customer';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { BankEmployee } from '../../../shared/models/BankEmployee';
import { Bank } from '../../../shared/models/Bank';
import { AuthGuardService } from '../../../shared/services/authGuard.service';
import { SessionGuardService } from '../../../shared/services/session-guard.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RestGuardService } from '../../../shared/services/rest-guard.service';

@Component({
  selector: 'app-iss-bank',
  templateUrl: './iss-bank.page.html',
  styleUrls: ['./iss-bank.page.scss'],
})
export class IssBankPage implements OnInit {

  //private letterOfCredit:LetterOfCredit;

  private bankEmployee: BankEmployee;
  LCs: LetterOfCredit[] = [];
  items: any[] = [];

  constructor(private sessionGuardService: SessionGuardService, private restGuardService: RestGuardService,
    private authGuardService: AuthGuardService, public toastController: ToastController, private router: Router,
    private navCtrl: NavController
  ) { }

  public subscription: Subscription;
  ngOnInit() {
    this.authGuardService.getToken().then(res => {
      this.subscription = this.sessionGuardService.loadToken().pipe(
        switchMap(
          tokenVal => this.restGuardService.getBankEmployee(tokenVal))
      ).subscribe(resBankEmp => {
        this.bankEmployee = resBankEmp;

        this.sessionGuardService.storeUser(this.bankEmployee);
        this.sessionGuardService.storeBank(this.bankEmployee.getBankObj());

        return resBankEmp;
      });
    });
    this.restGuardService.getLCs().subscribe(resLCs => {
      this.LCs = resLCs;
    });
  }

  logout() {
    this.authGuardService.logout();
  }
  async showTransactionToast(data: string) {
    const toast = await this.toastController.create({
      message: 'Transaction Success. Id :' + data,
      showCloseButton: false,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }
  getLCDetails(letterId: string) {
    this.navCtrl.navigateForward(['members', 'lcdetails', letterId]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
