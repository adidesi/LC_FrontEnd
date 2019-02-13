import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, EMPTY } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SessionService } from './session.service';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  //tokenState = new BehaviorSubject(null);
  constructor(private storage: Storage, private plt: Platform, private sessionService: SessionService) {
    this.plt.ready().then(() => {
      this.getToken();
    });
  }

  login(id: string) {
    return this.storage.set(TOKEN_KEY, id).then(res => {
      this.sessionService.tokenState.next(id);
      this.authenticationState.next(true);
    });
  }
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  isAuthenticate() {
    return this.authenticationState.value;
  }
  getToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        return res.toString();
      }
    });
  }
}
