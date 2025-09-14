import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TypedFormGroup } from '../../../shared/utils/typed-form';
import { ForgotFormModel, ResetFormModel } from '../models/forgot.model';

export function createForgotForm(fb: NonNullableFormBuilder): TypedFormGroup<ForgotFormModel> {
  return fb.group({
    email: fb.control('', [Validators.required, Validators.email]),
  });
}

export function createResetForm(fb: NonNullableFormBuilder): TypedFormGroup<ResetFormModel> {
  return fb.group(
    {
      password: fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: fb.control('', [Validators.required, Validators.minLength(6)]),
    },
    { validators: passwordMatchValidator }
  );
}

const passwordMatchValidator: ValidatorFn = (
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
