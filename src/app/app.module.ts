import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { CreateButtonComponent } from './create-button/create-button.component';
import { MembersComponent } from './members/members.component';
import { PopoverComponent } from './members/popover/popover.component';

@NgModule({
  declarations: [AppComponent, CreateButtonComponent, MembersComponent, PopoverComponent],
  entryComponents: [CreateButtonComponent,PopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(), HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
