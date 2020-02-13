import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template:
  `<mat-toolbar color="warm" class="my-0">
    <button class="mr-3" color="primary" mat-raised-button>{{'Profil'}}</button>
    <button class="mr-3" color="primary" mat-raised-button>{{'Naptár'}}</button>
    <button class="mr-3" color="primary" mat-raised-button>{{'Értekezletek'}}</button>
    <button color="primary" mat-raised-button>{{'Emlékeztetők'}}</button>
    <button color="primary" mat-raised-button class="ml-auto">{{'Kijelentkezés'}}</button>
  </mat-toolbar>`
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  // todo: implement AuthService
  public ngOnInit() {
    throw new Error('Method not implemented.');
  }

  public onLogout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

}
