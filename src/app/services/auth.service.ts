import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  userData: any;
  constructor(private _HttpClient:HttpClient) { }


  setRegister(userData:object):Observable<any>{
    return this._HttpClient.post(`
      ${this.apiUrl}/account/register`,
       userData);
  }
}
