import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToolbarService } from '../../../shared/layout/services/toolbar.service';

@Component({
  selector: 'knnl-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
