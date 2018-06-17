import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionsPageComponent } from './permissions-page.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: PermissionsPageComponent },
    { path: ':id', loadChildren: '../role-detail-page/role-detail-page.module#RoleDetailPageModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsPageRoutingModule { }
