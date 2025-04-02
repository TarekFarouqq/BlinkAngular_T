import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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

  // login method:
  //login(userData: object): Observable<any> {
 //   return this._HttpClient.post(`${this.apiUrl}/account/login`, userData);
  //}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this._HttpClient.post<any>(`${this.apiUrl}Account/Login`, credentials).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          
          throw new Error('Email not found. Please check your email and try again.');
        }
        return throwError(err);
      })
    );
  }
}
