import { TestBed } from '@angular/core/testing';

import { LicenseFindOneResolver } from './license.resolver';

describe('LicenseResolver', () => {
  let resolver: LicenseFindOneResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LicenseFindOneResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
