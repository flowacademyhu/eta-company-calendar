import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { TokenDetails } from '../models/token-details.model';
import { ApiCommunicationService } from './api-communication.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {

  public tokenDetails: BehaviorSubject<TokenDetails> = new BehaviorSubject<TokenDetails>({} as TokenDetails);

  constructor(private readonly api: ApiCommunicationService,
              private readonly config: ConfigurationService,
              private readonly router: Router) {
    this.getTokenDetails();
  }

  public login(email: string, password: string) {
    return this.api.auth()
      .requestToken(email, password)
      .pipe(
        catchError(this.handleError),
        tap((token) => {
          this.handleToken(token);
          this.router.navigate(['']);
        })
      );
  }

  public refreshToken() {
    return this.api.auth()
      .refreshToken(this.config.fetchToken('refresh_token'))
      .pipe(
        map((newToken) => {
          this.handleToken(newToken);
          return newToken.access_token;
        })
      );
  }

  public getToken() {
    return this.config.fetchToken('access_token');
  }

  public logout() {
    this.config.clearToken();
    this.tokenDetails.next({} as TokenDetails);
    this.router.navigate(['login']);
  }

  private handleToken(token: AuthResponse) {
    this.config.setToken(token);
    this.getTokenDetails();
  }

  private getTokenDetails() {
    let tokenDetails: TokenDetails = {} as TokenDetails;
    if (this.getToken()) {
      tokenDetails = jwt_decode(this.getToken());
    }
    this.tokenDetails.next(tokenDetails);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage;
    if (!errorRes.error || ! errorRes.error.error) {
      errorMessage = 'no_response';
    } else if (errorRes.error.error === 'invalid_grant') {
      errorMessage = 'invalid_grant';
    } else {
      errorMessage = 'no_response';
    }
    return throwError(`login.${errorMessage}`);
  }

}
