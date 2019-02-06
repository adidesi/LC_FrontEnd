import { Component, OnInit } from '@angular/core';
import { AuthGaurdService } from '../../shared/services/authgaurd.service';
import { SessionGaurdService } from '../../shared/services/session-gaurd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authGuardService:AuthGaurdService,private sessionGuardService:SessionGaurdService) { }

  ngOnInit() {
    this.sessionGuardService.loadToken().next('');
  }
  
  login(param:string)
  {
    this.authGuardService.login(param);
  }
}
