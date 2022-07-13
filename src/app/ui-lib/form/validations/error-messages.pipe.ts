import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorKeys',
})
export class ErrorMessagesPipe implements PipeTransform {
  transform(errors: ValidationErrors) {
    if (!errors) {
      return;
    }
    return Object.keys(errors);
  }
}
