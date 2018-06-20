import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleListPageComponent } from './role-list-page.component';
import { RolesResolver } from './roles-resolver';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: RoleListPageComponent, resolve: { roles: RolesResolver } },
    { path: ':id', loadChildren: '../role-detail-page/role-detail-page.module#RoleDetailPageModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleListPageRoutingModule { }
