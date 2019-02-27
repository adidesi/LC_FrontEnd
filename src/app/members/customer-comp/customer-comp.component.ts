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
import { Customer } from '../../shared/models/Customer';
import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';


@Component({
  selector: 'app-customer-comp',
  templateUrl: './customer-comp.component.html',
  styleUrls: ['./customer-comp.component.scss'],
})
export class CustomerCompComponent implements OnInit {

  private customer: Customer =null;
  private bank_name: string;

  @ViewChild('processContainer', { read: ViewContainerRef }) container;

  constructor(private authGuardService: AuthGuardService, private sessionGuardService: SessionGuardService,
    private restGuardService: RestGuardService, private router: Router, private navCtrl: NavController,
    private resolver: ComponentFactoryResolver) { 
      //console.log('3CUST COMP ')
    }
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
    //this.LCs = [];aayushi
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
