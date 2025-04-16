import { Cart } from './../../models/cart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order.service';
import { ICreatOrder } from '../../components/Orders/icreat-order';

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
  createOrderDTO :ICreatOrder = {userId:"",address:"", paymentMethod:"", phoneNumber:"", lat:0, long:0};  


  checkoutForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    paymentMethod: new FormControl(null, Validators.required),
  });

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _CartService: CartService,
    private _PaymentService: PaymentService,
    private _OrderService:OrderService
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


  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Cart ID:', this.cart.cartId);
      console.log('User ID:', this.cart.userId);
      const selectedMethod = this.checkoutForm.get('paymentMethod')?.value;


      this.createOrderDTO.userId = this.cart.userId;
      this.createOrderDTO.address = this.checkoutForm.get('address')?.value;
      this.createOrderDTO.paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
      this.createOrderDTO.phoneNumber = this.checkoutForm.get('phone')?.value;
      this.createOrderDTO.lat = 0; // Set the latitude value
      this.createOrderDTO.long = 0; // Set the longitude value

     

      this._OrderService.creatOrder(this.createOrderDTO).subscribe({
        next:(response)=>{
          
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
            showConfirmButton: false,
            timer: 1700
          });
            if (selectedMethod === 'cash') {
              this._Router.navigate(['/confirmOrder'], { queryParams: this.checkoutForm.value });
            } else if (selectedMethod === 'visa') {
              if (!this.cart.cartId || !this.cart.userId) {
                console.error('Missing cartId or userId');
                return;
              }
              this.isLoading = true;
      
              // this._PaymentService.createOrUpdatePaymentIntent().subscribe({
              //   next: (response) => {
              //     this.isLoading = false;
                  
              //     this._Router.navigate(['/pay'], {
              //       queryParams: {
              //         ...this.checkoutForm.value,
              //         cartId: this.cart.cartId,
              //         paymentIntentId: response.paymentIntentId,
              //         clientSecret: response.clientSecret
              //       }
              //     });
              //   },
              //   error: (err) => {
              //     this.isLoading = false;
              //     console.error('PaymentIntent Error:', err);
              //   }
              // });
            }

          // this._Router.navigate(['/confirmOrder'], { queryParams: this.checkoutForm.value });

        },
        error:(err)=>{
          console.error('Error creating order:', err);
        }
      });


    
    } 
    else {
      this.checkoutForm.markAllAsTouched();
    }
  }


}
