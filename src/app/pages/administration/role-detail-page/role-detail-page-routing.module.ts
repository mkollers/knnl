import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleDetailPageComponent } from './role-detail-page.component';

const routes: Routes = [{
  path: '',
  component: RoleDetailPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleDetailPageRoutingModule { }
