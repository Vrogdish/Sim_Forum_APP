import { Component, OnInit } from '@angular/core';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { ResetFormModel } from '../../models/forgot.model';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createResetForm } from '../../forms/forgot.form';
import { showFirstError } from '../../../../helper/show-first-error';
import { Btn } from '../../../../shared/components/btn/btn';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule, Btn],
  templateUrl: './reset.html',
  styleUrl: './reset.scss',
})
export class Reset implements OnInit {
  resetForm!: TypedFormGroup<ResetFormModel>;
  errorMessage: string = '';
  token!: string | null;
  private errorMessages: Record<string, Record<string, string>> = {
    password: {
      required: 'Le mot de passe est obligatoire.',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères.',
    },
    confirmPassword: {
      required: 'La confirmation du mot de passe est obligatoire.',
      minlength: 'La confirmation du mot de passe doit contenir au moins 6 caractères.',
      mismatch: 'Les mots de passe ne correspondent pas.',
    },
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private passwordService: PasswordService
  ) {
    this.resetForm = createResetForm(this.fb);
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onReset() {
    if (!this.resetForm.valid) {
      this.errorMessage = showFirstError(this.resetForm, this.errorMessages);
      return;
    }

    const { password } = this.resetForm.getRawValue();
    if (!this.token) {
      this.errorMessage = 'Token manquant. Veuillez réessayer.';
      return;
    }
    this.passwordService.resetPassword(this.token, password).subscribe((res) => {
      if (res.data) {
        this.resetForm.reset();
        this.errorMessage = '';
        this.router.navigate(['/auth/login']);
      } else {
        this.errorMessage = res.error || 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }
}
