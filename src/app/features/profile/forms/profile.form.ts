import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TypedFormGroup } from '../../../shared/utils/typed-form';
import { UserUpdateFormModel } from '../models/user.model';

export function createUserUpdateForm(
  fb: NonNullableFormBuilder
): TypedFormGroup<UserUpdateFormModel> {
  return fb.group({
    avatarUrl: ['', [Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i)]],
    signature: ['', [Validators.maxLength(200)]],
  });
}
