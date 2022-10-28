import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { License, ListService } from './list.service';

@Component({
  selector: 'n-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = [
    'title',
    'producer',
    'contracted_percentage',
    'audiovisual_production_title',
    'actions',
  ];
  data: License[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isError = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get isEmpty(): boolean {
    return !this.data;
  }

  constructor(private listService: ListService, private router: Router) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.listService
            .getLicenses(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
            )
            .pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          this.isLoadingResults = false;

          if (!data) {
            return [];
          }

          data.items = data.items.map((d: any) => {
            d.actions = [
              {
                label: 'Editar',
                command: (row: License) => this.goTo('edit/' + row.id),
              },
            ];
            return d;
          });

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items.filter(
            (d: any, index: number) => index < this.paginator.pageSize,
          );
        }),
      )
      .subscribe({
        next: (data) => (this.data = data),
        error: (error) => {
          console.error(error);
          this.isError = true;
        },
      });
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  createLicense() {
    console.log('a');
  }
}
