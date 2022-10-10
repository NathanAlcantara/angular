import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material/material.module';
import { LightModeToggleComponent } from './light-mode-toggle/light-mode-toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, LightModeToggleComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [ToolbarComponent, LightModeToggleComponent],
})
export class CoreModule {}
