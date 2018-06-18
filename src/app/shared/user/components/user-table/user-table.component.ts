import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserTableViewModel } from './user-table.view-model';

@Component({
  selector: 'knnl-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnChanges, OnDestroy {
  private _subscriptions: Subscription[] = [];
  dataSource = new MatTableDataSource<UserTableViewModel>();
  displayedColumns: string[];

  @Input('knnl-data') data: UserTableViewModel[];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    breakpointObserver: BreakpointObserver,
    paginatorIntl: MatPaginatorIntl
  ) {
    paginatorIntl.getRangeLabel = (page, pageSize, length) => `${page + 1} von ${Math.ceil(length / pageSize)}`;
    paginatorIntl.nextPageLabel = 'Nächste Seite';
    paginatorIntl.previousPageLabel = 'Vorherige Seite';
    paginatorIntl.itemsPerPageLabel = `Benutzer pro Seite`;

    // Change display columns depending on screen size
    this._subscriptions.push(
      breakpointObserver.observe('(max-width: 839px)').pipe(
        map(state => state.matches),
        tap(isSmall => this.changeDisplayColumns(isSmall))
      ).subscribe()
    );
  }

  ngOnChanges() {
    if (this.data) {
      const data = orderBy(this.data, u => u.email);
      this.dataSource.data = data;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Unsubscribes all subscriptions to avoid memory leaks */
  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  /** Changes visible columns depending on the screen size */
  private changeDisplayColumns(isSmall: boolean) {
    if (isSmall) {
      this.displayedColumns = ['firstname', 'lastname'];
    } else {
      this.displayedColumns = ['email', 'firstname', 'lastname', 'roles'];
    }
    this._changeDetectorRef.markForCheck();
  }

}
