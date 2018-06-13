import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { NewsPageRoutingModule } from './news-page-routing.module';
import { NewsPageComponent } from './news-page.component';

@NgModule({
  imports: [
    CommonModule,
    NewsPageRoutingModule,

    // Custom
    DataAccessModule,
    LayoutModule
  ],
  declarations: [NewsPageComponent]
})
export class NewsPageModule { }
