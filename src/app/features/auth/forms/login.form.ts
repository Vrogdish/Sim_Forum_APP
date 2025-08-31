import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginFormModel } from '../models/login.model';
import { TypedFormGroup } from '../../../shared/utils/typed-form';

export function createLoginForm(fb: NonNullableFormBuilder): TypedFormGroup<LoginFormModel> {
  return fb.group({
    email: fb.control('', [Validators.required, Validators.email]),
    password: fb.control('', [Validators.required, Validators.minLength(6)]),
  });
}
