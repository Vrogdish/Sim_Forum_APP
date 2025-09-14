import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AvatarUpdateFormModel, SignatureUpdateFormModel, User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TypedFormGroup } from '../../../../shared/utils/typed-form';
import { createUserUpdateForm } from '../../forms/profile.form';
import { ProfileService } from '../../services/profile.service';
import { showFirstError } from '../../../../helper/show-first-error';
import { environment } from '../../../../../environments/environment.development';
import { Btn } from '../../../../shared/components/btn/btn';
import { ChangePassword } from "../../components/change-password/change-password";
import { DeleteAccount } from "../../components/delete-account/delete-account";

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, ReactiveFormsModule, Btn, ChangePassword, DeleteAccount],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  currentUser$: Observable<User | null>;
  profileForm!: TypedFormGroup<SignatureUpdateFormModel>;
  errorMessage: string = '';
  previewUrl: string | ArrayBuffer | null = null;
  apiUploadUrl = environment.apiUploadUrl;
  showChangePassword: boolean = false;
  showDeleteAccount: boolean = false;

  private errorMessages: Record<string, Record<string, string>> = {
    avatarUrl: {
      required: "L'URL de l'avatar est obligatoire.",
      minlength: "L'URL de l'avatar doit contenir au moins 6 caractères.",
    },
    signature: {
      required: 'La signature est obligatoire.',
      minlength: 'La signature doit contenir au moins 6 caractères.',
    },
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.profileForm = createUserUpdateForm(this.fb);
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue(user);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/connexion']);
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/avatars/default-avatar.png';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // affichage preview côté client
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result);
    reader.readAsDataURL(file);

    // upload vers l'API
    this.profileService.updateAvatar(file).subscribe({
      next: (res) => {
        // mise à jour de l'utilisateur local avec la nouvelle avatarUrl et updatedAt
        this.authService.getme();
        this.errorMessage = '';
        // reset du preview pour utiliser l'URL officielle avec cache-buster
        this.previewUrl = null;
      },
      error: (err) => {
        console.error('Erreur upload avatar', err);
      },
    });
  }

  onSubmit() {
    console.log(this.profileForm);

    if (!this.profileForm.valid) {
      this.errorMessage = showFirstError(this.profileForm, this.errorMessages);
      return;
    }

    const { signature } = this.profileForm.getRawValue();
    this.profileService.updateSignature({ signature }).subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error;
        return;
      }
      if (res.data) {
        this.authService.getme();
        this.errorMessage = '';
      }
    });
  }

  resetForm() {
    this.profileForm.reset();
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue(user);
        this.errorMessage = '';
      }
    });
  }

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }
  toggleDeleteAccount() {
    this.showDeleteAccount = !this.showDeleteAccount;
  }
}
