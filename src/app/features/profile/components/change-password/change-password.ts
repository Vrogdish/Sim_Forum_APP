import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { PasswordToUpdateFormModel } from '../../models/user.model';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createUserPasswordForm } from '../../forms/profile.form';
import { Btn } from '../../../../shared/components/btn/btn';
import { ProfileService } from '../../services/profile.service';
import { showFirstError } from '../../../../helper/show-first-error';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, Btn],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  @Output() close = new EventEmitter<void>();
  changePasswordForm!: TypedFormGroup<PasswordToUpdateFormModel>;
  errorMessage = '';
  private errorMessages: Record<string, Record<string, string>> = {
    currentPassword: {
      required: 'Le mot de passe actuel est obligatoire.',
      minlength: 'Le mot de passe actuel doit contenir au moins 6 caractères.',
    },
    newPassword: {
      required: 'Le nouveau mot de passe est obligatoire.',
      minlength: 'Le nouveau mot de passe doit contenir au moins 6 caractères.',
    },
    confirmPassword: {
      required: 'La confirmation du mot de passe est obligatoire.',
      mismatch: 'Les mots de passe ne correspondent pas.',
    },
  };

  constructor(private fb: NonNullableFormBuilder, private profileService: ProfileService) {
    this.changePasswordForm = createUserPasswordForm(this.fb);
  }

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      this.errorMessage = showFirstError(this.changePasswordForm, this.errorMessages);
      return;
    }
    const { currentPassword, newPassword } = this.changePasswordForm.getRawValue();
    this.profileService.changePassword({ currentPassword, newPassword }).subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error || 'Une erreur est survenue. Veuillez réessayer.';
        return;
      } else {
        this.close.emit();
        this.changePasswordForm.reset();
      }
    });
  }

  onCancel() {
    this.changePasswordForm.reset();
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.onCancel();
  }
}
