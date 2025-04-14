import { Cart } from './../../models/cart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { ICartPaymentDTO } from '../../Payment/icart-payment-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartId: number | null = null;
  isLoading: boolean = false;
  cartItem!: CartItem;
  cart: Cart = { cartDetails: [], userId: '', cartId: 0 };
  totalPrice: number = 0;
  shippingPrice: number = 0;


  checkoutForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    paymentMethod: new FormControl(null, Validators.required),
  });

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _CartService: CartService,
    private _PaymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
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

    this._CartService.getShippingPrice().subscribe(price => {
      this.shippingPrice = price;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const selectedMethod = this.checkoutForm.get('paymentMethod')?.value;

      if (selectedMethod === 'cash') {
        this._Router.navigate(['/confirmOrder'], { queryParams: this.checkoutForm.value });
      } else if (selectedMethod === 'visa') {
        if (!this.cart.cartId || !this.cart.userId) {
          console.error('Missing cartId or userId');
          return;
        }

        this.isLoading = true;

        this._PaymentService.createOrUpdatePaymentIntent().subscribe({
          next: (response) => {
            this.isLoading = false;
            
            this._Router.navigate(['/pay'], {
              queryParams: {
                ...this.checkoutForm.value,
                cartId: this.cart.cartId,
                paymentIntentId: response.paymentIntentId,
                clientSecret: response.clientSecret
              }
            });
          },
          error: (err) => {
            this.isLoading = false;
            console.error('PaymentIntent Error:', err);
          }
        });
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }


}
