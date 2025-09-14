import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { LoginFormModel } from '../../models/login.model';
import { createLoginForm } from '../../forms/login.form';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Btn } from '../../../../shared/components/btn/btn';
import { Forgot } from '../../components/forgot/forgot';
import { showFirstError } from '../../../../helper/show-first-error';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, Btn, Forgot],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm!: TypedFormGroup<LoginFormModel>;
  errorMessage: string = '';
  showForgot: boolean = false;
  private errorMessages: Record<string, Record<string, string>> = {
    email: {
      required: "L'adresse e-mail est obligatoire.",
      email: "Le format de l'adresse e-mail est invalide.",
    },
    password: {
      required: 'Le mot de passe est obligatoire.',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères.',
    },
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = createLoginForm(this.fb);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errorMessage = showFirstError(this.loginForm, this.errorMessages);
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    this.authService.login({ email, password }).subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error;
        return;
      }
      if (res.data?.token) {
        this.router.navigate(['/profile']);
      }
    });
  }

  toggleForgot() {
    this.showForgot = !this.showForgot;
  }

  // private showFirstError() {
  //   for (const field in this.errorMessages) {
  //     const control = this.loginForm.get(field);
  //     if (control && control.invalid) {
  //       const errors = control.errors ?? {};
  //       const firstErrorKey = Object.keys(errors)[0];
  //       this.errorMessage = this.errorMessages[field][firstErrorKey] || 'Champ invalide.';
  //       return;
  //     }
  //   }
  // }
}
