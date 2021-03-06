import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { DataAccessModule } from '../data-access/data-access.module';
import { FooterComponent } from './components/footer/footer.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,

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
    LoggedInComponent,
    FooterComponent
  ],
  exports: [
    FooterComponent,
    LoggedInComponent,
    SidenavComponent,
    ToolbarComponent
  ]
})
export class LayoutModule { }
