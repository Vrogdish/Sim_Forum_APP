import { FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type TypedFormGroup<T> = FormGroup<TypedForm<T>>;
