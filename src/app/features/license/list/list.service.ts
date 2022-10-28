import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable, of } from 'rxjs';

import db from 'src/assets/db.json';

export interface LicenseApi {
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
export class ListService {
  //FIXME: Ajustar quando tiver um backend
  getLicenses(
    sort: string,
    order: SortDirection,
    page: number,
  ): Observable<LicenseApi> {
    const licenses: License[] = db.licenses as any;

    return of({
      items: licenses,
      total_count: licenses.length,
    });
  }
}
