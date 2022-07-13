import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { numeric } from '@app/ui-lib/form/validations/numeric';
import { Calculator } from './calculator';
import { rateOptions } from './rate-options';

export class CalculatorForm extends FormGroup {
  readonly gross = this.get('gross') as FormControl;
  readonly net = this.get('net') as FormControl;
  readonly vat = this.get('vat') as FormControl;
  readonly rate = this.get('rate') as FormControl;

  constructor(
    private readonly calculator?: Calculator,
    private readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        gross: ['', [numeric, Validators.required]],
        net: ['', [numeric, Validators.required]],
        vat: ['', [numeric, Validators.required]],
        rate: [
          rateOptions.find((option) => option.checked === true)?.value,
          Validators.required,
        ],
      }).controls
    );
  }
}
