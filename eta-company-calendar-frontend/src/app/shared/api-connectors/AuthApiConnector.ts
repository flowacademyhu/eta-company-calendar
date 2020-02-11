import { AbstractApiConnector } from './AbstractApiConnector'
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export class AuthApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/oauth/token`;

  public requestToken(email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret')
    });
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password);
      
    return this.http.post<AuthResponse>(this.apiRoute, body, { headers });
  }

}