import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-set-new-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent {

  msgerror: string = '';
  isLoading: boolean = false;

  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required])
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  onResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.confirmPassword) {
        this.msgerror = 'Passwords do not match!';
        return;
      }
      this.isLoading = true;
      const resetData = {
        newPassword: this.resetPasswordForm.value.newPassword
      };

      this._AuthService.setNewPassword(resetData).subscribe({
        next: (response) => {
          console.log("Password Reset Response:", response);
          if (response.success) {
            this.isLoading = false;
            this._Router.navigateByUrl('/login');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err);
          this.msgerror = err.error.message;
        }
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

}
