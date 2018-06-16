import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleDetailPageComponent } from './role-detail-page.component';
import { RoleResolver } from './role.resolver';

const routes: Routes = [{
  path: '',
  component: RoleDetailPageComponent,
  resolve: { role: RoleResolver }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleDetailPageRoutingModule { }
