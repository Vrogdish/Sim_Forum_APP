import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { LoginFormModel } from '../../models/login.model';
import { createLoginForm } from '../../forms/login.form';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm!: TypedFormGroup<LoginFormModel>;
  errorMessage: string | null = null;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = createLoginForm(this.fb);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.getRawValue();
      this.authService.login(loginData).subscribe((res) => {
        if (res.data) {
          this.router.navigate(['profile']);
        } else {
          this.errorMessage = 'Email ou mot de passe invalide ';
        }
      });
    }
  }
}
