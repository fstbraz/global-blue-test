import { ValidatorFn, Validators } from '@angular/forms';

export const numeric: ValidatorFn = Validators.pattern(
  /^(0|[1-9]\d*)(\.\d+)?$/
);
