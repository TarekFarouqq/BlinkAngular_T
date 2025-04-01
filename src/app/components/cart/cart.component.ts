import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
 cartUserId: string | null = null;
 cart!: Cart
  constructor(private authService: AuthService, private cartService: CartService) {
    this.cartUserId = this.authService.getUserId();
  }
  ngOnInit() {
    // this.loadCart();
      if (this.cartUserId) {
        this.cartService.getCartByUserId(this.cartUserId).subscribe(res => { console.log(res); });
      } else {
        console.error('cartUserId is null');
      }
    }

  private loadCart(): void {

    if (this.cartUserId) {
      this.cartService.getCartByUserId(this.cartUserId).subscribe({
        next: (cart) => {
          console.log(cart);
          this.cart = cart;
          console.log(this.cart);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }










  cartItems = [
    { id: 1, name: 'IPhone 13', image: '../../../assets/images/p2.jpeg', price: 25000, quantity: 1 },
    { id: 2, name: 'MacBook Air', image: '../../../assets/images/p7.jpeg', price: 35000, quantity: 1 }
  ];
  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout() {
    alert('Proceeding to checkout!');
  }
}
