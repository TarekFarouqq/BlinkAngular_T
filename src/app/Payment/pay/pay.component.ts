import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pay',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit{
  visaForm!: FormGroup;
  isLoading = false;

  constructor(private _Router: Router) {}
  ngOnInit(): void {
     this.visaForm = new FormGroup({
      cardHolder: new FormControl(null, Validators.required),
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(\d{4} ){3}\d{4}$/)
      ]),
      expiryDate: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
        ,this.futureDateValidator]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{3}$/)
      ])
    });
  }

  onSubmit(): void {
    if (this.visaForm.valid) {
      this.isLoading = true;

      // Simulate payment processing
      
      console.log('Payment Successful!');
      this._Router.navigate(['/Homepage']);
      this.isLoading = false;
      
    } else {
      this.visaForm.markAllAsTouched();
    }
  }

  futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return null; 
    }
  
    const [monthStr, yearStr] = value.split('/');
    const month = +monthStr;
    const year = 2000 + +yearStr; 
  
    const today = new Date();
    const inputDate = new Date(year, month - 1); 
  
    const currentDate = new Date(today.getFullYear(), today.getMonth());
  
    if (inputDate < currentDate) {
      return { expiredDate: true };
    }
  
    return null;
  }

  formatExpiryDate(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2, 4);
    }
    event.target.value = input;
    this.visaForm.get('expiryDate')?.setValue(input, { emitEvent: false });
    this.visaForm.updateValueAndValidity();

  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 16) input = input.slice(0, 16); 
  
    const parts = input.match(/.{1,4}/g);
    const formatted = parts ? parts.join(' ') : '';
    event.target.value = formatted;
  
    this.visaForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
    this.visaForm.updateValueAndValidity();

  }
  
  

}
