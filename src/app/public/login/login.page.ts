import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {}
  
  login(param:string)
  {
    this.authService.login(param);
  }
}
