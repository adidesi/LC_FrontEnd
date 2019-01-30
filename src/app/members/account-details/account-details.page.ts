import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../shared/providers/authentication.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  fabToHide: HTMLElement;
  save: HTMLElement;
  constructor(private renderer: Renderer, private element: ElementRef,private authService:AuthenticationService) { }

  ngOnInit() {
    this.save = this.element.nativeElement.getElementsByClassName("fab1")[0];
    this.renderer.setElementStyle(this.save,'opacity','0');
    this.fabToHide = this.element.nativeElement.getElementsByClassName("fab")[0];
    
  }
  toggleBoolean(id, prop) {

      
      this.renderer.setElementStyle(this.fabToHide, 'opacity', '0');
      this.renderer.setElementStyle(this.save, 'opacity', '1');
      for(var i = 1;i<=3;i++){
        var el = document.getElementById(id+i);
        var isTrue = el[prop] ? false : true;
        el[prop] = isTrue;
        console.log('in toggleBoolean, setting', prop, 'to', isTrue);
  
      }

          
  }
  logout()
  {
    this.authService.logout();
  }

}
