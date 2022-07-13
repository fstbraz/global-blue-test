import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from '../validations/messages';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label = '';
  @Input() control!: FormControl;
  @Input() placeholder?: string;
  @Input() messages = validationMessages;
}
