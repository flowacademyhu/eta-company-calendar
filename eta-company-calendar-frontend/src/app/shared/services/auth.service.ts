import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenDetails } from '../models/token-details.model';
import { ApiCommunicationService } from './api-communication.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthService {

  public tokenDetails: BehaviorSubject<TokenDetails | undefined> =
    new BehaviorSubject<TokenDetails | undefined>(undefined);

  constructor(private readonly api: ApiCommunicationService,
              private readonly config: ConfigurationService,
              private readonly router: Router) { }

  public login(email: string, password: string) {
    return this.api.auth()
      .requestToken(email, password)
      .pipe(
        catchError(this.handleError),
        tap((token) => {
          this.config.setToken(token);
          this.getTokenDetails(token.access_token);
          this.router.navigate(['']);
        })
      );
  }

  public logout() {
    this.config.clearToken();
    this.tokenDetails.next(undefined);
    this.router.navigate(['login']);
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

  private getTokenDetails(accessToken: string) {
    const decodedToken: TokenDetails = jwt_decode(accessToken);
    this.tokenDetails.next(decodedToken);
  }

}
