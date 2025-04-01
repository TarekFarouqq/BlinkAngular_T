import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private _HttpClient: HttpClient) { }


  getCartByUserId(id : string) : Observable<Cart>{
      return this._HttpClient.get<Cart>(`${this.apiUrl}/cart/getbyid/${id}`);
    }
}
