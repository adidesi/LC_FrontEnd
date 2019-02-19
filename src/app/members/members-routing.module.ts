import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import * as Roles from '../shared/constant';
import { CustomerCompComponent } from './customer-comp/customer-comp.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  //{ path: Roles.token_importer, loadChildren: './user/user.module#UserPageModule' },
  // { path: Roles.token_exporter, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  // { path: Roles.token_beneficiary, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: Roles.matias, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
 
  { path: Roles.bob, component: CustomerCompComponent},//loadChildren: './user/user.module#UserPageModule' },
  { path: Roles.ella, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
  { path: 'accountDetails', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'lcdetails/:letterId', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
  { path: 'createLC', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' }
];

@NgModule({
  declarations: [CustomerCompComponent],
  imports: [RouterModule.forChild(routes),IonicModule,CommonModule],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
