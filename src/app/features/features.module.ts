import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { LicenseModule } from './license/license.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, LicenseModule],
})
export class FeaturesModule {}
