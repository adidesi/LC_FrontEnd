import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';
import { BankEmployee } from '../models/BankEmployee';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  tokenState = new BehaviorSubject<string>(null);

  public CUSTOMER_KEY = "customer";
  public BANK_KEY = "bank";

  constructor(private storage: Storage) {

  }
  storeUser(customer) {
    return this.storage.set(this.CUSTOMER_KEY, customer);
  }
  loadUser() {
    return this.storage.get(this.CUSTOMER_KEY);
  }
  storeBank(bank: Bank) {
    return this.storage.set(this.BANK_KEY, bank);
  }
  loadBank() {
    return this.storage.get(this.BANK_KEY);
  }
  invalidateSession() {
    this.storage.remove(this.CUSTOMER_KEY);
    this.storage.remove(this.BANK_KEY);
    // this.tokenState.next('');



  }
}
