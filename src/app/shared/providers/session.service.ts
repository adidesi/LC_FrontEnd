import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import {Storage} from '@ionic/storage';
import { AuthenticationService } from './authentication.service';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  tokenState = new BehaviorSubject(null);

  public CUSTOMER_KEY = "customer";
  public BANK_KEY ="bank";

  constructor(private storage:Storage,private authService: AuthenticationService) {
    this.authService.tokenState.subscribe(result=>{
      if(result!=undefined||null)
        this.tokenState = result.toString();
    });
  }

  storeCustomer(customer:Customer){
    return this.storage.set(this.CUSTOMER_KEY,customer);
  }
  loadCustomer(){
    return this.storage.get(this.CUSTOMER_KEY);
  }
  storeBank(bank:Bank){
    return this.storage.set(this.BANK_KEY,bank);
  }
  loadBank(){
    return this.storage.get(this.BANK_KEY);
  }

}
