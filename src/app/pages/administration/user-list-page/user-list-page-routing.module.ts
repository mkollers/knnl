import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserResolver } from '../user-detail-page/user-resolver';
import { UserListPageComponent } from './user-list-page.component';
import { UsersResolver } from './users-resovler';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: UserListPageComponent, resolve: { users: UsersResolver} },
    { path: ':uid', loadChildren: '../user-detail-page/user-detail-page.module#UserDetailPageModule', resolve: { user: UserResolver } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListPageRoutingModule { }
