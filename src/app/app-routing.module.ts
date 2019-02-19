import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services/authGuard.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CustomerCompComponent } from './members/customer-comp/customer-comp.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MembersComponent } from './members/members.component';
import * as Roles from '../app/shared/constant';
import { BankCompComponent } from './members/bank-comp/bank-comp.component';
import { AccountDetailsCompComponent } from './members/account-details-comp/account-details-comp.component';
import { FormsModule } from '@angular/forms';
import { LCDetailsCompComponent } from './members/lcdetails-comp/lcdetails-comp.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  //{ path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'members', canActivate: [AuthGuardService],component:MembersComponent,
children: [
  {path: Roles.alice,component: CustomerCompComponent},
  { path: Roles.bob,component:CustomerCompComponent },
  { path: Roles.matias,component:BankCompComponent},
  { path: Roles.ella,component:BankCompComponent},
  { path: 'accountDetails',component:AccountDetailsCompComponent},
  { path: 'lcdetails/:letterId',component:LCDetailsCompComponent },
] },


];

@NgModule({
  declarations:[CustomerCompComponent,BankCompComponent,AccountDetailsCompComponent,LCDetailsCompComponent],
  imports: [RouterModule.forRoot(routes),IonicModule,CommonModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }