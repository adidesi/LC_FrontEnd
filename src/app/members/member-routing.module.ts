import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Roles from '../shared/constant';

export const routes: Routes = [
  { path: Roles.token_importer, loadChildren: './importer/importer.module#ImporterPageModule' },
  { path: Roles.token_exporter ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_beneficiary ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_issuing ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.alice, loadChildren: './importer/importer.module#ImporterPageModule' },
  { path: Roles.bob, loadChildren: './dashboard/exporter/exporter.module#ExporterPageModule' },
  { path: 'ben-bank', loadChildren: './dashboard/ben-bank/ben-bank.module#BenBankPageModule' },
  { path: 'iss-bank', loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' },
  { path: 'accountDetails', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'lcdetails/:letterId', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' },
  { path: 'createLC', loadChildren: './lcdetails/lcdetails.module#LCDetailsPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
