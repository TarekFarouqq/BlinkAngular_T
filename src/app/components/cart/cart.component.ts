import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
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
