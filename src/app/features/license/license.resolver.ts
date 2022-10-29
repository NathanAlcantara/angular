import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { License, LicenseService } from './license.service';

@Injectable({
  providedIn: 'root',
})
export class LicenseFindOneResolver implements Resolve<License | null> {
  constructor(private licenseService: LicenseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<License | null> {
    const entityId = route.paramMap.get('id');

    if (!entityId) {
      return of(null);
    }

    return this.licenseService.findOne(entityId);
  }
}
