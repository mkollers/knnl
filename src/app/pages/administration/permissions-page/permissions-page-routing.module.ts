import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesResolver } from '../../../shared/data-access/resolvers/roles.resolver';
import { PermissionsPageComponent } from './permissions-page.component';

const routes: Routes = [{
  path: '', component: PermissionsPageComponent,
  resolve: { roles: RolesResolver }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsPageRoutingModule { }
