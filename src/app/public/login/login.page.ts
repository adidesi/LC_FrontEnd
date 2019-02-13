import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../shared/services/authGuard.service';
import { SessionGuardService } from '../../shared/services/session-Guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authGuardService:AuthGuardService,private sessionGuardService:SessionGuardService) { }

  ngOnInit() {
    this.sessionGuardService.loadToken().next('');
  }
  
  login(param:string)
  {
    this.authGuardService.login(param);
  }
}
