import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TypedFormGroup } from '../../../shared/utils/typed-form';
import { RegisterFormModel } from '../models/register.model';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });
    return { mismatch: true };
  }

  // Supprimer l'erreur mismatch si tout est correct
  if (confirmPassword?.hasError('mismatch')) {
    const errors = { ...confirmPassword.errors };
    delete errors['mismatch'];
    confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
  }

  return null;
};

export function createRegisterForm(fb: NonNullableFormBuilder): TypedFormGroup<RegisterFormModel> {
  return fb.group(
    {
      username: fb.control('', [Validators.required, Validators.minLength(3)]),
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: fb.control('', [Validators.required, Validators.minLength(6)]),
    },
    { validators: passwordMatchValidator }
  );
}
