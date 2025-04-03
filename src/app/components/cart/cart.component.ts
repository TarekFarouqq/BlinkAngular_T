import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart = { cartDetails: [], userId: '', cartId: 0 };
  cartItem! : CartItem
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
  }

  ngOnInit() 
  {
    this.cartService.cart$.subscribe((updatedCart) => {
        this.cart = updatedCart;
    });
  }

  icreamentQauntity(productId: number) {
    this.cartItem = { productId: productId, quantity: 1 };
    this.cartService.addToCart(this.cartItem);
  }
  decreamentQauntity(productId: number) {
    this.cartItem = { productId: productId, quantity: -1 };

    this.cartService.addToCart(this.cartItem);
  }
}
