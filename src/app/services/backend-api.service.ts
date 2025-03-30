import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendAPIService {
  private apiUrl:string='https://localhost:7027/api/';
  constructor(private http:HttpClient) {}
  GetEntity(endPoint:string):Observable<any>{
    return this.http.get(`${this.apiUrl}${endPoint}`);
  }
  GetEntityById(endPoint:string,EntityId:number){
    return this.http.get(`${this.apiUrl}${endPoint}?id=${EntityId}`);
  }
}
