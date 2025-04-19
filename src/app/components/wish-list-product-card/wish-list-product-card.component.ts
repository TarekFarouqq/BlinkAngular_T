import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../services/wishlist.service';
import { WishListDetail } from '../../models/wish-list';
import { WishListItem } from '../../models/wish-list-item';

@Component({
  selector: 'app-wish-list-product-card',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './wish-list-product-card.component.html',
  styleUrl: './wish-list-product-card.component.css'
})
export class WishListProductCardComponent {
  @Input() wishListProduct!: WishListDetail;
  cartItem! : CartItem
  UserStatus!:boolean;
  constructor(  private cartService: CartService, private authService:AuthService ,private router: Router) { }
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLogged=>{
      this.UserStatus=isLogged;
    })
  }

  addProductToCart() {
    if (!this.UserStatus) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'warning',
        title: 'Login or Register to Add Product to Cart',
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    if (this.wishListProduct) {
      this.cartItem = {
        productId: this.wishListProduct.productId,
        quantity: 1,
      }
      this.cartService.addToCart(this.cartItem);
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'Product added to cart!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
