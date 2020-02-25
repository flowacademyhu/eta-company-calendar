import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly auth: AuthService) { }

  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const accessToken = this.auth.getToken();
  ​
    const authReq = (!!accessToken && !req.headers.has('Authorization')) ? this.addToken(req, accessToken) : req;
  ​
    return next.handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (!this.containsRefreshToken(req)) {
              return this.auth.refreshToken()
                .pipe(
                  switchMap((newToken) => {
                    return next
                      .handle(newToken ? this.addToken(req, newToken) : req);
                  })
                );
            } else {
              this.auth.logout();
            }
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
