import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService,
              private readonly authService: AuthService) { }

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
                this.authService.logout();
                return observableThrowError(error);
              }
  ​
              return this.authService.refreshToken()
                .pipe(
                  switchMap((newToken) => {
                    return next
                      .handle(newToken ? this.addToken(req, newToken) : req);
                  })
                );
            } else {
              this.authService.logout();
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
