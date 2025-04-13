import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.development';
import { Attribute } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient : HttpClient) { }
  private apiUrl = environment.apiUrl;
  // getAllProducts() : Observable<Product[]>{
  //   return this.httpClient.get<Product[]>(`${this.apiUrl}/product`);
  // }
  // getProductById(id : number) : Observable<Product>{
  //   return this.httpClient.get<Product>(`${this.apiUrl}/product/getbyid/${id}`);
  // }
  GetAll():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.apiUrl}/Product`);
  }
  GetById(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.apiUrl}/Product/${id}`);
  }

  getAllAttributes():Observable<Attribute[]>{
    return this.httpClient.get<Attribute[]>(`${this.apiUrl}/Product/GetFilterAttributes`);
  }
  // getProductsWithCategoryId(id:number):Observable<Product[]>{
  //   return this.httpClient.get<Product[]>(`${this.apiUrl}/Product/GetProductsWithCategoryId/${id}`);
  // }

  getFilteredProducts(params : HttpParams, fromPrice : number | -1 , toPrice : number | -1, pgNumber : number, rating : number): Observable<Product[]> 
  {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/Product/GetFillteredProducts/${pgNumber}/${fromPrice}/${toPrice}/${rating}`, { params });
  }

  GetTotalPages(pgSize:number):Observable<number>{
    return this.httpClient.get<number>(this.apiUrl + '/product/GetPagesCount/' + pgSize);
  }
}
