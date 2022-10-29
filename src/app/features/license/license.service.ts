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
    sort?: string,
    order?: SortDirection,
    page?: number,
  ): Observable<LicenseListOutput> {
    return of({
      items: this._licenses,
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
