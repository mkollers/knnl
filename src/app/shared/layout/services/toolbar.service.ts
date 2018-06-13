import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  title$ = new BehaviorSubject<string>('');
  navigateBackUri$ = new BehaviorSubject<string>('');
  filter$ = new EventEmitter<void>();
  search$ = new EventEmitter<string>();

  constructor() { }

  get navigateBackUri() {
    return this.navigateBackUri$.value;
  }

  set navigateBackUri(navigateBackUri: string) {
    this.navigateBackUri$.next(navigateBackUri);
  }

  get title() {
    return this.title$.value;
  }

  set title(title: string) {
    this.title$.next(title);
  }
}
