import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { LCDetailsCompComponent } from '../lcdetails-comp/lcdetails-comp.component';
import { Transaction } from '../../shared/models/Transaction';
import { approve, SHIP, RECEIVE, PAYMENT, CLOSE } from '../../shared/constant';
import { SessionService } from '../../shared/providers/session.service';
import { SessionGuardService } from '../../shared/services/session-guard.service';
import { switchMap } from 'rxjs/operators';
import { Customer } from '../../shared/models/Customer';
import { RestApiService } from '../../shared/providers/rest-api.service';
import { TrackerService } from '../../shared/services/tracker.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tnx-button',
  templateUrl: './tnx-button.component.html',
  styleUrls: ['./tnx-button.component.scss']
})
export class TnxButtonComponent implements OnInit {
  name: any;
  @Input() childMessage: string;
  @Input() value2: string;
  TEST: string;
  private tnxRequest: Transaction;
  private user: Customer;
  json = { "cancel": `cancelFunc()`, "child": "getChild()", "save": "getChild()" };
  allowedStage: string[] = [];
  disabledBtn = false;
  constructor(private lcdetails: LCDetailsCompComponent, private sessionService: SessionService,
    private restApiService: RestApiService, private trackerService: TrackerService, private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    // if(this.childMessage=="SAVE")
    //   this.saveData();
    // else if(this.childMessage=="APPROVE")
    //   this.approveLC();
    //  console.log(this.TEST);
    // console.log(this.childMessage);
    this.sessionService.loadUser().then(resCust => {
      this.user = new Customer(resCust);
      this.allowedStage = this.trackerService.getbtnDisplayForUser(this.user.getPersonId());
      let currentTnx: string = (1 + this.lcdetails.getLetterOfCredit().getTransactions().length).toString();
      console.log('currentTnx', currentTnx, 'this.allowedStage', this.allowedStage, 'this.allowedStage.includes(currentTnx)', this.allowedStage.includes(currentTnx))
      if (this.allowedStage.includes(currentTnx) == true) {
        this.disabledBtn = true;
      }
    });

  }
  postRequest(msg: string) {
    if (msg == "APPROVE")
      this.approveLC()
    else if (msg == "REJECT")
      this.rejectLC()
    else if (msg == "SAVE")
      this.saveData()
    else if (msg == "CANCEL")
      this.cancelData()
    else if(msg=="SHIP PRODUCT")
      this.shipProduct()
    else if(msg=="RECEIVE")
      this.receiveProduct()
    else if(msg=="PAY")
      this.payAmount()
    else if(msg=="CLOSE")
      this.closeLC()
  }
  cancelData() {
    console.log("CANCELED");
  }
  saveData() {
    console.log("Saved");
    this.lcdetails.createNewLC();
  }
  approveLC() {
    console.log("Approved");
    console.log('this.user', this.user)
    this.tnxRequest = new Transaction({ approvingParty: '#' + this.user.getPersonId() }, approve, this.lcdetails.getLetterId())
    console.log('this.tnxRequest', this.tnxRequest)
    this.restApiService.approveLCData(this.tnxRequest).subscribe(res => {
      this.showTransactionToast('Transaction Success');
      this.router.navigate(['members', this.user.getPersonId()]);
    });
  }
  rejectLC() {
    console.log("REJECTED");
  }
  async showTransactionToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: false,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  shipProduct() {
    this.tnxRequest = new Transaction({ evidence: "LC uploaded" },SHIP, this.lcdetails.getLetterId())
    console.log('this.tnxRequest', this.tnxRequest)
    this.restApiService.shipProduct(this.tnxRequest).subscribe(res => {
      this.showTransactionToast('Product Shipped Successfully');
      this.router.navigate(['members', this.user.getPersonId()]);
    });

  }
  receiveProduct(){
    this.tnxRequest = new Transaction({},RECEIVE, this.lcdetails.getLetterId())
    console.log('this.tnxRequest', this.tnxRequest)
    this.restApiService.receiveProduct(this.tnxRequest).subscribe(res => {
      this.showTransactionToast('Product received by'+this.user.getPersonId());
      this.router.navigate(['members', this.user.getPersonId()]);
  });
}
  payAmount(){
    this.tnxRequest = new Transaction({},PAYMENT, this.lcdetails.getLetterId())
    console.log('this.tnxRequest', this.tnxRequest)
    this.restApiService.readyForPayment(this.tnxRequest).subscribe(res => {
      this.showTransactionToast('Payment made by '+this.user.getPersonId());
      this.router.navigate(['members', this.user.getPersonId()]);
  });
  }
  closeLC(){
    this.tnxRequest = new Transaction({"closeReason":"completed"},CLOSE, this.lcdetails.getLetterId())
    console.log('this.tnxRequest', this.tnxRequest)
    this.restApiService.closeLC(this.tnxRequest).subscribe(res => {
      this.showTransactionToast('LC Closed by '+this.user.getPersonId());
      this.router.navigate(['members', this.user.getPersonId()]);
  });
  }

}
