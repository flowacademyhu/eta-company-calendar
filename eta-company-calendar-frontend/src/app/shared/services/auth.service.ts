import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
      tap((token) => {
        this.config.setToken(token);
      })
    );
  }

  public logout() {
    this.config.clearToken();
  }

}
