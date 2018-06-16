import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'knnl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  navigateBackUri$: Observable<string>;
  title$: Observable<string>;

  @Output('knnl-toggle') toggle = new EventEmitter<void>();

  constructor(
    toolbarService: ToolbarService
  ) {
    this.navigateBackUri$ = toolbarService.navigateBackUri$;
    this.title$ = toolbarService.title$;
  }
}
