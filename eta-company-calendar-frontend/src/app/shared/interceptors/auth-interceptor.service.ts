import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model';
import { ApiCommunicationService } from '../services/api-communication.service';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService,
              private readonly api: ApiCommunicationService,
              private readonly router: Router) { }

  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const accessToken = this.config.fetchToken('access_token');
  ​
    const authReq = (!!accessToken && !req.headers.has('Authorization')) ? this.addToken(req, accessToken) : req;
  ​
    return next.handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (!this.containsRefreshToken(req)) {
              const refreshToken = this.config.fetchToken('refresh_token');
  ​
              if (!refreshToken) {
                this.router.navigate(['login']);
                return observableThrowError(error);
              }
  ​
              return this.api.auth()
                .refreshToken(refreshToken)
                .pipe(
                  switchMap((resp: AuthResponse) => {
  ​
                    this.config.setToken(resp);
  ​
                    const newToken = this.config.fetchToken('access_token');
  ​
                    return next
                      .handle(newToken ? this.addToken(req, newToken) : req);
                  })
                );
            } else {
              this.router.navigate(['login']);
              this.config.clearToken();
            }
  ​
            return observableThrowError(error);
          }
          return observableThrowError(error);
        })
      ) as Observable<HttpEvent<object>>;
  }

  private addToken(request: HttpRequest<object>, token: string): HttpRequest<object> {
    return request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  private containsRefreshToken(req: HttpRequest<object>): boolean {
    const body = req.serializeBody();
    if (typeof body === 'string') {
      return body.indexOf('refresh_token') !== -1;
    }
    return false;
  }
}
