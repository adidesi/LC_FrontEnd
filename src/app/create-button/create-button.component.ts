import { Component, OnInit, Input } from '@angular/core';
import { ProcessComponent } from './process';
import { RestApiService } from '../shared/providers/rest-api.service';
import { LetterOfCredit } from '../shared/models/LetterOfCredit';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements ProcessComponent {

  @Input() data:any;
  constructor(private restApiService: RestApiService,public toastController: ToastController,private router:Router) {  }
  private letterOfCredit:LetterOfCredit;
  ngOnInit() {
  }

  createLC(){
    // this.restApiService.postLCDetails(this.letterOfCredit).subscribe(res=>{
    //   this.showTransactionToast(res["transactionId"]);
    //   this.router.navigate(['members']);
    //   console.log("Transaction ID:",res["transactionId"]);
    // });
    this.router.navigate(['members', 'createLC']);
  }
  async showTransactionToast(data:string){
    const toast = await this.toastController.create({
      message: 'Transaction Success. Id :'+data,
      showCloseButton: false,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }
}
