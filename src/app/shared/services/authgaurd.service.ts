import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../providers/authentication.service';
import { SessionGaurdService } from './session-gaurd.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private authService: AuthenticationService, private sessionGuardService:SessionGaurdService) { }

  login(param:string)
  {
    return this.authService.login(param);
  }
  canActivate(): boolean{
    return this.authService.isAuthenticate();
  }
  getToken(){
    return this.authService.getToken();
  }
  logout()
  {
    this.authService.logout();
    this.sessionGuardService.invalidateSession();
    
  }
}
