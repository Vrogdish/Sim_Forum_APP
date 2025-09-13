import { Component } from '@angular/core';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { RegisterFormModel } from '../../models/register.model';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createRegisterForm } from '../../forms/register.form';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginDto, RegisterDto } from '../../../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { showFirstError } from '../../../../helper/show-first-error';
import { Btn } from '../../../../shared/components/btn/btn';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, Btn],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  registerForm!: TypedFormGroup<RegisterFormModel>;
  errorMessage: string = '';
  isSubmitted = false;
  private errorMessages: Record<string, Record<string, string>> = {
    username: {
      required: "Le nom d'utilisateur est obligatoire.",
      minlength: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    },
    email: {
      required: "L'adresse e-mail est obligatoire.",
      email: "Le format de l'adresse e-mail est invalide.",
    },
    password: {
      required: 'Le mot de passe est obligatoire.',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères.',
    },
    confirmPassword: {
      required: 'La confirmation du mot de passe est obligatoire.',
      mismatch: 'Les mots de passe ne correspondent pas.',
    },
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = createRegisterForm(this.fb);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.registerForm.valid) {
      this.errorMessage = showFirstError(this.registerForm, this.errorMessages);
      return;
    }

    this.errorMessage = '';
    const { username, email, password } = this.registerForm.getRawValue();
    const registerData: RegisterDto = { username, email, password };
    const loginData: LoginDto = { email, password };

    this.authService
      .register(registerData)
      .pipe(
        switchMap((res) => {
          if (res.data) {
            return this.authService.login(loginData);
          } else {
            throw res;
          }
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/profile']),
        error: (err) => {
          if (err.error === 'email already exists') {
            this.errorMessage = "L'adresse e-mail est déjà utilisée.";
            this.registerForm.get('email')?.setErrors({ emailExists: true });
          } else if (err.error === 'username already exists') {
            this.errorMessage = "Le nom d'utilisateur est déjà utilisé.";
            this.registerForm.get('username')?.setErrors({ usernameExists: true });
          } else {
            this.errorMessage =
              'Impossible de se connecter automatiquement. Veuillez vous connecter manuellement.';
          }
          console.error(err);
        },
      });
  }

  // private showFirstError() {
  //   for (const field in this.errorMessages) {
  //     const control = this.registerForm.get(field);
  //     if (control && control.invalid) {
  //       const errors = control.errors ?? {};
  //       const firstErrorKey = Object.keys(errors)[0];
  //       this.errorMessage = this.errorMessages[field][firstErrorKey] || 'Champ invalide.';
  //       return;
  //     }
  //   }
  // }
}
