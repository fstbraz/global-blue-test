import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UiLibModule } from '@app/ui-lib//ui-lib.module';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [UiLibModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [UiLibModule, CalculatorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureModule {}
