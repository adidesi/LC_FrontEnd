import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../providers/authentication.service';
import { SessionGuardService } from './session-Guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private sessionGuardService: SessionGuardService) { }

  login(param: string) {
    return this.authService.login(param);
  }
  canActivate(): boolean {
    return this.authService.isAuthenticate();
  }
  getToken() {
    return this.authService.getToken();
  }
  logout() {
    this.authService.logout();
    this.sessionGuardService.invalidateSession();

  }
}
