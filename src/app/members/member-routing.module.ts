import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import * as Roles from '../shared/constant';

export const routes: Routes = [
  // { path: 'dashboard',loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_exporter ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_beneficiary ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_issuing ,loadChildren: './dashboard/dashboard.module#DashboardPageModule'},
  { path: Roles.token_importer, loadChildren: './dashboard/importer/importer.module#ImporterPageModule' },
  { path: Roles.alice, loadChildren: './dashboard/importer/importer.module#ImporterPageModule' },
  { path: Roles.bob, loadChildren: './dashboard/exporter/exporter.module#ExporterPageModule' },
  // { path: 'exporter', loadChildren: './dashboard/exporter/exporter.module#ExporterPageModule' },
  { path: 'ben-bank', loadChildren: './dashboard/ben-bank/ben-bank.module#BenBankPageModule' },
  { path: 'iss-bank', loadChildren: './dashboard/iss-bank/iss-bank.module#IssBankPageModule' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
