import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from './../validations/messages';

export interface RadioOptions {
  name: string;
  value: number;
  checked: boolean;
}

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() options!: RadioOptions[];
  @Input() control!: FormControl;
  @Input() messages = validationMessages;
}
