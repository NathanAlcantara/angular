import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable, of } from 'rxjs';

import db from 'src/assets/db.json';

export interface LicenseListOutput {
  items: License[];
  total_count: number;
}

export interface License {
  id: string;
  producer: string;
  title: string;
  subheading: string;
  authors: string[];
  kind: string;
  copyright: string;
  administrator: string;
  contracted_percentage: number;
  audiovisual_production_title: string;
  sync_type: string;
  sync_price: string;
  location: string;
  obs: string;
}

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  private _licenses: License[] = db.licenses as any;

  //FIXME: Ajustar quando tiver um backend
  list(
    sort: string,
    order: SortDirection = 'desc',
    page = 0,
    pageSize = 10,
  ): Observable<LicenseListOutput> {
    const licensesSorted = this._licenses.sort((a, b) => {
      const aValue = (a[sort as keyof License] as string).toLowerCase();
      const bValue = (b[sort as keyof License] as string).toLowerCase();

      if (order === 'asc') {
        if (aValue < bValue) {
          return 1;
        }
        return -1;
      }

      if (order === 'desc') {
        if (aValue > bValue) {
          return 1;
        }
        return -1;
      }

      return 0;
    });

    const licensesPaginated = licensesSorted.filter(
      (val, index) => index >= page * pageSize,
    );

    return of({
      items: licensesPaginated,
      total_count: this._licenses.length,
    });
  }

  findOne(id: string): Observable<License> {
    return of(this._licenses.find((license) => license.id === id) as License);
  }

  update(id: string, partialLicense: Partial<License>): Observable<License> {
    const license = this._licenses.find(
      (license) => license.id === id,
    ) as License;
    const index = this._licenses.findIndex(
      (license) => license.id === id,
    ) as number;

    const newLicense = { ...license, ...partialLicense };

    this._licenses[index] = newLicense;

    return of(newLicense);
  }

  create(newLicense: License): Observable<License> {
    newLicense.id = (
      parseInt(this._licenses[this._licenses.length - 1].id) + 1
    ).toString();

    this._licenses.push(newLicense);

    return of(newLicense);
  }
}
