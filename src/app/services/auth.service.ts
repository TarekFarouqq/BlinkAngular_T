import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  userData: any;
  constructor(private _HttpClient: HttpClient) {}

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `
      ${this.apiUrl}/account/register`,
      userData
    );
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return (
      decodedToken?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ] || null
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    const helper = new JwtHelperService();
    if (helper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  }
}
