import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { ApiCommunicationService } from './api-communication.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {

  constructor(private readonly app: ApiCommunicationService,
              private readonly config: ConfigurationService) { }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.app.auth()
    .requestToken(email, password)
    .pipe(
      catchError(this.handleError),
      tap((token) => {
        this.config.setToken(token);
      })
    );
  }

  public logout() {
    this.config.clearToken();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'The server is currently unavailable.';
    if (!errorRes.error || ! errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error) {
      case 'invalid_grant':
        errorMessage = 'Incorrect username or password!';
    }
    return throwError(errorMessage);
  }

}
