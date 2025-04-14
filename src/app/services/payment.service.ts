import { Order } from './../../../node_modules/@stripe/stripe-js/dist/api/orders.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartPaymentDTO } from '../Payment/icart-payment-dto';
import { Observable } from 'rxjs';
import { IOrderDTO } from '../Payment/iorder-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string = environment.apiUrl + '/payment'; 

  constructor(private _HttpClient: HttpClient) {}

  createOrUpdatePaymentIntent(): Observable<ICartPaymentDTO> {
    return this._HttpClient.post<ICartPaymentDTO>(this.baseUrl, {});
  }

  confirmPayment(data: { paymentIntentId: string, isSucceeded: boolean }) {
    return this._HttpClient.post<IOrderDTO>(`${this.baseUrl}/confirmPayment`, data);
  }
}
