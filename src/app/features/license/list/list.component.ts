import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import jsreport from '@jsreport/browser-client';
import { PDFDocument } from 'pdf-lib';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { License, LicenseService } from '../license.service';

@Component({
  selector: 'n-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = [
    'select',
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

  selection = new SelectionModel<License>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get isEmpty(): boolean {
    return !this.data;
  }

  get isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  constructor(private listService: LicenseService, private router: Router) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.listService
            .list(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize,
            )
            .pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.selection.clear();

          if (!data) {
            return [];
          }

          data.items = data.items.map((d: any) => {
            d.actions = [
              {
                label: 'Editar',
                command: (row: License) => this.goTo('edit/' + row.id),
              },
              {
                label: 'Imprimir',
                command: (row: License) => this.print(row),
              },
              {
                label: 'Duplicar',
                command: (row: License) => this.goTo('duplicate/' + row.id),
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

  toggleAllRows() {
    if (this.isAllSelected) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.data);
  }

  checkboxLabel(row?: License): string {
    if (!row) {
      return `${this.isAllSelected ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  async printInBulk() {
    if (this.selection.isEmpty()) {
      return;
    }

    this.print(...this.selection.selected);
  }

  async print(...licenses: License[]) {
    const licensesUrl: string[] = [];

    for (const license of licenses) {
      (jsreport as any).serverUrl = 'https://nathan.jsreportonline.net/';
      console.warn('Basic ' + btoa('admin:admin'));

      jsreport.headers = {
        Authorization:
          'Basic ' + btoa('nathangabriel97@gmail.com:ayN8UwbQWFRXa@1a'),
      };

      const report = await jsreport.render({
        template: {
          name: 'peermusic',
        },
        data: {
          license,
        },
      });

      const reportURL = await report.toObjectURL();

      licensesUrl.push(reportURL);
    }

    this.mergeAllPDFsAndOpenInNewWindow(licensesUrl);
  }

  createLicense() {
    this.goTo('add');
  }

  async mergeAllPDFsAndOpenInNewWindow(urls: string[]) {
    const pdfDoc = await PDFDocument.create();
    const numDocs = urls.length;

    for (let i = 0; i < numDocs; i++) {
      const donorPdfBytes = await fetch(urls[i]).then((res) =>
        res.arrayBuffer(),
      );
      const donorPdfDoc = await PDFDocument.load(donorPdfBytes);
      const docLength = donorPdfDoc.getPageCount();
      for (let k = 0; k < docLength; k++) {
        const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
        pdfDoc.addPage(donorPage);
      }
    }

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    const downloadLink = document.createElement('a');
    const fileName = numDocs > 1 ? 'autorizações.pdf' : 'autorização.pdf';
    downloadLink.href = pdfDataUri;
    downloadLink.download = fileName;
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }
}
