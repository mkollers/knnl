import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { DataAccessModule } from '../data-access/data-access.module';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CurrentUserResolver } from './resolvers/current-user.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,

    // Custom
    AuthModule,
    DataAccessModule
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    LoggedInComponent
  ],
  providers: [
    CurrentUserResolver
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
    LoggedInComponent
  ]
})
export class LayoutModule { }
