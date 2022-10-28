import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { LicenseRoutingModule } from './license-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [CommonModule, LicenseRoutingModule, MaterialModule],
})
export class LicenseModule {}
