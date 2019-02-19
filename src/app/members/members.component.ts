import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private authGuardService:AuthGuardService) { }

  ngOnInit() {
  }
  logout()
  {
    this.authGuardService.logout();
  }
}
