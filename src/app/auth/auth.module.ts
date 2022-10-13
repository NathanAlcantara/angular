import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatErrorsModule } from 'ngx-mat-errors';
import { MaterialModule } from '../shared/material/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMatErrorsModule,
  ],
})
export class AuthModule {}
