import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionsPageComponent } from './permissions-page.component';

const routes: Routes = [{
  path: '', component: PermissionsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsPageRoutingModule { }
