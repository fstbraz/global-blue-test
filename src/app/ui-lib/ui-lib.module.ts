import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer/drawer.component';
import { InputComponent } from './form/input/input.component';
import { RadioGroupComponent } from './form/radio-group/radio-group.component';
import { ErrorMessagesPipe } from './form/validations/error-messages.pipe';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent,
    InputComponent,
    RadioGroupComponent,
    ErrorMessagesPipe,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    HeaderComponent,
    DrawerComponent,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    RadioGroupComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiLibModule {}
