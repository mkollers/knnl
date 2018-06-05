import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsPageRoutingModule } from './news-page-routing.module';
import { NewsPageComponent } from './news-page.component';

@NgModule({
  imports: [
    CommonModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPageComponent]
})
export class NewsPageModule { }
