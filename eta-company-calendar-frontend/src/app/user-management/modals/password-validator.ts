import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordNotMatchingValidator: ValidatorFn = (control: AbstractControl):
ValidationErrors => {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');
  return password && confirmPassword && password.value !==
   confirmPassword.value ? { PasswordNotMatching: true } : {};
 };
