import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  stripe!: Stripe | null;
  card!: StripeCardElement;
  cardHolderName: string = '';
  clientSecret: string = '';
  paymentIntentId: string = '';
  cartId!: number;
  isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _paymentService: PaymentService
  ) {}

  async ngOnInit() {
    
    this.clientSecret = this.route.snapshot.queryParamMap.get('clientSecret') || '';
    this.paymentIntentId = this.route.snapshot.queryParamMap.get('paymentIntentId') || '';
    this.cartId = +(this.route.snapshot.queryParamMap.get('cartId') || 0);

    const stripe = await loadStripe('pk_test_51RCWSDFNhf4ER0gQ4w4bQGaljSws1oDom7IJBZLu7z42GxX2tDIUigQMLlO0WX4PJtZNL7XL915qybHSbTnhwPGn00tTANkeVx'); // Replace this
    this.stripe = stripe;

    const elements = stripe?.elements();
    if (!elements) return;

    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment() {
    
    if (this.isProcessing || !this.stripe || !this.card || !this.clientSecret) return;
  
    this.isProcessing = true;
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we process your payment.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const result = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: this.cardHolderName || 'Unknown'
        }
      }
    });
  
    if (result.error) {
      this.isProcessing = false;
      Swal.fire('Error', result.error.message || 'Payment failed', 'error');
    } else {
      const paymentIntent = result.paymentIntent;
      if (paymentIntent?.status === 'succeeded') {
        this._paymentService.confirmPayment({
          paymentIntentId: this.paymentIntentId,
          isSucceeded: true
        }).subscribe({
          next: (order) => {
            console.log(order);
            
            Swal.fire('Success', 'Payment completed successfully!', 'success').then(() => {
              this._router.navigate(['/orders', order.orderId]);
            });
          },
          error: () => {
            Swal.fire('Error', 'Payment confirmed but saving order failed.', 'error');
          }
        });
      } else {
        this.isProcessing = false;
        Swal.fire('Error', 'Payment was not successful.', 'error');
      }
    }
  }
  
}







  // async ngOnInit(): Promise<void> {
  //   
  //   this.visaForm = new FormGroup({
  //     cardHolder: new FormControl('', Validators.required)
  //   });
  //   // Fetch cart data from CartService
  //   this.cartService.cart$.subscribe(cart => {
  //     if (cart.cartId > 0) {
  //       this.cartDto.cartId = cart.cartId; // Set cartId
  //       this.cartDto.userId = cart.userId; // Set userId
  //       this.cartDto.paymentMethod = this.paymentMethod; // Set payment method
  //       this.createPaymentIntent(this.cartDto); // Fetch clientSecret for the payment
  //     }
  //   });

  //   this._ActivatedRoute.queryParams.subscribe(params => {
  //     this.paymentMethod = params['paymentMethod'] || 'visa';  // Optional: Read payment method from query params
  //   });

  //   // Initialize Stripe
  //   this.stripe = await this.stripePromise;
  //   const elements = this.stripe!.elements();
  //   const card = elements.create('card');
  //   card.mount('#card-element');
  //   this.cardElement = card;

  //   // Listen for card errors
  //   card.on('change', (event) => {
  //     this.cardError = event.error?.message ?? '';
  //   });
  // }

  // createPaymentIntent(cartDTO: ICartPaymentDTO) {
  //   this._paymentService.createOrUpdatePaymentIntent(cartDTO).subscribe({
  //     next: (res) => {
  //       this.clientSecret = res.clientSecret || ''; // Set the client secret from the response
  //     },
  //     error: (err) => {
  //       console.error('Failed to create payment intent:', err);
  //     }
  //   });
  // }

//   async onSubmit(): Promise<void> {
//     debugger;
//     if (this.isLoading || !this.visaForm.valid || !this.clientSecret) return;
//     if (this.visaForm.valid && this.clientSecret) {
//       this.isLoading = true;

//       // Confirm the payment with Stripe
//       const result = await this.stripe!.confirmCardPayment(this.clientSecret, {
//         payment_method: {
//           card: this.cardElement,
//           billing_details: {
//             name: this.visaForm.value.cardHolder || 'Unknown',
//           }
//         }
//       });

//       if (result.error) {
//         this.cardError = result.error.message ?? 'Something went wrong';
//         this.isLoading = false;
//       } else if (result.paymentIntent?.status === 'succeeded') {
//         console.log(' Payment succeeded!');
//         this._Router.navigate(['/confirmOrder'], { queryParams: { paymentIntentId: result.paymentIntent.id } });
//         this.isLoading = false;
//       }
//     } else {
//       this.visaForm.markAllAsTouched();
//     }
//   }

//   // // Expiry date validator (optional)
//   // futureDateValidator(control: FormControl): { [key: string]: boolean } | null {
//   //   const value = control.value;
//   //   if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
//   //     return null;
//   //   }

//   //   const [monthStr, yearStr] = value.split('/');
//   //   const month = +monthStr;
//   //   const year = 2000 + +yearStr;

//   //   const today = new Date();
//   //   const inputDate = new Date(year, month - 1);
//   //   const currentDate = new Date(today.getFullYear(), today.getMonth());

//   //   if (inputDate < currentDate) {
//   //     return { expiredDate: true };
//   //   }

//   //   return null;
//   // }

//   // // Format expiry date input
//   // formatExpiryDate(event: any): void {
//   //   let input = event.target.value.replace(/\D/g, '');
//   //   if (input.length > 2) {
//   //     input = input.slice(0, 2) + '/' + input.slice(2, 4);
//   //   }
//   //   event.target.value = input;
//   //   this.visaForm.get('expiryDate')?.setValue(input, { emitEvent: false });
//   //   this.visaForm.updateValueAndValidity();
//   // }

//   // // Format card number input
//   // formatCardNumber(event: any): void {
//   //   let input = event.target.value.replace(/\D/g, '');
//   //   if (input.length > 16) input = input.slice(0, 16);

//   //   const parts = input.match(/.{1,4}/g);
//   //   const formatted = parts ? parts.join(' ') : '';
//   //   event.target.value = formatted;

//   //   this.visaForm.get('cardNumber')?.setValue(formatted, { emitEvent: false });
//   //   this.visaForm.updateValueAndValidity();
//   // }
// }
