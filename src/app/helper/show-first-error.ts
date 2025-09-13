import { TypedFormGroup } from '../shared/utils/typed-form';

export function showFirstError(
  form: TypedFormGroup<any>,
  errorMessages: Record<string, Record<string, string>>
): string {
  let errorMessage: string = '';
  for (const field in errorMessages) {
    const control = form.get(field);
    if (control && control.invalid) {
      const errors = control.errors ?? {};
      const firstErrorKey = Object.keys(errors)[0];
      errorMessage = errorMessages[field][firstErrorKey] || 'Champ invalide.';
      break;
    }
  }
  return errorMessage;
}
