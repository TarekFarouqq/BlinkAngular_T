import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  msgerror: string = '';
   
  isLoading: boolean = false;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });


  constructor(private authService: AuthService , private _Router: Router) {}

  onReset() {
    this.isLoading = true;
    if (this.resetForm.valid) {
      this.isLoading = true;
      const resetData = {
        email: this.resetForm.value.email,
      };

    this.authService.resetPassword(resetData.email).subscribe({
      next: (response) => {
        console.log("Reset Code Sent:", response);
        this.isLoading = false;
        // go to el confirm page || .....
        this._Router.navigateByUrl('/verify-reset-code');

      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        this.msgerror = err.error.message;
      }
    });
  } else {
    this.resetForm.markAllAsTouched();
  }
}
}