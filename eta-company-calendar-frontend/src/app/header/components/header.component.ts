import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Component({
  selector: 'app-header',
  template:
  `<mat-toolbar color="primary" class="my-0">
    <a class="mr-3" mat-raised-button routerLink=".">{{'Profil'}}</a>
    <a class="mr-3" mat-raised-button routerLink=".">{{'Naptár'}}</a>
    <a class="mr-3" mat-raised-button routerLink=".">{{'Értekezletek'}}</a>
    <a class="mr-3" mat-raised-button routerLink=".">{{'Emlékeztetők'}}</a>
    <button mat-raised-button class="ml-auto">{{'Kijelentkezés'}}</button>
  </mat-toolbar>`
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router, private configService: ConfigurationService) { }

  // todo: implement AuthService
  public ngOnInit() {
    throw new Error('Method not implemented.');
  }

  public onLogout() {
    this.configService.clearToken();
    this.router.navigate(['/login']);
  }

}
