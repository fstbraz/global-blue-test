import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatureModule } from './feature/feature.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FeatureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
