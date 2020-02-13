import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { AbstractApiConnector } from './AbstractApiConnector';

export class AuthApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/oauth/token`;

  public requestToken(email: string, password: string): Observable<AuthResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password);
    return this.http.post<AuthResponse>(this.apiRoute, body, { headers: this.getAuthHeaders() });
  }

  public refreshToken(token: string): Observable<AuthResponse> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', token);
    return this.http.post<AuthResponse>(this.apiRoute, body, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

}
