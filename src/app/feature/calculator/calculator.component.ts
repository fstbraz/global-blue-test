import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Calculator } from './calculator-form/calculator';
import { CalculatorForm } from './calculator-form/calculator-form';
import { rateOptions } from './calculator-form/rate-options';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit, OnDestroy {
  calculatorForm!: CalculatorForm;
  radioOptions = rateOptions;
  rate!: number;
  subs = new Subscription();

  ngOnInit() {
    this.constructForm();
    this.observeFormChanges();
  }

  constructForm() {
    this.calculatorForm = new CalculatorForm();
    this.rate = this.calculatorForm.get('rate')?.value;
  }

  updateForm(payload: Partial<Calculator>) {
    this.calculatorForm.patchValue({ ...payload }, { emitEvent: false });
  }

  calculateGross(gross: number) {
    const vat = (gross / (this.rate + 1)) * this.rate;
    const net = Number(gross) - Number(vat);

    this.updateForm({
      net: net.toString(),
      vat: vat.toString(),
    });
  }

  calculateNet(net: number) {
    const vat = net * this.rate;
    const gross = Number(net) + Number(vat);

    this.updateForm({
      gross: gross.toString(),
      vat: vat.toString(),
    });
  }

  calculateVat(vat: number) {
    const net = vat / this.rate;
    const gross = Number(net) + Number(vat);

    this.updateForm({
      net: net.toString(),
      gross: gross.toString(),
    });
  }

  calculateRateChange(rate: number) {
    this.rate = rate;

    const gross = this.calculatorForm.get('gross');

    if (gross?.value) {
      this.calculateGross(gross.value);
      this.calculatorForm.get('net')?.updateValueAndValidity();
      this.calculatorForm.get('vat')?.updateValueAndValidity();
    } else {
      Object.keys(this.calculatorForm.controls).forEach((key) => {
        this.calculatorForm.get(key)?.updateValueAndValidity();
      });
    }
  }

  observeFormChanges() {
    this.subs.add(
      this.calculatorForm.gross.valueChanges
        .pipe(
          debounceTime(300),
          map((value) => Number(value)),
          filter((number) => !(isNaN(number) || number == 0))
        )
        .subscribe((result) => {
          this.calculateGross(Number(result));
        })
    );

    this.subs.add(
      this.calculatorForm.net.valueChanges
        .pipe(
          debounceTime(300),
          map((value) => Number(value)),
          filter((number) => !(isNaN(number) || number == 0))
        )
        .subscribe((result) => {
          this.calculateNet(Number(result));
        })
    );

    this.subs.add(
      this.calculatorForm.vat.valueChanges
        .pipe(
          debounceTime(300),
          map((value) => Number(value)),
          filter((number) => !(isNaN(number) || number == 0))
        )
        .subscribe((result) => {
          this.calculateVat(result);
        })
    );

    this.subs.add(
      this.calculatorForm.rate.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((result) => {
          this.calculateRateChange(result);
        })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
