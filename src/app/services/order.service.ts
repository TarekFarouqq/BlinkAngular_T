import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICreatOrder } from '../components/Orders/icreat-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }

 
  

  creatOrder(orderData:ICreatOrder):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}/order/create`,orderData);
  }

  getOrderByUserId(orderId:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}/order/${orderId}`);
  }

  deleteOrder(orderId:number):Observable<any>{
    return this._HttpClient.delete(`${environment.apiUrl}/order/${orderId}`);
  }





}
 
