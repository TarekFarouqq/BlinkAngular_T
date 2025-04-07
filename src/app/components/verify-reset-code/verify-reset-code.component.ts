import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-reset-code',
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css'
})
export class VerifyResetCodeComponent {

  verificationForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.verificationForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onVerifyCode() {
    if (this.verificationForm.valid) {
      this.isLoading = true;
      const verificationData = {
        code: this.verificationForm.value.verificationCode
      };

      // get verify code from service : 
      this.authService.verifyCode(verificationData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log("Verification Successful:", response);

          // go to page to enter new password : 
          if (response.success) {
           
            this.router.navigateByUrl('/set-new-password');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    } else {
      this.verificationForm.markAllAsTouched();
    }
  }}