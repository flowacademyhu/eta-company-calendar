import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(private readonly config: ConfigurationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!this.config.fetchToken('access_token')) {
      const modifiedReq = request.clone({
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.config.fetchToken('access_token'))
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}