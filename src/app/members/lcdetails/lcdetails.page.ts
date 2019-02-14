import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { Transaction } from '../../shared/models/Transaction';
import { approve, reject, CREATE, matias, ella } from '../../shared/constant'
import { SessionService } from '../../shared/providers/session.service';
import { Customer } from '../../shared/models/Customer';
import { ToastController } from '@ionic/angular';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { TrackerService } from '../../shared/services/tracker.service';
import { RestGuardService } from '../../shared/services/rest-guard.service';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { of, Subscription, forkJoin } from 'rxjs';
import { SessionGuardService } from '../../shared/services/session-guard.service';
import { Bank } from '../../shared/models/Bank';

@Component({
  selector: 'app-lcdetails',
  templateUrl: './lcdetails.page.html',
  styleUrls: ['./lcdetails.page.scss'],
})
export class LCDetailsPage implements OnInit {
  private letterOfCredit: LetterOfCredit;
  private loc: string;//in URL Format
  private transactions = new Array<Transaction>();
  private fetchingTransactionsComplete: boolean = false;
  private createLC: boolean;
  private customer: Customer;
  private bankEmployee: boolean;
  private approvals_count: string[] = [];
  private subscription: Subscription;
  constructor(private restapi: RestApiService, private sessionGuardService: SessionGuardService, private activatedroute: ActivatedRoute,
    private authGuardService: AuthGuardService, public toastController: ToastController, private router: Router,
    private tackerAuth: TrackerService, private restGuardService: RestGuardService
  ) { }

  ngOnInit() {
    this.createLC = (this.activatedroute.snapshot.paramMap.get('letterId') != null || '' || undefined) ? false : true;
    this.authGuardService.getToken().then(res => {
      if (this.createLC) {
        this.letterOfCredit = new LetterOfCredit({ applicant: 'x#alice', beneficiary: 'x#bob' }, 'L' + Date.now().toString() + ' AM');
      } else {
        this.loc = this.activatedroute.snapshot.paramMap.get('letterId');
        this.subscription = this.sessionGuardService.loadToken().pipe(
          switchMap(
            tokenVal => forkJoin(this.sessionGuardService.loadUser(),this.restGuardService.getLCbyID(this.loc))
          )
        )
        .subscribe(result => {
          console.log(result);
          this.customer = new Customer(result[0]);
          console.log(this.customer);
          this.letterOfCredit = result[1];
        }
        );
      }
    });
  }
  createNewLC() {
    this.restapi.postLCDetails(this.letterOfCredit).subscribe(res => {
      this.showTransactionToast(res["transactionId"]);
      this.router.navigate(['members']);
      console.log("Transaction ID:", res["transactionId"]);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
