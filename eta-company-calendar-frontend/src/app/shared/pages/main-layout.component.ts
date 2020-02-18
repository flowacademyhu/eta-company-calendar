import { Component } from '@angular/core';
import { ConfigurationService } from './../services/configuration.service';

@Component({
  selector: 'app-welcome-layout',
  template: `
  <app-header *ngIf="checkToken()"></app-header>
  <router-outlet></router-outlet>
  <app-footer *ngIf="checkToken()"></app-footer>
  `
})

export class MainLayoutComponent {

  constructor(private readonly config: ConfigurationService) { }

  protected checkToken() {
    return !!this.config.fetchToken('access_token');
  }

}
