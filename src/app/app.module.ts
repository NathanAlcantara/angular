import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule, FeaturesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
