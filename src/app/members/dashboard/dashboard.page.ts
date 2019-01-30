import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/providers/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tokenValue : string;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    //console.log('TOKEN',this.authService.checkToken());
    this.authService.tokenState.subscribe(str => {this.tokenValue = str;});
    //console.log('VALUE',this.tokenValue);
  }
  logout()
  {
    this.authService.logout();
  }

}
