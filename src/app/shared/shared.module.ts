import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [MaterialModule],
})
export class SharedModule {}
