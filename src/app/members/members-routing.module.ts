import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Roles from '../shared/constant';

export const routes: Routes = [
  { path: Roles.token_importer, loadChildren: './user/user.module#UserPageModule' },
  // { path: Roles.token_exporter, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  // { path: Roles.token_beneficiary, loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: Roles.matias, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
  { path: Roles.alice, loadChildren: './user/user.module#UserPageModule' },
  { path: Roles.bob, loadChildren: './user/user.module#UserPageModule' },
  { path: Roles.ella, loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
  { path: 'accountDetails', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'lcdetails/:letterId', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
  { path: 'createLC', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { 
  constructor(){console.log('MEMROUT')}
}
