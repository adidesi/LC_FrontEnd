import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { Customer } from '../../shared/models/Customer';
import { Bank } from '../../shared/models/Bank';
import { Router } from '@angular/router';
import { LetterOfCredit } from '../../shared/models/LetterOfCredit';
import { SessionService } from '../../shared/providers/session.service';
import { token_importer, token_exporter } from '../../shared/constant'
import { NavController } from '@ionic/angular';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { SessionGuardService } from '../../shared/services/session-guard.service';
import { CreateButtonComponent } from '../../create-button/create-button.component';
import { ProcessItem } from '../../create-button/process-item';
import { ProcessComponent } from '../../create-button/process';
import { RestGuardService } from '../../shared/services/rest-guard.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-customer',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class CustomerPage implements OnInit {

  private customer: Customer;
  private bank_name: string;

  @ViewChild('processContainer', { read: ViewContainerRef }) container;

  constructor(private authGuardService: AuthGuardService, private sessionGuardService: SessionGuardService,
    private restGuardService: RestGuardService, private router: Router, private navCtrl: NavController,
    private resolver: ComponentFactoryResolver) { }
  LCs: LetterOfCredit[] = [];
  public subscription: Subscription;


  ngOnInit() {

    this.authGuardService.getToken().then(res => {
      this.subscription = this.sessionGuardService.loadToken().pipe(
        switchMap(
          tokenVal => this.restGuardService.getCustomerWithBank(tokenVal))
      ).subscribe(resCust => {
        this.customer = resCust;

        this.sessionGuardService.storeUser(this.customer);
        this.sessionGuardService.storeBank(this.customer.getBankObj());

        this.bank_name = this.customer.getBankObj().getName();
        let step = this.getNameForButton();
        const factory = this.resolver.resolveComponentFactory(step.component);
        let componentRef = this.container.createComponent(factory);
        (<ProcessComponent>componentRef.instance).data = step.name;
        return resCust;
      });
    });
    this.restGuardService.getLCs().subscribe(resLCs => {
      this.LCs = resLCs;
    });
  }
  logout() {
    this.LCs = [];
    this.authGuardService.logout();
  }
  showAccountDetails() {
    this.router.navigate(['members', 'accountDetails']);
  }

  getLCDetails(letterId: string) {
    this.navCtrl.navigateForward(['members', 'lcdetails', letterId]);
  }

  createLC() {
    this.router.navigate(['members', 'createLC']);
  }
  getNameForButton(): ProcessItem//this is called from outside
  {
    let comp = this.resolveComponentsName(this.bank_name);
    let newItem = new ProcessItem(comp, this.bank_name);
    //console.log("bank in cust",this.bank_name);
    return newItem;
  }
  private resolveComponentsName(name) {
    if (name == 'Bank of Dinero')
      return CreateButtonComponent;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
