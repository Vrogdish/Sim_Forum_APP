import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TypedFormGroup } from '../../../shared/utils/typed-form';
import { PasswordToUpdateFormModel, SignatureUpdateFormModel } from '../models/user.model';

export function createUserUpdateForm(
  fb: NonNullableFormBuilder
): TypedFormGroup<SignatureUpdateFormModel> {
  return fb.group({
    signature: ['', [Validators.minLength(6), Validators.maxLength(255), Validators.required]],
  });
}

export function createUserPasswordForm(
  fb: NonNullableFormBuilder
): TypedFormGroup<PasswordToUpdateFormModel> {
  return fb.group(
    {
      currentPassword: ['', [Validators.minLength(6), Validators.required]],
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.minLength(6), Validators.required]],
    },
    {
      validators: [
        (form) => {
          const newPassword = form.get('newPassword')?.value;
          const confirmPassword = form.get('confirmPassword')?.value;
          if (newPassword !== confirmPassword) {
            form.get('confirmPassword')?.setErrors({ mismatch: true });
          }
          return null;
        },
      ],
    }
  );
}
