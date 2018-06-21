import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleListPageComponent } from './role-list-page.component';
import { RolesResolver } from './roles-resolver';
import { RoleResolver } from '../role-detail-page/role-resolver';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: RoleListPageComponent, resolve: { roles: RolesResolver } },
    { path: ':roleKey', loadChildren: '../role-detail-page/role-detail-page.module#RoleDetailPageModule', resolve: { role: RoleResolver} }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleListPageRoutingModule { }
