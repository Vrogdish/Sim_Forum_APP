import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TypedFormGroup } from '../../../shared/utils/typed-form';
import { SignatureUpdateFormModel } from '../models/user.model';

export function createUserUpdateForm(
  fb: NonNullableFormBuilder
): TypedFormGroup<SignatureUpdateFormModel> {
  return fb.group({
    signature: ['', [Validators.minLength(6), Validators.maxLength(255), Validators.required]],
  });
}

export function createUserAvatarForm(
  fb: NonNullableFormBuilder
): TypedFormGroup<{ avatarUrl: string }> {
  return fb.group({
    avatarUrl: ['', [Validators.pattern(/^(?!.*[\\/])([a-zA-Z0-9_-]+)\.(png)$/i)]],
  });
}
