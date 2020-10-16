import { AbstractControl } from '@angular/forms';

export function PatternValidator(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  const regex = new RegExp('^[a-zA-Z0-9 ]*$');
  const valid = regex.test(control.value);
  return valid ? null : { invalidName: true };
}
