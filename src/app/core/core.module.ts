import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material.module';
import { LightModeToggleComponent } from './light-mode-toggle/light-mode-toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, LightModeToggleComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarComponent,
    LightModeToggleComponent,
  ],
})
export class CoreModule {}
