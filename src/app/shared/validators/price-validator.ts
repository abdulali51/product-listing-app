import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function PriceValidator(spControl: string, cpControl: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[spControl];
    const costPriceControl = formGroup.controls[cpControl];

    if (!control || !costPriceControl) {
      return null;
    }

    if (control?.errors || costPriceControl?.errors) {
      // return if another validator has already found an error on the costPriceControl
      return;
    }

    // set error on sellingPriceControl if validation fails
    if (typeof control.value !== 'number') {
      control.setErrors({ notNumber: true });
    } else if (control.value < costPriceControl.value) {
      control.setErrors({ isLessThanCP: true });
    } else {
      control.setErrors(null);
    }
  };
}
