import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Component({
  selector: 'app-header',
  styles: [
    `.tool-container {
      position: fixed;
      z-index: 3;
      width: 100%;
      background-color: white;
      color: black;
      text-align: center;
      display:flex;
      justify-content: space-between;
      }`,
    `a {
      border: 2px solid;
      border-color: black !important;
      width: 160px;}`,
    `p {
      cursor: pointer;}`,
    `button {
      border: 2px solid;
      border-color: black !important;
      width: 160px;}`],
  template:
  `<mat-toolbar class="tool-container mat-elevation-z6">
      <mat-toolbar-row>
      <button mat-icon-button (click)="sidenav.toggle()" fxShow="true" fxHide.gt-sm>
        <mat-icon>menu</mat-icon>
      </button>
      <div fxShow="true" fxHide.lt-md>
        <span class="header1">
          <a mat-stroked-button routerLink="profiles">{{'header.profile' | translate}}</a>
          <a mat-stroked-button routerLink=".">{{'header.calendar' | translate}}</a>
          <a mat-stroked-button routerLink=".">{{'header.meetings' | translate}}</a>
          <a mat-stroked-button routerLink=".">{{'header.reminders' | translate}}</a>
          <!-- TODO: add admin role (*ngIf) to User Management button -->
        </span>
          <a mat-stroked-button routerLink=".">{{'header.userManagement' | translate}}</a>
        <span class="header2">
          <a (click)="onLanguageChange()">{{'header.button' | translate}}</a>
          <button mat-stroked-button (click)="onLogout()">{{'header.logout' | translate}}</button>
        </span>
      </div>
      </mat-toolbar-row>
  </mat-toolbar>`
})

export class HeaderComponent {

  public language: string;

  constructor(private readonly router: Router,
              private readonly configService: ConfigurationService,
              private readonly translate: TranslateService) { }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }

  public onLogout() {
    this.configService.clearToken();
    this.router.navigate(['login']);
  }

}
