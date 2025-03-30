import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlOptions, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  msgerror:string ='';
  isLoading:boolean = false;

  registerForm: FormGroup = new FormGroup({
    fName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    userName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)])

  },{validators:[this.confirmPassword]} as FormControlOptions)


  confirmPassword(group:FormGroup):void{
    let password = group.get("password")
    let rePassword = group.get("rePassword")
 
    if(rePassword?.value == null || rePassword.value == ''){
     rePassword?.setErrors({required : true})  
    }
    else if(password?.value != rePassword?.value){
     rePassword.setErrors({mismatch:true})
    }
   }
}
