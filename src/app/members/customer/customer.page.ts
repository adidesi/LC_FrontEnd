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
import { SessionGuardService } from '../../shared/services/session-Guard.service';
import { CreateButtonComponent } from '../../create-button/create-button.component';
import { ProcessItem } from '../../create-button/process-item';
import { ProcessComponent } from '../../create-button/process';
import { RestGuardService } from '../../shared/services/rest-guard.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  private customer: Customer;
  private isImporter: boolean = false;
  private bank_name: string;

  @ViewChild('processContainer', { read: ViewContainerRef }) container;

  constructor(private restapi: RestApiService, private authGuardService: AuthGuardService,
    private sessionGuardService: SessionGuardService, private restGuardService:RestGuardService, 
    private router: Router, private navCtrl: NavController, private resolver: ComponentFactoryResolver) { }
  LCs: LetterOfCredit[] = [];


  ngOnInit() {
    this.authGuardService.getToken().then(res => {
      this.sessionGuardService.loadToken().subscribe(result => {
        console.log('called');
        return result;
      });
    });

   /*  this.restGuardService.getCustomerWithBank('alice').subscribe(res =>{
      console.log('here', res);
    }); */
   /*  this.authGuardService.getToken().then(res => {
      this.sessionGuardService.loadToken().subscribe(result => {
        if (res === result) {
          */
         /*  const custObservable = this.restGuardService.getCustomerDetails(res);
          //console.log(custObservable);
          custObservable.subscribe(data=>{
            //console.log(data);
          }) */
            // this.customer=data;
            // console.log('Cus in customer',this.customer);
          
          //console.log('RESTGUARD',this.restGuardService.getCustomerDetails(result));
//            console.log(this.restGuardService.getCustomerDetails(result));//subscribe(custResult=>{
              //this.customer = new Customer(custResult);
            //});
          // this.restapi.getCustomer(result).subscribe((res: Customer) => { 
          //   this.customer = new Customer(res);
          //   this.restapi.getBank(this.customer.getBank()).subscribe((resBank: Bank) => {
          //     this.bank_name = resBank["name"];
          //     if (resBank["name"] === "Bank of Dinero") {
          //       this.customer.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
          //       this.customer.setIsImporter(true);
          //       this.isImporter = true;
          //       this.sessionGuardService.storeUser(this.customer);
          //       this.sessionGuardService.storeBank(this.customer.getBankObj());
          //     }
          //     else {
          //       this.customer.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
          //       this.customer.setIsImporter(false);
          //       this.sessionGuardService.storeUser(this.customer);
          //       this.sessionGuardService.storeBank(this.customer.getBankObj());
          //     }
              // let step = this.getNameForButton();
              // console.log("step", step);
              // const factory = this.resolver.resolveComponentFactory(step.component);
              // let componentRef = this.container.createComponent(factory);
              // (<ProcessComponent>componentRef.instance).data = step.name;
            //});
          //});
      /*   }
      });
    }); */
    this.restapi.getLCs().subscribe((resLCs: LetterOfCredit[]) => {
      for (var i = 0; i < resLCs.length; i++) {
        this.LCs.push(new LetterOfCredit(resLCs[i]))
      }
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
    return newItem;
  }
  private resolveComponentsName(name) {
    if (name == 'Bank of Dinero')
      return CreateButtonComponent;
  }
}
