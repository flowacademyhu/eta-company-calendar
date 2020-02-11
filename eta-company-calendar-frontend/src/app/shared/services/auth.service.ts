import { Injectable } from '@angular/core';
import { ApiCommunicationService } from './api-communication.service';
import { ConfigurationService } from './configuration.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable()
export class AuthService {

  constructor(private readonly app: ApiCommunicationService,
              private readonly config: ConfigurationService) { }
  
  public login(email: string, password: string): Observable<AuthResponse> {
    return this.app.auth().requestToken(email, password)
    .pipe(
      catchError(this.handleError),
      tap(token => {
        this.config.setToken(token);
      })
    );
  }

  public logout() {
    this.config.clearToken();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('some login error');
  }

}