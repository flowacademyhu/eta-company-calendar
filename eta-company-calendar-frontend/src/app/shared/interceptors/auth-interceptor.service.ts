import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private readonly config: ConfigurationService) { }

  public intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    if (!!this.config.fetchToken('access_token')) {
      request = this.addToken(request, this.config.fetchToken('access_token'));
    }
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }
    ));
  }

  private addToken(request: HttpRequest<object>, token: string) {
    return request.clone({
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    });
  }
}
