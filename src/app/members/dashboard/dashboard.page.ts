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
    this.authService.tokenState.subscribe(str => {this.tokenValue = str;});
  }
  logout()
  {
    this.authService.logout();
  }

}
