import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Subscription } from 'rxjs';
import { CalculatorForm } from './calculator-form/calculator-form';
import { CalculatorComponent } from './calculator.component';

fdescribe('CalculatorComponent', () => {
  let spectator: Spectator<CalculatorComponent>;

  const createComponent = createComponentFactory({
    component: CalculatorComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('exists', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should call for construct a new form and observe for changes OnInit', () => {
    const constructForm = spyOn(spectator.component, 'constructForm');
    const observeFormChanges = spyOn(spectator.component, 'observeFormChanges');
    spectator.component.ngOnInit();

    expect(constructForm).toHaveBeenCalled();
    expect(observeFormChanges).toHaveBeenCalled();
  });

  it('should construct a new form', () => {
    spectator.component.constructForm();

    expect(spectator.component.rate).toBeDefined();
    expect(spectator.component.calculatorForm).toBeInstanceOf(CalculatorForm);
  });

  it('should update the form', () => {
    const patchForm = spyOn(spectator.component.calculatorForm, 'patchValue');
    spectator.component.updateForm({ vat: 1, net: 1, rate: 1 });

    expect(patchForm).toHaveBeenCalledWith(
      { vat: 1, net: 1, rate: 1 },
      { emitEvent: false }
    );
  });

  it('should calculate based on the gross amount', () => {
    const updateForm = spyOn(spectator.component, 'updateForm');

    spectator.component.rate = 0.2;
    spectator.component.calculateGross(3);

    expect(updateForm).toHaveBeenCalledWith({
      net: '2.5',
      vat: '0.5',
    });
  });

  it('should calculate based on the net amount', () => {
    const updateForm = spyOn(spectator.component, 'updateForm');

    spectator.component.rate = 0.2;
    spectator.component.calculateNet(2.5);

    expect(updateForm).toHaveBeenCalledWith({
      gross: '3',
      vat: '0.5',
    });
  });

  it('should calculate based on the vat amount', () => {
    const updateForm = spyOn(spectator.component, 'updateForm');

    spectator.component.rate = 0.2;
    spectator.component.calculateVat(0.5);

    expect(updateForm).toHaveBeenCalledWith({
      net: '2.5',
      gross: '3',
    });
  });

  it('should recalculate on the rate change and mantain the gross amount', () => {
    const calculateGross = spyOn(spectator.component, 'calculateGross');

    spectator.component.updateForm({ gross: 3 });
    spectator.component.calculateRateChange(0.2);

    expect(calculateGross).toHaveBeenCalledWith(3);
  });

  it('should recalculate on the rate change and not mantain the gross amount', () => {
    const calculateGross = spyOn(spectator.component, 'calculateGross');

    spectator.component.calculateRateChange(0.2);

    expect(calculateGross).not.toHaveBeenCalled();
  });

  it('should destroy the subscriptions on destroy', () => {
    const subs = spyOn(Subscription.prototype, 'unsubscribe');

    spectator.component.ngOnDestroy();

    expect(subs).toHaveBeenCalledTimes(1);
  });
});
