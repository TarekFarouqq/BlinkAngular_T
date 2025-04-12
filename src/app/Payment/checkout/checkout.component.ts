import { Cart } from './../../models/cart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
 cartId:number | null = null;
 isLoading:boolean = false;
  cartItem! : CartItem;
    cart: Cart = { cartDetails: [], userId: '', cartId: 0 };
    totalPrice: number = 0;
  

  constructor( private _ActivatedRoute:ActivatedRoute, private _Router:Router ,private _CartService:CartService) { }

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
next:(params)=>{
  const id = params.get('id');
  this.cartId = id ? +id : null;
}
  });


  window.scrollTo(0, 0);
  this._CartService.cart$.subscribe((updatedCart) => {
      this.cart = updatedCart;
  });
  this._CartService.totalPrice$.subscribe((total) => {
    this.totalPrice = total;
  });
}

  checkoutForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    paymentMethod: new FormControl(null, Validators.required),
  
  });

 

  onSubmit(): void {
    console.log('Form Submitted');  // تأكد إنه بيوصل هنا
    if (this.checkoutForm.valid) {

      const selectedMethod = this.checkoutForm.get('paymentMethod')?.value;
      console.log('Selected Method:', selectedMethod);  // شوف بيرجع ايه

      if (selectedMethod === 'cash') {
        
        this._Router.navigate(['/confirmOrder'],{queryParams: this.checkoutForm.value});
      } else if (selectedMethod === 'visa') {
        // لو اختار الدفع بالفيزا
        this._Router.navigate(['/pay'],{queryParams: this.checkoutForm.value});
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

icreamentQauntity(productId: number) {
    this.cartItem = { productId: productId, quantity: 1 };
    this._CartService.addToCart(this.cartItem);
  }
  decreamentQauntity(productId: number) {
    const item = this.cart.cartDetails.find((item) => item.productId === productId);
    if (item && item.quantity == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You Want To Remove This Product?',
        icon: 'warning',
        width: 400,
        showCancelButton: true,
        confirmButtonText: 'Remove',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartItem = { productId: productId, quantity: -1 };
          this._CartService.addToCart(this.cartItem);
        }
      });
    }else{
      this.cartItem = { productId: productId, quantity: -1 };
          this._CartService.addToCart(this.cartItem);
    }
    
  }
  
}
