import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './shared/providers/authentication.service';
import { Router } from '@angular/router';
import { SessionService } from './shared/providers/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state=>{
        if(state)
        {
          this.sessionService.tokenState.subscribe(data=>{
            console.log('ADITYA2',data)
            this.router.navigate(['members',data]);
          });
        }else{
          this.router.navigate(['login']);
        }
      });
    });
  }
}
