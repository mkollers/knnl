import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserTableViewModel } from './user-table.view-model';

@Component({
  selector: 'knnl-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  dataSource = new MatTableDataSource<UserTableViewModel>();
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input('knnl-data') data: UserTableViewModel[];
  @Output('knnl-click') click = new EventEmitter<UserTableViewModel>();

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

    // Set sorting logic
    this.dataSource.sortingDataAccessor = this.compare;
  }

  ngOnChanges() {
    if (this.data) {
      const data = orderBy(this.data, u => u.email);
      this.dataSource.data = data;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;

    // Initial sorting property
    this.sort.sort(<MatSortable>{ id: 'firstname', start: 'asc' });
  }

  /** Unsubscribes all subscriptions to avoid memory leaks */
  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private compare(data: UserTableViewModel) {
    switch (this.sort.active) {
      default:
      case 'firstname': return data.firstname.toLowerCase();
      case 'lastname': return data.lastname.toLowerCase();
      case 'email': return data.email.toLocaleLowerCase();
      case 'roles': return data.roles ? data.roles.length : 0;
    }
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
