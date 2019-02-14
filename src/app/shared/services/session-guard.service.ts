import { Injectable } from '@angular/core';
import { SessionService } from '../providers/session.service';
import { Bank } from '../models/Bank';

@Injectable({
  providedIn: 'root'
})


export class SessionGuardService {

  constructor(private sessionService: SessionService) { }

  public invalidateSession() {
    this.sessionService.invalidateSession();
  }
  public loadUser() {
    return this.sessionService.loadUser();
  }
  public storeUser(customer) {
    return this.sessionService.storeUser(customer);
  }
  public storeBank(bank: Bank) {
    return this.sessionService.storeBank(bank);
  }
  public loadBank() {
    return this.sessionService.loadUser();
  }
  public loadToken() {
    return this.sessionService.tokenState;
  }
}
