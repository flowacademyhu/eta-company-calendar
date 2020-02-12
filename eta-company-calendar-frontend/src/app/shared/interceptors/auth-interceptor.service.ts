import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService) { }

  public intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const accessToken = this.config.fetchToken('access_token');

    if (!!accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = this.config.fetchToken('refreshToken');
          if (!!refreshToken) {
            this.config.clearToken();
          }
        }
        return observableThrowError(error);
      }
    ));
  }

  private addToken(request: HttpRequest<object>, token: string) {
    return request.clone({
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }
}
