import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToolbarService } from '../../../shared/layout/services/toolbar.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent {

  constructor(
    title: Title,
    toolbarService: ToolbarService
  ) {
    title.setTitle('News');
    toolbarService.title = 'News';
  }
}
