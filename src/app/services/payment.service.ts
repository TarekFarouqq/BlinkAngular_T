import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string = environment.apiUrl + '/payment'; 
  private paymentStatusSubject = new BehaviorSubject<string>('pending');
  paymentStatus$ = this.paymentStatusSubject.asObservable();
  
  constructor(private _HttpClient: HttpClient) {}
  createOrUpdatePaymentIntent(): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}`, {});
  }

 
  confirmPayment(paymentIntentId: string, isSucceeded: boolean): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/confirmPayment`, { paymentIntentId, isSucceeded });
  }

  setPaymentStatus(paymentIntentId: string): Observable<string> {
    return this._HttpClient.get<string>(`${this.baseUrl}/status/${paymentIntentId}`);
  }
}
