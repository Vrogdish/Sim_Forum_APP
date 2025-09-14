import { Component, EventEmitter, HostListener, Output, output } from '@angular/core';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { ForgotFormModel } from '../../models/forgot.model';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createForgotForm } from '../../forms/forgot.form';
import { Btn } from '../../../../shared/components/btn/btn';
import { showFirstError } from '../../../../helper/show-first-error';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, Btn],
  templateUrl: './forgot.html',
  styleUrl: './forgot.scss',
})
export class Forgot {
  @Output() close = new EventEmitter<void>();
  forgotForm!: TypedFormGroup<ForgotFormModel>;
  errorMessage: string = '';
  isSubmitted: boolean = false;
  private errorMessages: Record<string, Record<string, string>> = {
    email: {
      required: "L'adresse e-mail est obligatoire.",
      email: "Le format de l'adresse e-mail est invalide.",
    },
  };

  constructor(private fb: NonNullableFormBuilder, private passwordService: PasswordService) {
    this.forgotForm = createForgotForm(this.fb);
  }

  onCancel() {
    this.close.emit();
  }

  onForgot() {
    if (!this.forgotForm.valid) {
      this.errorMessage = showFirstError(this.forgotForm, this.errorMessages);
      return;
    }
    const { email } = this.forgotForm.getRawValue();
    this.passwordService.requestPasswordReset(email).subscribe((res) => {
      if (res.data) {
        this.isSubmitted = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = res.error || 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.onCancel();
  }
}
